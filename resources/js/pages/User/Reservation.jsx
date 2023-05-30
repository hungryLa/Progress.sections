import { Fragment, useMemo, useEffect, useState } from "react";

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
        loading,
        sectionTimetables,
        getSectionTimetables,
    } = useSectionTimetables();

    const [events, setEvents] = useState([]);
    const [modalIsActive, setModalIsActive] = useState(false);

    const [currentSectionTimetable, setCurrentSectionTimetable] = useState({});

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [days, setDays] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getSectionTimetables(sectionId);
        };
        fetchData();

        console.log("sectionTimetables", sectionTimetables);
    }, [
        sectionId,
        getSectionTimetables
    ]);

    const handleSelectTimetable = (e) => {
        const selectedTimetableId = e.target.value;
        setCurrentSectionTimetable(
            sectionTimetables.filter((item) => item?.id == selectedTimetableId)[0]
        );

        console.log(
            "events",
            events,
            "currentSectionTimetable",
            currentSectionTimetable
        );
    };

    useEffect(() => {
        setDays(
            currentSectionTimetable?.timetable?.weekday?.which_days
                ?.map((day) => translateDayToNumber(day))
                ?.sort((a, b) => a - b) || []
        );
    }, [currentSectionTimetable]);

    useEffect(() => {
        setStart(currentSectionTimetable?.timetable?.workday_start);
        setEnd(currentSectionTimetable?.timetable?.workday_end);

        const startTime = moment(currentSectionTimetable?.timetable?.workday_start, "HH:mm:ss");
        const endTime = moment(currentSectionTimetable?.timetable?.workday_end, "HH:mm:ss");
        const lessonTime = moment.duration(currentSectionTimetable?.timetable?.lesson_time);
        const restStart = moment(currentSectionTimetable?.timetable?.rest_start, "HH:mm:ss");
        const restEnd = moment(currentSectionTimetable?.timetable?.rest_end, "HH:mm:ss");

        let testEvents = [];
        let currentTime = moment(startTime);
        while (currentTime.isBefore(endTime)) {
            let testStart = moment(currentTime).format("HH:mm:ss");
            let testEnd = moment(currentTime)
                .add(lessonTime)
                .format("HH:mm:ss");

            testEvents.push({
                title: "Записаться",
                startTime: testStart,
                endTime: testEnd,
                daysOfWeek: days && days,
            });

            currentTime.add(lessonTime);
        }

        testEvents.forEach((event, index) => {
            if (!currentSectionTimetable?.timetable?.without_rest) {
                console.log(`event#${index}`, event);
                if (
                    moment(event.startTime, "HH:mm:ss").isBetween(
                        moment(currentSectionTimetable?.timetable?.rest_start, "HH:mm:ss"),
                        moment(currentSectionTimetable?.timetable?.rest_end, "HH:mm:ss"),
                        undefined,
                        "[)"
                    ) ||
                    moment(event.endTime, "HH:mm:ss").isBetween(
                        moment(currentSectionTimetable?.timetable?.rest_start, "HH:mm:ss"),
                        moment(currentSectionTimetable?.timetable?.rest_end, "HH:mm:ss"),
                        undefined,
                        "(]"
                    )
                ) {
                    console.log("Неугодный", event);
                    testEvents.splice(index, 1);
                }
            }
        });

        setEvents([...testEvents]);
    }, [currentSectionTimetable?.timetable, days]);

    return (
        <>
            <Subtitle>Бронирование</Subtitle>
            {loading ? (
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
                                    {item?.timetable?.teacher?.full_name
                                        ? item?.timetable?.teacher?.full_name + " | "
                                        : ""}
                                    {item?.timetable?.weekday?.which_days.map(
                                        (day, index) => (
                                            <Fragment
                                                key={day}
                                            >{`${getShortWeekdayName(day)}${
                                                index !==
                                                item?.timetable?.weekday?.which_days
                                                    .length -
                                                    1
                                                    ? ", "
                                                    : " | "
                                            }`}</Fragment>
                                        )
                                    )}
                                    {item?.timetable?.workday_start.split(":")[0] +
                                        ":" +
                                        item?.timetable?.workday_start.split(":")[1]}
                                    -
                                    {item?.timetable?.workday_end.split(":")[0] +
                                        ":" +
                                        item?.timetable?.workday_end.split(":")[1]}
                                </option>
                            ))}
                        </Select>
                    </div>
                    {events && currentSectionTimetable && currentSectionTimetable?.timetable ? (
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
                            events={(events && events) || []}
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
