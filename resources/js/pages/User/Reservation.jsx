import { Fragment, useEffect, useState } from "react";

import { Button } from "../../components/UI/Button";
import FullCalendar from "@fullcalendar/react";
import { Loader } from "../../components/UI/Loader";
import { Modal } from "../../components/UI/Modal";
import { Select } from "../../components/UI/Select";
import { Subtitle } from "../../components/UI/Subtitle";
import { getShortWeekdayName } from "../../helpers/getShortWeekdayName";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import ruLocale from "@fullcalendar/core/locales/ru";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useParams } from "react-router-dom";
import useSectionTimetables from "../../store/useSectionTimetables";
import useTimetablesStore from "../../store/useTimetablesStore";

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
    const { schoolId, sectionId } = useParams();

    const {
        loading: timetableLoading,
        allTimetables,
        getSchoolsAndTeachersTimetables,
    } = useTimetablesStore();
    const {
        loading,
        sectionTimetables,
        sectionTimetable,
        getSectionTimetables,
        getOneSectionTimetable,
    } = useSectionTimetables();

    const [events, setEvents] = useState([]);
    const [modalIsActive, setModalIsActive] = useState(false);

    const [currentTimetable, setCurrentTimetable] = useState({});
    const [currentSectionTimetable, setCurrentSectionTimetable] =
        useState({});

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [days, setDays] = useState(null);

    useEffect(() => {
        // Получаю расписания секций и расписания школ и учителей, объединяю данные
        const fetchData = async () => {
            await getSectionTimetables(sectionId);
            await getSchoolsAndTeachersTimetables(schoolId);
        };
        fetchData();

        console.log("sectionTimetables", sectionTimetables);
        console.log("allTimetables", allTimetables);
    }, []);


    // Выбор расписания школы или учителя
    const handleSelectTimetable = (e) => {
        const selectedTimetableId = e.target.value
        setCurrentTimetable(allTimetables.filter(item => item.id == selectedTimetableId)[0]);
        console.log(currentTimetable);

    };

    // Вставка расписания секции на основе выбранного расписания школы или учителя
    useEffect(() => {
        setCurrentSectionTimetable(sectionTimetables.filter(item => item.timetable_id === currentTimetable.id)[0])
        console.log(currentSectionTimetable)
    }, [currentTimetable])

    useEffect(() => {
        setStart(currentTimetable?.workday_start)
        setEnd(currentTimetable?.workday_end)
        setDays(currentTimetable?.weekday?.which_days.map(day => translateDayToNumber(day)).sort((a, b) => a - b))


        const startTime = moment(currentTimetable?.workday_start, 'HH:mm:ss');
        const endTime = moment(currentTimetable?.workday_end, 'HH:mm:ss');
        const lessonTime = moment.duration(currentTimetable?.lesson_time);

        let testEvents = [];
        let currentTime = moment(startTime);
        while (currentTime.isBefore(endTime)) {
            let testStart = moment(currentTime).format('HH:mm:ss')
            let testEnd = moment(currentTime).add(lessonTime).format('HH:mm:ss');
            testEvents.push({
                title: 'Lesson',
                startTime: testStart,
                endTime: testEnd,
                daysOfWeek: days
            });
            currentTime.add(lessonTime);
        }
        setEvents(testEvents);
        console.log('events', events);

    },
    [currentTimetable]
)

    return (
        <>
            <Subtitle>Бронирование</Subtitle>
            {loading || timetableLoading ? (
                <Loader />
            ) : (
                <>
                    {currentTimetable && JSON.stringify(currentTimetable)}
                    {currentSectionTimetable && JSON.stringify(currentSectionTimetable)}
                    {start && <>{start}</>}
                    {end && <>{end}</>}
                    {days && days.map(item => <div key={item}>{JSON.stringify(item)}</div>)}
                    <div className="two-col">
                        <Select
                            label={"Выберите расписание"}
                            onChange={handleSelectTimetable}
                            value={currentTimetable.id || ''}
                        >
                            <option key={0} value="" disabled defaultChecked>
                                Выберите расписание
                            </option>
                            {allTimetables?.map((item) => (
                                <option key={item?.id} value={item?.id}>
                                    {item?.teacher?.full_name
                                        ? item?.teacher?.full_name + " | "
                                        : ""}
                                    {item?.weekday?.which_days.map(
                                        (day, index) => (
                                            <Fragment
                                                key={day}
                                            >{`${getShortWeekdayName(day)}${
                                                index !==
                                                item?.weekday?.which_days
                                                    .length -
                                                    1
                                                    ? ", "
                                                    : " | "
                                            }`}</Fragment>
                                        )
                                    )}
                                    {item?.workday_start.split(":")[0] +
                                        ":" +
                                        item?.workday_start.split(":")[1]}
                                    -
                                    {item?.workday_end.split(":")[0] +
                                        ":" +
                                        item?.workday_end.split(":")[1]}
                                </option>
                            ))}
                        </Select>
                    </div>
                    {events &&
                    currentTimetable &&
                    currentSectionTimetable ? (
                        <FullCalendar
                            dateClick={(info) => {
                                alert("Clicked on: " + info.dateStr);
                            }}
                            eventClick={(info) => {
                                alert(JSON.stringify(info));
                            }}
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
                            events={events && events}
                            eventContent={(info) => <EventItem info={info} />}
                            moreLinkClick={"popover"}
                        />
                    ) : (
                        ""
                    )}
                    <Modal isActive={modalIsActive}>
                        <Button
                            variant={"gray"}
                            onClick={() => {
                                setModalIsActive(false);
                            }}
                        >
                            Close
                        </Button>
                    </Modal>
                </>
            )}
        </>
    );
};
