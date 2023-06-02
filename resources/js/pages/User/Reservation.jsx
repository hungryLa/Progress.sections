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

export const Reservation = () => {
    const { user, getUserInfo } = useAuthStore();
    const { schoolId, sectionId } = useParams();

    const { loading, sectionTimetables, getSectionTimetables } =
        useSectionTimetables();
    const { loading: reservationLoading, addReservation } =
        useReservationStore();
    const { loading: subscriptionsLoading } = useSubscriptionUsersStore();
    const {
        currentSectionTimetable,
        getCurrentSectionTimetable,
        events,
        getTestEvents,
        loading: calendarLoading,
        onNavigate
    } = useCalendarStore();

    const [modalIsActive, setModalIsActive] = useState(false);
    const [eventInfo, setEventInfo] = useState({});

    const [abonements, setAbonements] = useState([]);


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

    const handleSelectTimetable = async (e) => {
        const selectedTimetableId = e.target.value;
        await getCurrentSectionTimetable(selectedTimetableId);
    };

    useEffect(() => {
        getTestEvents();
    }, [currentSectionTimetable]);

    useEffect(() => {console.log(events);}, [events])

    const handleEventClick = (info) => {
        setModalIsActive(true);
        setEventInfo(info);
    };

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

    useEffect(() => {
        setSelectedUser(user.id);
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
            date: moment(eventInfo?.start).format('MM-DD-YYYY'),
            time: eventInfo?.start?.toLocaleTimeString(),
        };

        console.log(reservationData);

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
    }


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
                        <WeekCalendar events={events} onSelectEvent={handleEventClick} onNavigate={onNavigate}/>
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
