import {Subtitle} from "../../components/UI/Subtitle";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import useSectionTimetables from "../../store/useSectionTimetables";
import {Loader} from "../../components/UI/Loader";
import useTimetablesStore from "../../store/useTimetablesStore";
import ruLocale from '@fullcalendar/core/locales/ru'

export const Reservation = () => {
    const {schoolId, sectionId} = useParams()

    const {loading: timetableLoading, schoolOwnerTimetables, getSchoolOwnerTimetables} = useTimetablesStore()
    const {loading, sectionTimetables, sectionTimetable, getSectionTimetables, getOneSectionTimetable} = useSectionTimetables()

    const [events, setEvents] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        getSectionTimetables(sectionId)
        getSchoolOwnerTimetables(schoolId)
        console.log('sectionTimetables', sectionTimetables)
        console.log('schoolOwnerTimetables', schoolOwnerTimetables)
        setIsLoaded(true)
    }, [])

    useState(() => {
        const test = []
        sectionTimetables && schoolOwnerTimetables && sectionTimetables.forEach(item => {
            schoolOwnerTimetables.forEach(subitem => {
                if(item.timetable_id === subitem.id) {
                    const itemToPush = item.timetable = subitem
                    test.push(itemToPush)
                }
            })
        })
        console.log('test',test)
    }, [isLoaded])

    return (
        <>
            <Subtitle>Бронирование</Subtitle>
            {loading || timetableLoading ? <Loader /> : (
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    locale={ruLocale}
                />
            )}
        </>
    )
}
