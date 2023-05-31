import { Fragment, useEffect, useRef, useState } from "react";

import ruLocale from "@fullcalendar/core/locales/ru";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Button } from "../../components/UI/Button";
import { Form } from "../../components/UI/Form";
import { Loader } from "../../components/UI/Loader";
import { Modal } from "../../components/UI/Modal";
import { Select } from "../../components/UI/Select";
import { Subtitle } from "../../components/UI/Subtitle";
import { Title } from "../../components/UI/Title";
import { getShortWeekdayName } from "../../helpers/getShortWeekdayName";
import useAuthStore from "../../store/useAuthStore";
import useReservationStore from "../../store/useReservationsStore";
import useSectionTimetables from "../../store/useSectionTimetables";
import useSubscriptionUsersStore from "../../store/useSubscriptionUsersStore";
import useSectionsStore from "../../store/useSectionsStore";

const EventItem = ({ info }) => {
    const { event } = info;

    return (
        <div>
            <p>{event.title}</p>
        </div>
    );
};

const translateDayToNumber = (day) => {
    switch (day) {
        case "Monday":
            return 1;
        case "Tuesday":
            return 2;
        case "Wednesday":
            return 3;
        case "Thursday":
            return 4;
        case "Friday":
            return 5;
        case "Saturday":
            return 6;
        default:
            return 0;
    }
};

export const Reservation = () => {
    const { user, getUserInfo, loading: authLoading } = useAuthStore();
    const { schoolId, sectionId } = useParams();

    const { loading, sectionTimetables, getSectionTimetables } =
        useSectionTimetables();
    const {
        loading: reservationLoading,
        addReservation,
        message,
    } = useReservationStore();
    const { loading: subscriptionsLoading } = useSubscriptionUsersStore();

    const [events, setEvents] = useState([]);
    const [modalIsActive, setModalIsActive] = useState(false);
    const [eventInfo, setEventInfo] = useState({});

    const [currentSectionTimetable, setCurrentSectionTimetable] = useState({});

    const [abonements, setAbonements] = useState([]);

    const [days, setDays] = useState([]);

    const calendarRef = useRef();

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await getSectionTimetables(sectionId);
        };
        fetchData();
    }, [sectionId, getSectionTimetables]);

    useEffect(() => {
        setAbonements(
            user?.subsriptions?.filter(
                (item) =>
                    item?.school_id == schoolId && item?.section_id == sectionId
            )
        );
    }, [user]);

    useEffect(() => {
        console.log(abonements);
    }, [abonements]);

    const handleSelectTimetable = (e) => {
        const selectedTimetableId = e.target.value;
        setCurrentSectionTimetable(
            sectionTimetables.filter(
                (item) => item?.id == selectedTimetableId
            )[0]
        );
    };

    useEffect(() => {
        setDays(
            currentSectionTimetable?.timetable?.weekday?.which_days
                ?.map((day) => translateDayToNumber(day))
                ?.sort((a, b) => a - b) || []
        );

        console.log(currentSectionTimetable);
    }, [currentSectionTimetable]);

    useEffect(() => {
        const startTime = moment(
            currentSectionTimetable?.timetable?.workday_start,
            "HH:mm:ss"
        );
        const endTime = moment(
            currentSectionTimetable?.timetable?.workday_end,
            "HH:mm:ss"
        );
        const lessonTime = moment.duration(
            currentSectionTimetable?.timetable?.lesson_time
        );

        let testEvents = [];
        let currentTime = moment(startTime);
        while (currentTime.isBefore(endTime)) {
            let testStart = moment(currentTime).format("HH:mm:ss");
            let testEnd = moment(currentTime)
                .add(lessonTime)
                .format("HH:mm:ss");

            testEvents.push({
                title: `${currentSectionTimetable.lesson_price}р.`,
                startTime: testStart,
                endTime: testEnd,
                daysOfWeek: days && days,
            });

            currentTime.add(lessonTime);
        }

        testEvents.forEach((event, index) => {
            if (!currentSectionTimetable?.timetable?.without_rest) {
                if (
                    moment(
                        currentSectionTimetable?.timetable?.rest_start,
                        "HH:mm:ss"
                    ).isBetween(
                        moment(event.startTime, "HH:mm:ss"),
                        moment(event.endTime, "HH:mm:ss"),
                        undefined,
                        "[)"
                    ) ||
                    moment(
                        currentSectionTimetable?.timetable?.rest_end,
                        "HH:mm:ss"
                    ).isBetween(
                        moment(event.startTime, "HH:mm:ss"),
                        moment(event.endTime, "HH:mm:ss"),
                        undefined,
                        "()"
                    )
                ) {
                    testEvents.splice(index, 1);
                }
            }
        });

        setEvents([...testEvents]);
    }, [currentSectionTimetable?.timetable, days]);

    const handleEventClick = (info) => {
        setModalIsActive(true);
        setEventInfo(info);
    };

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

    useEffect(() => {
        setSelectedUser(user.id);
    }, []);

    const handleSelectUser = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleSelectPaymentMethod = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservationData = {
            id: user?.id,
            sectionTimetableId: currentSectionTimetable?.id,
            client: selectedUser,
            date: eventInfo?.event?.start,
            time: eventInfo?.event?.start?.toLocaleTimeString([], {
                hour12: false,
            }),
        };
        await addReservation(
            reservationData.id,
            reservationData.sectionTimetableId,
            reservationData.client,
            reservationData.date,
            reservationData.time,
            selectedPaymentMethod,
            currentSectionTimetable?.lesson_price
        );
        setModalIsActive(false);
        await getUserInfo();
        await getSectionTimetables(sectionId);
    };

    // useEffect(() => {
    //     const calendarApi = calendarRef?.current?.getApi()
    //     const currentEvents = calendarApi?.getEvents()

    //     // currentEvents?.map((ev, index) => {
    //     //     currentSectionTimetable?.reservations?.map(reservation => {
    //     //         let isSameDate = ev?.start.toLocaleDateString() === reservation.date.split('-').reverse().join('.')
    //     //         let isSameTime = ev?.start.toLocaleTimeString() === reservation.time
    //     //         if(isSameDate && isSameTime) {
    //     //             console.log('ev',ev._def.ui);
    //     //             ev._def.ui.display = 'none'
    //     //             console.log('ev',ev._def.ui.backgroundColor);
    //     //         }
    //     //     })
    //     // })

    //     console.log('current reservations', currentSectionTimetable.reservations);

    // }, [calendarRef, events, currentSectionTimetable, setEvents])

    const eventWillUnmount = (info) => {
        // console.log(info);
    }

    const eventDidMount = (info) => {
        const { event } = info;
        console.log(event)
        let crit = 0;
        // console.log(event.start.toLocaleDateString());
        currentSectionTimetable?.reservations?.forEach((reservation) => {
            // console.log(
            //     "event",
            //     event.start.toLocaleDateString() +
            //         " " +
            //         event.start.toLocaleTimeString(),
            //     "reservation",
            //     reservation.date.split("-").reverse().join(".") +
            //         " " +
            //         reservation.time,
            //     "isSameDate",
            //     event.start.toLocaleDateString() ===
            //         reservation.date.split("-").reverse().join("."),
            //     "isSameTime",
            //     event.start.toLocaleTimeString() == reservation.time
            // );
            const isSameDate =
                event.start.toLocaleDateString() ==
                reservation.date.split("-").reverse().join(".");
            const isSameTime =
                event.start.toLocaleTimeString() == reservation.time;

            if(isSameDate || isSameTime) {
                event.setProp('display', 'none');
            }

            if (!isSameDate || !isSameTime) {
                event.setProp('display', 'block');
            }

            // if (isSameDate && isSameTime) {
            //     crit = 1;
            // }
            // // (!isSameDate || !isSameTime) {

            // // }
            // if(crit){
            //     event.setProp("color", "red");
            // }else{
            //     event.setProp("color", "blue");
            // }
        });
        // currentSectionTimetable?.reservations?.find(reservation => {
        //     reservation.date.split('-').reverse().join('.') === event.start.toLocaleDateString() && reservation.time === event.start.toLocaleTimeString()
        // })
        // currentSectionTimetable?.reservations?.map((reservation) => {
        //     console.log(
        //         "res",
        //         reservation?.date?.split("-").reverse().join(".") +
        //             " " +
        //             reservation.time
        //     );
        //     console.log(
        //         "event",
        //         event.start.toLocaleDateString() +
        //             " " +
        //             event.start.toLocaleTimeString()
        //     );
        //     console.log(
        //         "isSameDate",
        //         reservation?.date?.split("-").reverse().join(".") ===
        //             event.start.toLocaleDateString()
        //     );
        //     console.log(
        //         "isSameTime",
        //         reservation.time === event.start.toLocaleTimeString()
        //     );
        // });
    };

    const navLinkWeekClick = (start, jsE) => {
        console.log(info, jsE)
    }

    return (
        <>
            <Subtitle>Бронирование</Subtitle>
            {loading || subscriptionsLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="two-col">
                        <Select
                            label={"Выберите расписание"}
                            onChange={handleSelectTimetable}
                            value={currentSectionTimetable?.id || ""}
                        >
                            <option key={0} value="" disabled defaultChecked>
                                Выберите расписание
                            </option>
                            {sectionTimetables?.map((item) => (
                                <option key={item?.id} value={item?.id}>
                                    {item?.timetable?.owner
                                        ? item?.timetable?.owner + " | "
                                        : ""}
                                    {item?.timetable?.weekday?.which_days.map(
                                        (day, index) => (
                                            <Fragment
                                                key={day + index}
                                            >{`${getShortWeekdayName(day)}${
                                                index !==
                                                item?.timetable?.weekday
                                                    ?.which_days.length -
                                                    1
                                                    ? ", "
                                                    : " | "
                                            }`}</Fragment>
                                        )
                                    )}
                                    {item?.timetable?.workday_start.split(
                                        ":"
                                    )[0] +
                                        ":" +
                                        item?.timetable?.workday_start.split(
                                            ":"
                                        )[1]}
                                    -
                                    {item?.timetable?.workday_end.split(
                                        ":"
                                    )[0] +
                                        ":" +
                                        item?.timetable?.workday_end.split(
                                            ":"
                                        )[1]}
                                </option>
                            ))}
                        </Select>
                    </div>
                    {events &&
                    currentSectionTimetable &&
                    currentSectionTimetable?.timetable ? (
                        <FullCalendar
                            eventDidMount={eventDidMount}
                            // eventDisplay={}
                            eventWillUnmount={eventWillUnmount}
                            navLinkWeekClick={navLinkWeekClick}
                            ref={calendarRef}
                            dateClick={(info) => console.log(info)}
                            eventClick={(info) => handleEventClick(info)}
                            selectable
                            plugins={[timeGridPlugin, interactionPlugin]}
                            initialView="timeGridWeek"
                            locale={ruLocale}
                            slotLabelFormat={{
                                hour: "numeric",
                                minute: "2-digit",
                                omitZeroMinute: false,
                                meridiem: "short",
                            }}
                            allDaySlot={false}
                            slotMinTime={"06:00:00"}
                            slotMaxTime={"22:00:00"}
                            events={(events && events) || []}
                            eventContent={(info) => <EventItem info={info} />}
                            moreLinkClick={"popover"}
                        />
                    ) : (
                        ""
                    )}
                    <Modal isActive={modalIsActive}>
                        <Title>Запись</Title>
                        <Form
                            onSubmit={handleSubmit}
                            inputs={
                                <div className="one-col">
                                    <Select
                                        id="user"
                                        bordered
                                        value={selectedUser || null}
                                        onChange={handleSelectUser}
                                        label={"Выберите кого хотите записать"}
                                    >
                                        <option value={user?.id}>Себя</option>
                                        {/* IN FUTURE ADD PERSONS AND ACCOUNTS */}

                                        {/* ++++++++++++++++++++++++++++++++++ */}
                                    </Select>
                                    <Select
                                        id="payment"
                                        bordered
                                        value={selectedPaymentMethod || null}
                                        onChange={handleSelectPaymentMethod}
                                        label={"Выберите способ оплаты"}
                                    >
                                        <option value={"card"} defaultChecked>
                                            Банковской картой
                                        </option>
                                        {abonements.map(
                                            (item) =>
                                                item?.pivot?.remaining_classes
                                        )[0] && (
                                            <option
                                                value={"section_subscription"}
                                            >
                                                Абонемент занятий | Осталось{" "}
                                                {
                                                    abonements[0]?.pivot
                                                        ?.remaining_classes
                                                }{" "}
                                                занятий
                                            </option>
                                        )}
                                        {abonements.map(
                                            (item) =>
                                                item?.pivot?.deposit !== null
                                        )[0] && (
                                            <option
                                                value={"money_subscription"}
                                            >
                                                Денежный абонемент | Осталось{" "}
                                                {abonements[0]?.pivot?.deposit}{" "}
                                                рублей
                                            </option>
                                        )}
                                    </Select>
                                </div>
                            }
                            buttons={
                                <>
                                    <Button variant={"green"} type={"submit"}>
                                        Записаться
                                    </Button>
                                    <Button
                                        variant={"gray"}
                                        type={"button"}
                                        onClick={() => {
                                            setModalIsActive(false);
                                        }}
                                    >
                                        Закрыть
                                    </Button>
                                </>
                            }
                        />
                    </Modal>
                </>
            )}
        </>
    );
};
