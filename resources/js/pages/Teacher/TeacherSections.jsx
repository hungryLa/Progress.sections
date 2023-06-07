import {useEffect, useState} from "react"
import {Subtitle} from "../../components/UI/Subtitle"
import useAuthStore from "../../store/useAuthStore"
import useSectionsStore from "../../store/useSectionsStore";
import {Loader} from "../../components/UI/Loader";
import {Select} from "../../components/UI/Select";
import {WeekCalendar} from "../../components/WeekCalendar";
import useCalendarStore from "../../store/useCalendarStore";
import moment from "moment";

export const TeacherSections = () => {
    const {user: authUser} = useAuthStore()
    const {teacherSections, getTeacherSections, loading} = useSectionsStore()
    const [selectedSection, setSelectedSection] = useState("")
    const [calendarShow, setCalendarShow] = useState(false)
    const {
        getCurrentSectionTimetable,
        getEventsForTeacher,
        events,
        currentSectionTimetable,
        onNavigate
    } = useCalendarStore()

    useEffect(() => {
        getTeacherSections(authUser?.id)
    }, [])

    useEffect(() => {
        console.log('teacherSections', teacherSections)
    }, [teacherSections])

    const handleSelect = async (e) => {
        setCalendarShow(false)
        setSelectedSection(e.target.value)
        setCalendarShow(true)
    }

    useEffect(() => {
        const section = teacherSections.find(item => item.id === Number(selectedSection))
        console.log('section', section)
        getEventsForTeacher(section)
    }, [selectedSection, getEventsForTeacher, teacherSections])

    useEffect(() => {
        console.log(events)
    }, [events])

    const handleEventClick = () => {

    }

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
                    const {date, time} = reservation;
                    const reservationStart = moment(`${date} ${time}`);
                    const reservationEnd = moment(reservationStart).add(
                        currentSectionTimetable?.timetable?.lesson_time,
                        "minute"
                    );

                    if (
                        !moment(start).isBetween(
                            reservationStart,
                            reservationEnd,
                            "minutes",
                            "[)"
                        ) ||
                        !moment(end).isBetween(
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
    }

    return (
        <>
            <Subtitle>Секции</Subtitle>
            {loading ? <Loader/> : (
                <>
                    {JSON.stringify(selectedSection)}
                    <div className="two-col">
                        <Select
                            label={'Расписание'}
                            value={selectedSection}
                            onChange={handleSelect}
                        >
                            <option value="" disabled>Выберите расписание</option>
                            {teacherSections && teacherSections.map(teacherSection => (
                                <option value={teacherSection?.id}>
                                    {teacherSection?.school?.title} | {teacherSection?.occupation}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="one-col">
                        {selectedSection && calendarShow ? (
                            <WeekCalendar
                                events={events}
                                onNavigate={onNavigate}
                                eventPropGetter={eventPropGetter}
                            />
                        ) : ''}
                    </div>
                </>
            )}
        </>
    )
}
