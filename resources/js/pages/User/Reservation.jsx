import {useEffect, useState} from "react";

import {Button} from "../../components/UI/Button";
import FullCalendar from "@fullcalendar/react";
import {Loader} from "../../components/UI/Loader";
import {Modal} from "../../components/UI/Modal";
import {Select} from "../../components/UI/Select";
import {Subtitle} from "../../components/UI/Subtitle";
import interactionPlugin from '@fullcalendar/interaction'
import moment from "moment";
import ruLocale from '@fullcalendar/core/locales/ru'
import timeGridPlugin from "@fullcalendar/timegrid"
import {useParams} from "react-router-dom";
import useSectionTimetables from "../../store/useSectionTimetables";
import useTimetablesStore from "../../store/useTimetablesStore";

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
    const [selectedTimetable, setSelectedTimetable] = useState({})
    const [modalIsActive, setModalIsActive] = useState(false)
    const [mergedSchedules, setMergedSchedules] = useState([])

    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [days, setDays] = useState(null)

    const removeDuplicates = (array, property) => {
        const uniqueValues = new Set();
        return array.filter((obj) => {
          const value = obj[property];
          if (!uniqueValues.has(value)) {
            uniqueValues.add(value);
            return true;
          }
          return false;
        });
      };

    useEffect(() => {
        // Получаю расписания секций и расписания школ и учителей, объединяю данные
        const fetchData = async () => {
            await getSectionTimetables(sectionId)
            await getSchoolsAndTeachersTimetables(schoolId)
            console.log('sec tt', sectionTimetables);
            console.log('all tt', allTimetables);
            if (sectionTimetables && allTimetables) {
                sectionTimetables?.forEach(item => {
                    allTimetables?.forEach(subitem => {
                        if (item.timetable_id === subitem.id) {
                            const itemToPush = {
                                ...item,
                                timetable: subitem
                            }
                            console.log(itemToPush)
                            setMergedSchedules((prev) => [...prev, itemToPush])
                        }
                    })
                })
            }
            console.log('events', events)
        }
        fetchData()
    }, [])

    useEffect(() => {
        // Удаляю дубликаты
        console.log('schedules', removeDuplicates(mergedSchedules, 'id'))
        setMergedSchedules(removeDuplicates(mergedSchedules, 'id'))
    }, [mergedSchedules])

    useEffect(() => {
            console.log('all', allTimetables)
            setStart(allTimetables[1]?.workday_start)
            setEnd(allTimetables[1]?.workday_end)
            setDays(allTimetables[1]?.weekday?.which_days.map(day => translateDayToNumber(day)).sort((a, b) => a - b))
            console.log('start', start, 'end', end, 'days', days)
            const startTime = moment(allTimetables[0]?.workday_start, 'HH:mm:ss');
            const endTime = moment(allTimetables[0]?.workday_end, 'HH:mm:ss');
            const lessonTime = moment.duration(allTimetables[0]?.lesson_time);

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
        [allTimetables]
    )

    const handleSelectTimetable = (e) => {
        setSelectedTimetable(e.target.value)
    }

    useEffect(() => {
        console.log(selectedTimetable);
        // console.log('selected', sectionTimetables.filter(tt => tt.id === selectedTimetable));
        // console.log(sectionTimetables.find(item => item.id === 12))
    }, [selectedTimetable, setSelectedTimetable])


    return (
        <>
            <Subtitle>Бронирование</Subtitle>
            {loading || timetableLoading ? <Loader/> : (
                <>
                    <div className="two-col">
                        <Select label={'Выберите расписание'} onChange={handleSelectTimetable}>
                            <option value=''  disabled defaultChecked>Выберите расписание</option>
                            {sectionTimetables?.map(tt => (
                                <option key={tt.id} value={tt.id}>{tt.id}</option>
                            ))}
                        </Select>
                    </div>
                    {events ? (
                        <FullCalendar
                            dateClick={(info) => {
                                alert('Clicked on: ' + info.dateStr);
                            }}
                            eventClick={(info) => {
                                alert(JSON.stringify(info))
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
