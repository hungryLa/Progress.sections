import { create } from "zustand";
import moment from "moment";
import useSectionTimetables from "./useSectionTimetables";
import { translateDayToNumber } from "../helpers/translateDayToNumber";

const useCalendarStore = create((set, get) => ({
    loading: false,
    currentSectionTimetable: {},
    events: [],
    difference: 0,

    setDifference: (value) => {
        set({ difference: get().difference + value });
    },

    getCurrentSectionTimetable: (timetableId) => {
        const sectionTimetable = useSectionTimetables
            .getState()
            .sectionTimetables.filter((item) => item?.id == timetableId)[0];
        set({
            currentSectionTimetable: sectionTimetable,
        });
    },

    onNavigate: (some, _, type) => {
        set({ loading: true });
        const currentDate = moment().toDate();
        let lastDate = currentDate;

        if (some.toLocaleDateString() == lastDate.toLocaleDateString()) {
            set({ difference: 0 });
            console.log(Math.abs(get().difference));
        } else if (type === "PREV") {
            get().setDifference(-1);
            console.log(Math.abs(get().difference));
        } else if (type === "NEXT") {
            get().setDifference(1);
            console.log(Math.abs(get().difference));
        }

        const days =
            get()
                .currentSectionTimetable?.timetable?.weekday?.which_days?.map(
                    (day) => translateDayToNumber(day)
                )
                ?.sort((a, b) => a - b) || [];

        let testEvents = [];

        days.forEach((day) => {
            const startTime = moment(
                get().currentSectionTimetable?.timetable?.workday_start,
                "HH:mm:ss"
            );
            const endTime = moment(
                get().currentSectionTimetable?.timetable?.workday_end,
                "HH:mm:ss"
            );
            const lessonTime = moment.duration(
                get().currentSectionTimetable?.timetable?.lesson_time
            );

            let currentTime = moment(startTime);

            while (currentTime.isBefore(endTime)) {
                let testStart = moment(currentTime).format("HH:mm:ss");
                let testEnd = moment(currentTime)
                    .add(lessonTime)
                    .format("HH:mm:ss");

                const currentDate = moment().format("YYYY-MM-DD");

                const startDateTime = moment(`${currentDate} ${testStart}`);
                const endDateTime = moment(`${currentDate} ${testEnd}`);

                if (day === moment(startDateTime).day()) {
                    if (get().difference > 0) {
                        testEvents.push({
                            title: `${
                                get().currentSectionTimetable.lesson_price
                            }р.`,
                            start: startDateTime
                                .add(Math.abs(get().difference), "week")
                                .toDate(),
                            end: endDateTime
                                .add(Math.abs(get().difference), "week")
                                .toDate(),
                        });
                    }
                    else if (get().difference < 0) {
                        testEvents.push({
                            title: `${
                                get().currentSectionTimetable.lesson_price
                            }р.`,
                            start: startDateTime
                                .subtract(Math.abs(get().difference), "week")
                                .toDate(),
                            end: endDateTime
                                .subtract(Math.abs(get().difference), "week")
                                .toDate(),
                        });
                    }
                    else testEvents.push({
                        title: `${
                            get().currentSectionTimetable.lesson_price
                        }р.`,
                        start: startDateTime.toDate(),
                        end: endDateTime.toDate(),
                    });
                } else {
                    if (get().difference > 0) {
                        testEvents.push({
                            title: `${
                                get().currentSectionTimetable.lesson_price
                            }р.`,
                            start: startDateTime
                                .add(Math.abs(get().difference), "week")
                                .toDate(),
                            end: endDateTime
                                .add(Math.abs(get().difference), "week")
                                .toDate(),
                        });
                    }
                    else if (get().difference < 0) {
                        testEvents.push({
                            title: `${
                                get().currentSectionTimetable.lesson_price
                            }р.`,
                            start: startDateTime
                                .subtract(Math.abs(get().difference), "week")
                                .toDate(),
                            end: endDateTime
                                .subtract(Math.abs(get().difference), "week")
                                .toDate(),
                        });
                    }
                    else testEvents.push({
                        title: `${
                            get().currentSectionTimetable.lesson_price
                        }р.`,
                        start: startDateTime.toDate(),
                        end: endDateTime.toDate(),
                    });
                }

                currentTime.add(lessonTime);
            }

            testEvents.forEach((event, index) => {
                if (moment(event.start).isBefore(moment())) {
                    testEvents.splice(index, 1);
                }
            });
        });

        set({ events: [...testEvents], loading: false });
    },

    getTestEvents: () => {
        set({ loading: true });
        const days =
            get()
                .currentSectionTimetable?.timetable?.weekday?.which_days?.map(
                    (day) => translateDayToNumber(day)
                )
                ?.sort((a, b) => a - b) || [];

        let testEvents = [];

        days.forEach((day) => {
            const startTime = moment(
                get().currentSectionTimetable?.timetable?.workday_start,
                "HH:mm:ss"
            );
            const endTime = moment(
                get().currentSectionTimetable?.timetable?.workday_end,
                "HH:mm:ss"
            );
            const lessonTime = moment.duration(
                get().currentSectionTimetable?.timetable?.lesson_time
            );

            let currentTime = moment(startTime);

            while (currentTime.isBefore(endTime)) {
                let testStart = moment(currentTime).format("HH:mm:ss");
                let testEnd = moment(currentTime)
                    .add(lessonTime)
                    .format("HH:mm:ss");

                const currentDate = moment().format("YYYY-MM-DD");

                const startDateTime = moment(`${currentDate} ${testStart}`);
                const endDateTime = moment(`${currentDate} ${testEnd}`);

                if (day === moment(startDateTime).day()) {
                    testEvents.push({
                        title: `${
                            get().currentSectionTimetable.lesson_price
                        }р.`,
                        start: startDateTime.toDate(),
                        end: endDateTime.toDate(),
                    });
                } else {
                    testEvents.push({
                        title: `${
                            get().currentSectionTimetable.lesson_price
                        }p.`,
                        start: moment(startDateTime)
                            .subtract(moment(startDateTime).day() - day, "day")
                            .toDate(),
                        end: moment(endDateTime)
                            .subtract(moment(startDateTime).day() - day, "day")
                            .toDate(),
                    });
                }

                currentTime.add(lessonTime);
            }

            // testEvents.forEach((event, index) => {
            //     if (moment(event.start).isBetween(moment())) {
            //         testEvents.splice(index, 1);
            //     }
            // });
        });

        set({ events: [...testEvents], loading: false });
    },

    getEvents: () => {
        set({ loading: true });
        const days =
            get()
                .currentSectionTimetable?.timetable?.weekday?.which_days?.map(
                    (day) => translateDayToNumber(day)
                )
                ?.sort((a, b) => a - b) || [];

        set({ loading: true });
        const startTime = moment(
            get().currentSectionTimetable?.timetable?.workday_start,
            "HH:mm:ss"
        );
        const endTime = moment(
            get().currentSectionTimetable?.timetable?.workday_end,
            "HH:mm:ss"
        );
        const lessonTime = moment.duration(
            get().currentSectionTimetable?.timetable?.lesson_time
        );
        let testEvents = [];
        let currentTime = moment(startTime);
        while (currentTime.isBefore(endTime)) {
            let testStart = moment(currentTime).format("HH:mm:ss");
            let testEnd = moment(currentTime)
                .add(lessonTime)
                .format("HH:mm:ss");

            const currentDate = moment().format("YYYY-MM-DD");

            // Combine the current date with the event start and end times
            const startDateTime = moment(`${currentDate} ${testStart}`)._d;
            const endDateTime = moment(`${currentDate} ${testEnd}`);

            testEvents.push({
                title: `${get().currentSectionTimetable.lesson_price}р.`,
                start: startDateTime,
                end: endDateTime,
                // daysOfWeek: days && days,
            });

            currentTime.add(lessonTime);
        }

        testEvents.forEach((event, index) => {
            if (!get().currentSectionTimetable?.timetable?.without_rest) {
                if (
                    moment(
                        get().currentSectionTimetable?.timetable?.rest_start,
                        "HH:mm:ss"
                    ).isBetween(
                        moment(event.startTime, "HH:mm:ss"),
                        moment(event.endTime, "HH:mm:ss"),
                        undefined,
                        "[)"
                    ) ||
                    moment(
                        get().currentSectionTimetable?.timetable?.rest_end,
                        "HH:mm:ss"
                    ).isBetween(
                        moment(event.startTime, "HH:mm:ss"),
                        moment(event.endTime, "HH:mm:ss"),
                        undefined,
                        "()"
                    )
                ) {
                    testEvents.splice(index, 1);
                }
            }
        });

        testEvents.forEach((event, index) => {
            if (moment(event.startTime).isBetween(moment(new Date()))) {
                testEvents.splice(index, 1);
            }
        });

        set({ loading: false, events: [...testEvents], loading: false });
    },
}));
export default useCalendarStore;
