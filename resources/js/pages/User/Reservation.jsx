import {Fragment, useEffect, useState} from "react";

import ruLocale from "@fullcalendar/core/locales/ru";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import {useParams} from "react-router-dom";
import {Button} from "../../components/UI/Button";
import {Form} from "../../components/UI/Form";
import {Loader} from "../../components/UI/Loader";
import {Modal} from "../../components/UI/Modal";
import {Select} from "../../components/UI/Select";
import {Subtitle} from "../../components/UI/Subtitle";
import {Title} from "../../components/UI/Title";
import {getShortWeekdayName} from "../../helpers/getShortWeekdayName";
import useAuthStore from "../../store/useAuthStore";
import useReservationStore from "../../store/useReservationsStore";
import useSectionTimetables from "../../store/useSectionTimetables";

const EventItem = ({info}) => {
    const {event} = info;
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
    const {user} = useAuthStore();
    const {schoolId, sectionId} = useParams();

    const {loading, sectionTimetables, getSectionTimetables} =
        useSectionTimetables();
    const {loading: reservationLoading, addReservation} =
        useReservationStore();

    const [events, setEvents] = useState([]);
    const [modalIsActive, setModalIsActive] = useState(false);
    const [eventInfo, setEventInfo] = useState({});

    const [currentSectionTimetable, setCurrentSectionTimetable] = useState({});

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [days, setDays] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getSectionTimetables(sectionId);
        };
        fetchData();
    }, [sectionId, getSectionTimetables]);

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
    }, [currentSectionTimetable]);

    useEffect(() => {
        setStart(currentSectionTimetable?.timetable?.workday_start);
        setEnd(currentSectionTimetable?.timetable?.workday_end);

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
        const restStart = moment(
            currentSectionTimetable?.timetable?.rest_start,
            "HH:mm:ss"
        );
        const restEnd = moment(
            currentSectionTimetable?.timetable?.rest_end,
            "HH:mm:ss"
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

    useEffect(() => {
        console.log(eventInfo?.event);
        console.log(eventInfo?.event?.start);
        console.log(eventInfo?.event?.end);
    }, [eventInfo]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

    useEffect(() => {
        setSelectedUser(user.id);
        console.log("selected user", selectedUser);
    }, []);

    useEffect(() => {
        console.log("selected user", selectedUser);
    }, [selectedUser]);

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
    };

    return (
        <>
            <Subtitle>Бронирование</Subtitle>
            {loading ? (
                <Loader/>
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
                                                key={day}
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
                            eventContent={(info) => <EventItem info={info}/>}
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
                                        <option value={'card'} defaultChecked>
                                            Банковской картой
                                        </option>
                                        <option value={'section_subscription'}>
                                            Абонемент занятий
                                        </option>
                                        <option value={'money_subscription'}>
                                            Денежный абонемент
                                        </option>
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
