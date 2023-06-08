import { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Button } from "../../components/UI/Button";
import { Form } from "../../components/UI/Form";
import { Loader } from "../../components/UI/Loader";
import { Modal } from "../../components/UI/Modal";
import { Select } from "../../components/UI/Select";
import { Subtitle } from "../../components/UI/Subtitle";
import { Title } from "../../components/UI/Title";
import { WeekCalendar } from "../../components/WeekCalendar";
import { getShortWeekdayName } from "../../helpers/getShortWeekdayName";
import useAuthStore from "../../store/useAuthStore";
import useCalendarStore from "../../store/useCalendarStore";
import useReservationStore from "../../store/useReservationsStore";
import useSectionTimetables from "../../store/useSectionTimetables";
import useSubscriptionUsersStore from "../../store/useSubscriptionUsersStore";
import moment from "moment";
import { toast } from "react-toastify";
import usePersonsStore from "../../store/usePersonsStore";

export const Reservation = () => {
    const { user, getUserInfo } = useAuthStore();
    const { schoolId, sectionId } = useParams();

    const { getPersons, linkedUsers, people } = usePersonsStore();
    const { loading, sectionTimetables, getSectionTimetables } =
        useSectionTimetables();
    const {
        loading: reservationLoading,
        addReservation,
        addReservationByCard,
        url,
    } = useReservationStore();
    const { loading: subscriptionsLoading } = useSubscriptionUsersStore();
    const {
        currentSectionTimetable,
        getCurrentSectionTimetable,
        events,
        getTestEvents,
        loading: calendarLoading,
        onNavigate,
        clearDifference,
    } = useCalendarStore();

    const [modalIsActive, setModalIsActive] = useState(false);
    const [eventInfo, setEventInfo] = useState({});
    const [selectedTimetableId, setSelectedTimetableId] = useState(null);
    const [calendarShow, setCalendarShow] = useState(false);

    const [abonements, setAbonements] = useState([]);

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        getPersons();
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

    const handleSelectTimetable = async (e) => {
        setCalendarShow(false);
        const selectedId = e.target.value;
        setSelectedTimetableId(selectedId);
        await getCurrentSectionTimetable(selectedId);
        setCalendarShow(true);
    };

    useEffect(() => {
        getTestEvents();
    }, [currentSectionTimetable, selectedTimetableId, getTestEvents]);

    const handleEventClick = (info) => {
        setModalIsActive(true);
        setEventInfo(info);
    };

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

    useEffect(() => {
        setSelectedUser(user.full_name);
    }, [user]);

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
            date: moment(eventInfo?.start).format("MM-DD-YYYY"),
            time: eventInfo?.start?.toLocaleTimeString(),
        };

        if (
            selectedPaymentMethod === "section_subscription" ||
            selectedPaymentMethod === "money_subscription"
        ) {
            await addReservation(
                reservationData.id,
                reservationData.sectionTimetableId,
                reservationData.client,
                reservationData.date,
                reservationData.time,
                selectedPaymentMethod,
                currentSectionTimetable?.lesson_price
            );
        }

        if (selectedPaymentMethod === "card") {
            await addReservationByCard(
                reservationData.id,
                reservationData.client,
                reservationData.sectionTimetableId,
                reservationData.date,
                reservationData.time,
                currentSectionTimetable?.lesson_price
            );
        }

        setModalIsActive(false);
        clearDifference();
        await getUserInfo();
        await getSectionTimetables(sectionId);
        await getCurrentSectionTimetable(selectedTimetableId);
        toast("Запись совершена");
    };

    const eventPropGetter = (event, start, end, isSelected) => {
        const currentData = moment();

        const disabledStyle = {
            backgroundColor: "gray",
            opacity: "0.5",
            color: "var(--blue)",
            pointerEvents: "none",
        };

        if (
            currentData.isAfter(moment(start)) ||
            currentData.isAfter(moment(end))
        ) {
            return {
                style: disabledStyle,
            };
        }

        if (currentSectionTimetable) {
            const reservations = currentSectionTimetable?.reservations;
            if (reservations) {
                for (const reservation of reservations) {
                    const { date, time } = reservation;
                    const reservationStart = moment(`${date} ${time}`);
                    const reservationEnd = moment(reservationStart).add(
                        currentSectionTimetable?.timetable?.lesson_time,
                        "minute"
                    );

                    if (
                        moment(start).isBetween(
                            reservationStart,
                            reservationEnd,
                            "minutes",
                            "[)"
                        ) ||
                        moment(end).isBetween(
                            reservationStart,
                            reservationEnd,
                            "minutes",
                            "(]"
                        )
                    ) {
                        return {
                            style: disabledStyle,
                        };
                    }
                }
            }

            return {};
        }
    };

    return (
        <>
            <Subtitle>Бронирование</Subtitle>
            {loading ||
            subscriptionsLoading ||
            reservationLoading ||
            calendarLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="two-col">
                        <Select
                            label={"Выберите расписание"}
                            onChange={handleSelectTimetable}
                            value={selectedTimetableId || ""}
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
                    currentSectionTimetable?.timetable &&
                    calendarShow ? (
                        <WeekCalendar
                            events={events}
                            onSelectEvent={handleEventClick}
                            onNavigate={onNavigate}
                            eventPropGetter={eventPropGetter}
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
                                        <option value={user?.full_name}>Себя</option>
                                        {/* IN FUTURE ADD PERSONS AND ACCOUNTS */}
                                        {linkedUsers &&
                                            linkedUsers.map((linkedUser) => (
                                                <option key={linkedUser?.id} value={linkedUser?.full_name}>
                                                    {linkedUser?.full_name}
                                                </option>
                                            ))}
                                        {people &&
                                            people.map((person) => (
                                                <option key={person?.id} value={person?.full_name}>
                                                    {person?.full_name}
                                                </option>
                                            ))}
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
