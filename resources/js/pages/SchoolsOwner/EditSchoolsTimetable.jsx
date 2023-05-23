import { useNavigate, useParams } from "react-router-dom";
import { Subtitle } from "../../components/UI/Subtitle";
import { Form } from "../../components/UI/Form";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { useEffect, useState } from "react";
import useTimetablesStore from "../../store/useTimetablesStore";
import { Checkbox } from "../../components/UI/Checkbox";
import { Error } from "../../components/Error";

export const EditSchoolsTimetable = () => {
    const navigate = useNavigate();
    const { schoolId, timetableId } = useParams();
    const { loading, editSchoolsOwnerTimetable, getOneTimetable, timetable } =
        useTimetablesStore();
    const [weekdays, setWeekdays] = useState([]);
    const [lessonTime, setLessonTime] = useState("");
    const [workdayStart, setWorkdayStart] = useState("");
    const [workdayEnd, setWorkdayEnd] = useState("");
    const [withRest, setWithRest] = useState(false);
    const [restStart, setRestStart] = useState("");
    const [restEnd, setRestEnd] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchTimetable = async () => {
            await getOneTimetable(timetableId);
        };

        fetchTimetable();
    }, [timetableId]);

    useEffect(() => {
        setWeekdays(timetable?.weekday?.which_days || []);
        setLessonTime(timetable?.lesson_time);
        setWorkdayStart(timetable?.workday_start);
        setWorkdayEnd(timetable?.workday_end);
        setWithRest(timetable?.without_rest);
        if (timetable?.without_rest) {
            setRestStart("");
            setRestEnd("");
        } else {
            setRestStart(timetable?.rest_start);
            setRestEnd(timetable?.rest_end);
        }
    }, [timetable]);

    const handleWeekday = (e) => {
        let weekList = [...weekdays];
        if (e.target.checked) {
            weekList = [...weekdays, e.target.value];
        } else {
            weekList.splice(weekdays.indexOf(e.target.value), 1);
        }
        setWeekdays(weekList);
    };

    const handleRest = (e) => {
        if (e.target.checked) {
            setWithRest(e.target.value);
        } else {
            setWithRest(false);
        }
    };

    const handleAddError = (value) => {
        setErrors((prev) => [...prev, value]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        const validationErrors = [];
        if (weekdays.length < 1)
            validationErrors.push("Дни недели обязательны для заполнения");
        if (!lessonTime)
            validationErrors.push("Время занятия обязательно для заполнения");
        if (!workdayStart)
            validationErrors.push(
                "Время начала занятия обязательно для заполнения"
            );
        if (!workdayEnd)
            validationErrors.push(
                "Время конца занятия обязательно для заполнения"
            );
        if (!withRest) {
            if (!restStart || !restEnd)
                validationErrors.push(
                    "Наличие перерыва обязательно для заполнения"
                );
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
        } else {
            await editSchoolsOwnerTimetable(
                timetableId,
                schoolId,
                weekdays,
                lessonTime,
                workdayStart,
                workdayEnd,
                withRest,
                restStart,
                restEnd
            );
            navigate(`/schools_owner/schools/${schoolId}/timetables`);
        }
    };

    return (
        <>
            <Subtitle>Изменить расписание</Subtitle>
            {errors.length !== 0 ? <Error errors={errors} /> : ""}
            <Form
                onSubmit={handleSubmit}
                inputs={
                    <>
                        <Subtitle className={"subtitle-mini"}>
                            Дни недели
                        </Subtitle>
                        <div className={"three-col"}>
                            <Checkbox
                                id={"Monday"}
                                value={"Monday"}
                                name={"weekday[]"}
                                label={"Понедельник"}
                                onChange={handleWeekday}
                                isChecked={weekdays.some(
                                    (day) => day === "Monday"
                                )}
                            />
                            <Checkbox
                                id={"Tuesday"}
                                value={"Tuesday"}
                                name={"weekday[]"}
                                label={"Вторник"}
                                onChange={handleWeekday}
                                isChecked={weekdays.some(
                                    (day) => day === "Tuesday"
                                )}
                            />
                            <Checkbox
                                id={"Wednesday"}
                                value={"Wednesday"}
                                name={"weekday[]"}
                                label={"Среда"}
                                onChange={handleWeekday}
                                isChecked={weekdays.some(
                                    (day) => day === "Wednesday"
                                )}
                            />
                            <Checkbox
                                id={"Thursday"}
                                value={"Thursday"}
                                name={"weekday[]"}
                                label={"Четверг"}
                                onChange={handleWeekday}
                                isChecked={weekdays.some(
                                    (day) => day === "Thursday"
                                )}
                            />
                            <Checkbox
                                id={"Friday"}
                                value={"Friday"}
                                name={"weekday[]"}
                                label={"Пятница"}
                                onChange={handleWeekday}
                                isChecked={weekdays.some(
                                    (day) => day === "Friday"
                                )}
                            />
                            <Checkbox
                                id={"Saturday"}
                                value={"Saturday"}
                                name={"weekday[]"}
                                label={"Суббота"}
                                onChange={handleWeekday}
                                isChecked={weekdays.some(
                                    (day) => day === "Saturday"
                                )}
                            />
                            <Checkbox
                                id={"Sunday"}
                                value={"Sunday"}
                                name={"weekday[]"}
                                label={"Воскресенье"}
                                onChange={handleWeekday}
                                isChecked={weekdays.some(
                                    (day) => day === "Sunday"
                                )}
                            />
                        </div>
                        <div className="two-col">
                            <Input
                                type={"time"}
                                label={"Длительность занятия"}
                                value={lessonTime}
                                onChange={(e) => setLessonTime(e.target.value)}
                            />
                        </div>
                        <div className={"two-col"}>
                            <Input
                                type={"time"}
                                label={"Время начала"}
                                value={workdayStart}
                                onChange={(e) =>
                                    setWorkdayStart(e.target.value)
                                }
                            />
                            <Input
                                type={"time"}
                                label={"Время конца"}
                                value={workdayEnd}
                                onChange={(e) => setWorkdayEnd(e.target.value)}
                            />
                        </div>
                        <div className={"three-col"}>
                            <Checkbox
                                id={"rest"}
                                name={"rest"}
                                label={"Без обеда"}
                                value={withRest}
                                onChange={handleRest}
                                isChecked={withRest}
                            />
                        </div>
                        {!withRest && (
                            <div className={"two-col"}>
                                <Input
                                    type={"time"}
                                    label={"Начало обеда"}
                                    value={restStart}
                                    onChange={(e) =>
                                        setRestStart(e.target.value)
                                    }
                                />
                                <Input
                                    type={"time"}
                                    label={"Конец обеда"}
                                    value={restEnd}
                                    onChange={(e) => setRestEnd(e.target.value)}
                                />
                            </div>
                        )}
                    </>
                }
                buttons={
                    <Button type={"submit"} variant={"white"}>
                        {loading ? "Идет редактирование ..." : "Редактировать"}
                    </Button>
                }
            />
        </>
    );
};
