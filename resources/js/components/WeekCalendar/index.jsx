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

export const WeekCalendar = ({ events, onSelectEvent, onNavigate }) => {
    const [calendarEvents, setCalendarEvents] = useState([]);

    useEffect(() => {
        setCalendarEvents([...events]);
    }, [events, onNavigate]);

    const eventPropGetter = useCallback((event, start, end, isSelected) => ({
        ...(isSelected && {
            style: {
                backgroundColor: "#000",
            },
        }),
    }));

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
                onNavigate={onNavigate}
                culture="ru"
                localizer={localizer}
                events={calendarEvents}
                messages={messages}
                views={["week"]}
                min={new Date(0, 0, 0, 6, 0, 0)}
                max={new Date(0, 0, 0, 22, 0, 0)}
                eventPropGetter={eventPropGetter}
                defaultView="week"
                startAccessor={"start"}
                endAccessor={"end"}
                onSelectEvent={onSelectEvent}
                style={{ height: 500 }}
            />
        </div>
    );
};
