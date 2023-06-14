import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "../../components/UI/Button";
import { Loader } from "../../components/UI/Loader";
import { Modal } from "../../components/UI/Modal";
import { Select } from "../../components/UI/Select";
import { Subtitle } from "../../components/UI/Subtitle";
import { Title } from "../../components/UI/Title";
import { WeekCalendar } from "../../components/WeekCalendar";
import useAuthStore from "../../store/useAuthStore";
import useCalendarStore from "../../store/useCalendarStore";
import useSectionsStore from "../../store/useSectionsStore";
import useUsersStore from "../../store/useUsersStore";

export const TeacherSections = () => {
    const { user: authUser } = useAuthStore();
    const { teacherSections, getTeacherSections, loading } = useSectionsStore();
    const [selectedSection, setSelectedSection] = useState("");
    const [calendarShow, setCalendarShow] = useState(false);
    const [modalIsActive, setModalIsActive] = useState(false);
    const [eventInfo, setEventInfo] = useState({});

    const { user, getOneUser } = useUsersStore();

    const {
        getCurrentSectionTimetable,
        getEventsForTeacher,
        events,
        currentSectionTimetable,
        onTeacherNavigate: onNavigate,
        setCurrentSectionTimetable,
    } = useCalendarStore();

    useEffect(() => {
        getTeacherSections(authUser?.id);
    }, []);

    const handleSelect = async (e) => {
        setCalendarShow(false);
        setSelectedSection(e.target.value);
        setCalendarShow(true);
    };

    useEffect(() => {
        setCurrentSectionTimetable(teacherSections[0]?.timetableSections[0]);
        console.log(currentSectionTimetable);
    }, [teacherSections]);

    useEffect(() => {
        const section = teacherSections.find(
            (item) => item.id === Number(selectedSection)
        );
        getEventsForTeacher(section);
    }, [selectedSection, getEventsForTeacher, teacherSections]);

    const handleEventClick = (info) => {
        console.log(moment(info?.start).format("HH:mm"));
        currentSectionTimetable?.reservations.forEach((item) => {
            if (
                item?.date === moment(info?.start).format("YYYY-MM-DD") &&
                moment(`${item.date} ${item.time}`).format("HH:mm") ==
                    moment(info?.start).format("HH:mm")
            ) {
                setEventInfo(item);
            }
        });
        setModalIsActive(true);
        getOneUser();
    };

    const eventPropGetter = (event, start, end, isSelected) => {
        const currentData = moment();

        const disabledStyle = {
            backgroundColor: "gray",
            opacity: "0.5",
            color: "var(--blue)",
            pointerEvents: "none",
        };

        const enabledStyle = {
            backgroundColor: "var(--orange)",
            opacity: "1",
            color: "var(--white)",
            pointerEvents: "all",
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
                for (let reservation of reservations) {
                    const { date, time } = reservation;
                    const reservationStart = moment(`${date} ${time}`);
                    const reservationEnd = moment(reservationStart).add(
                        currentSectionTimetable?.timetable?.lesson_time,
                        "minute"
                    );

                    if (moment(start).isSame(reservationStart, "minutes")) {
                        return {
                            className: "teacher-event-success",
                        };
                    } else {
                        continue;
                    }
                }
            }

            return {
                className: "teacher-event-fail",
            };
        }
    };

    return (
        <>
            <Subtitle>Секции</Subtitle>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="two-col">
                        <Select
                            label={"Расписание"}
                            value={selectedSection}
                            onChange={handleSelect}
                        >
                            <option value="" disabled>
                                Выберите расписание
                            </option>
                            {teacherSections &&
                                teacherSections.map((teacherSection) => (
                                    <option
                                        key={teacherSection?.id}
                                        value={teacherSection?.id}
                                    >
                                        {teacherSection?.school?.title} |{" "}
                                        {teacherSection?.occupation}
                                    </option>
                                ))}
                        </Select>
                    </div>
                    <div className="one-col">
                        {selectedSection && calendarShow ? (
                            <WeekCalendar
                                events={events}
                                onNavigate={onNavigate}
                                onSelectEvent={handleEventClick}
                                eventPropGetter={eventPropGetter}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                    <Modal isActive={modalIsActive}>
                        <Title>Запись</Title>
                        {eventInfo?.client === eventInfo?.user?.full_name ? (
                            <p className="teacher-modal-info"><span>Записанный пользователь:</span> {eventInfo.client}</p>
                        ) : (
                            <>
                                <p className="teacher-modal-info"><span>Записанный подопечный:</span> {eventInfo.client}</p>
                                <p className="teacher-modal-info">
                                    <span>Оплатил:</span>{" "}
                                    {eventInfo?.user?.full_name}
                                </p>
                            </>
                        )}
                        <p className="teacher-modal-info"><span>Почта:</span> {eventInfo?.user?.email}</p>
                        {eventInfo?.user?.phone_number ? (
                            <p className="teacher-modal-info">
                                <span>Номер телефона:</span> {eventInfo?.user?.phone_number}
                            </p>
                        ) : (
                            ""
                        )}
                        <div className="one-col">
                            <Button
                                variant={"gray"}
                                className={"modal-full-button"}
                                type={"button"}
                                onClick={() => setModalIsActive(false)}
                            >
                                Закрыть
                            </Button>
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
};
