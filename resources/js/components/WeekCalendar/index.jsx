import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import {
    Calendar,
    dateFnsLocalizer,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import ru from "date-fns/locale/ru";

import "./Calendar.scss";

const locales = {
    ru: ru,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export const WeekCalendar = ({ date, events, onSelectEvent, onNavigate, eventPropGetter }) => {
    const [calendarEvents, setCalendarEvents] = useState([]);

    useEffect(() => {
        setCalendarEvents([...events]);
    }, [events, onNavigate]);

    const messages = {
        today: "Сегодня",
        date: "Дата",
        time: "Время",
        next: '>',
        previous: '<'
    };

    return (
        <div className="calendar">
            <Calendar
                defaultDate={moment()}
                onNavigate={onNavigate}
                culture="ru"
                localizer={localizer}
                events={calendarEvents}
                messages={messages}
                views={["week"]}
                min={new Date(0, 0, 0, 6, 0, 0)}
                max={new Date(0, 0, 0, 23, 0, 0)}
                eventPropGetter={eventPropGetter}
                defaultView="week"
                startAccessor={"start"}
                endAccessor={"end"}
                onSelectEvent={onSelectEvent}
                style={{ height: 'auto' }}
            />
        </div>
    );
};
