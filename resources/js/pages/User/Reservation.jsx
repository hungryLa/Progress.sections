import {Subtitle} from "../../components/UI/Subtitle";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"
import useSectionTimetables from "../../store/useSectionTimetables";
import {Loader} from "../../components/UI/Loader";
import useTimetablesStore from "../../store/useTimetablesStore";
import ruLocale from '@fullcalendar/core/locales/ru'
import interactionPlugin from '@fullcalendar/interaction'
import moment from "moment";

import {Button} from "../../components/UI/Button";
import {Modal} from "../../components/UI/Modal";
import {Select} from "../../components/UI/Select";

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
        case 'Monday':
            return 1
        case 'Tuesday':
            return 2
        case 'Wednesday':
            return 3
        case 'Thursday':
            return 4
        case 'Friday':
            return 5
        case 'Saturday':
            return 6
        default:
            return 0
    }
}

export const Reservation = () => {
    const {schoolId, sectionId} = useParams()

    const {loading: timetableLoading, allTimetables, getSchoolsAndTeachersTimetables} = useTimetablesStore()
    const {
        loading,
        sectionTimetables,
        sectionTimetable,
        getSectionTimetables,
        getOneSectionTimetable
    } = useSectionTimetables()

    const [events, setEvents] = useState([])
    const [modalIsActive, setModalIsActive] = useState(false)

    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [days, setDays] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            await getSectionTimetables(sectionId)
            await getSchoolsAndTeachersTimetables(schoolId)
            if (sectionTimetables && allTimetables) {
                sectionTimetables?.forEach(item => {
                    allTimetables?.forEach(subitem => {
                        if (item.timetable_id === subitem.id) {
                            const itemToPush = {
                                ...item,
                                timetable: subitem
                            }
                            setEvents(itemToPush)
                        }
                    })
                })
            }

        }
        fetchData()
    }, [])

    useEffect(() => {
            setStart(allTimetables[0]?.workday_start)
            setEnd(allTimetables[0]?.workday_end)
            setDays(allTimetables[0]?.weekday?.which_days.map(day => translateDayToNumber(day)).sort((a, b) => a - b))
            // console.log('start', start, 'end', end, 'days', days)
            // console.log(allTimetables[0])
            const startTime = moment(allTimetables[0]?.workday_start, 'HH:mm:ss');
            const endTime = moment(allTimetables[0]?.workday_end, 'HH:mm:ss');
            const lessonTime = moment.duration(allTimetables[0]?.lesson_time);

            let testEvents = [];
            let currentTime = moment(startTime);
            while (currentTime.isBefore(endTime)) {
                let testEnd = moment(currentTime).add(lessonTime).format('HH:mm:ss');
                testEvents.push({
                    // id: Math.random() * (20 - 10) + 10,
                    title: 'Lesson',
                    startTime: moment(startTime).format('HH:mm:ss'),
                    endTime: testEnd,
                    daysOfWeek: days
                });
                currentTime.add(lessonTime);
            }
            setEvents(testEvents);
            console.log('events', events);

        },
        [allTimetables]
    )


    return (
        <>
            <Subtitle>Бронирование</Subtitle>
            {loading || timetableLoading ? <Loader/> : (
                <>
                    <div className="two-col">
                        <Select>
                            <option>Выберите преподавателя</option>
                        </Select>
                    </div>
                    {events ? (
                        <FullCalendar
                            dateClick={(info) => {
                                alert('Clicked on: ' + info.dateStr);
                            }}
                            selectable
                            plugins={[timeGridPlugin, interactionPlugin]}
                            initialView="timeGridWeek"
                            locale={ruLocale}
                            slotLabelFormat={{
                                hour: "numeric",
                                minute: '2-digit',
                                omitZeroMinute: false,
                                meridiem: "short"
                            }}
                            allDaySlot={false}
                            slotMinTime={'06:00:00'}
                            slotMaxTime={'22:00:00'}
                            events={events && events}
                            eventContent={(info) => <EventItem info={info}/>}
                            moreLinkClick={'popover'}
                        />
                    ) : ''}
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
    )
}
