import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Error } from "../../components/Error";
import { Button } from "../../components/UI/Button";
import { Checkbox } from "../../components/UI/Checkbox";
import { Form } from "../../components/UI/Form";
import { Input } from "../../components/UI/Input";
import { Subtitle } from "../../components/UI/Subtitle";
import useTimetablesStore from "../../store/useTimetablesStore";

export const NewSchoolsTimetable = () => {
    const navigate = useNavigate();
    const { schoolId } = useParams();
    const { loading, createSchoolTimeTable } = useTimetablesStore();
    const [weekdays, setWeekdays] = useState([]);
    const [lessonTime, setLessonTime] = useState("");
    const [workdayStart, setWorkdayStart] = useState("");
    const [workdayEnd, setWorkdayEnd] = useState("");
    const [withRest, setWithRest] = useState(false);
    const [restStart, setRestStart] = useState("");
    const [restEnd, setRestEnd] = useState("");
    const [errors, setErrors] = useState([]);
    const [restWarn, setRestWarn] = useState("");

    const handleWeekday = (e) => {
        setErrors([])
        let weekList = [...weekdays];
        if (e.target.checked) {
            weekList = [...weekdays, e.target.value];
        } else {
            weekList.splice(weekdays.indexOf(e.target.value), 1);
        }
        setWeekdays(weekList);
    };

    const handleRest = (e) => {
        setErrors([])
        if (e.target.checked) {
            setWithRest(e.target.value);
        } else {
            setWithRest(false);
        }
    };

    const handleRestStart = (e) => {
        setErrors([])
        setRestWarn("");
        setRestStart(e.target.value);
    };

    const handleRestEnd = (e) => {
        setRestWarn("");
        setRestEnd(e.target.value);
    };

    useEffect(() => {
        if (restStart && restEnd) {
            const startTime = moment(workdayStart, "HH:mm:ss");
            const endTime = moment(workdayEnd, "HH:mm:ss");
            const lessonDuration = moment.duration(lessonTime);

            let events = [];
            let currTime = moment(startTime);
            while (currTime.isBefore(endTime)) {
                let start = moment(currTime).format("HH:mm:ss");
                let end = moment(currTime)
                    .add(lessonDuration)
                    .format("HH:mm:ss");

                console.log(start);
                console.log(end);

                events.push({
                    start,
                    end,
                });

                currTime.add(lessonDuration);
            }

            events.forEach((event) => {
                if (
                    moment(event.start, "HH:mm:ss").isSameOrAfter(
                        moment(restStart, "HH:mm:ss")
                    ) &&
                    moment(event.end, "HH:mm:ss").isBefore(
                        moment(restEnd, "HH:mm:ss")
                    )
                ) {
                    setRestWarn("Время обеда и занятий пересекаются");
                }
            });
        }
    }, [restStart, restEnd]);

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

        console.log(validationErrors);

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
        } else {
            await createSchoolTimeTable(
                schoolId,
                weekdays,
                lessonTime,
                workdayStart,
                workdayEnd,
                withRest,
                restStart,
                restEnd
            );
            toast("Расписание создано");
            navigate(`/schools_owner/schools/${schoolId}/timetables`);
        }
    };

    return (
        <>
            <Subtitle>Новое расписание</Subtitle>
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
                                isChecked={weekdays?.some(
                                    (day) => day === "Monday"
                                )}
                            />
                            <Checkbox
                                id={"Tuesday"}
                                value={"Tuesday"}
                                name={"weekday[]"}
                                label={"Вторник"}
                                onChange={handleWeekday}
                                isChecked={weekdays?.some(
                                    (day) => day === "Tuesday"
                                )}
                            />
                            <Checkbox
                                id={"Wednesday"}
                                value={"Wednesday"}
                                name={"weekday[]"}
                                label={"Среда"}
                                onChange={handleWeekday}
                                isChecked={weekdays?.some(
                                    (day) => day === "Wednesday"
                                )}
                            />
                            <Checkbox
                                id={"Thursday"}
                                value={"Thursday"}
                                name={"weekday[]"}
                                label={"Четверг"}
                                onChange={handleWeekday}
                                isChecked={weekdays?.some(
                                    (day) => day === "Thursday"
                                )}
                            />
                            <Checkbox
                                id={"Friday"}
                                value={"Friday"}
                                name={"weekday[]"}
                                label={"Пятница"}
                                onChange={handleWeekday}
                                isChecked={weekdays?.some(
                                    (day) => day === "Friday"
                                )}
                            />
                            <Checkbox
                                id={"Saturday"}
                                value={"Saturday"}
                                name={"weekday[]"}
                                label={"Суббота"}
                                onChange={handleWeekday}
                                isChecked={weekdays?.some(
                                    (day) => day === "Saturday"
                                )}
                            />
                            <Checkbox
                                id={"Sunday"}
                                value={"Sunday"}
                                name={"weekday[]"}
                                label={"Воскресенье"}
                                onChange={handleWeekday}
                                isChecked={weekdays?.some(
                                    (day) => day === "Sunday"
                                )}
                            />
                        </div>
                        <div className="two-col">
                            <Input
                                type={"time"}
                                label={"Длительность занятия"}
                                value={lessonTime}
                                onChange={(e) => {
                                    setErrors([])
                                    setLessonTime(e.target.value)
                                }}
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
                                value={true}
                                name={"rest"}
                                label={"Без обеда"}
                                onChange={handleRest}
                                isChecked={withRest}
                            />
                        </div>
                        {!withRest && (
                            <>
                                <div className={"two-col"}>
                                    <Input
                                        type={"time"}
                                        label={"Начало обеда"}
                                        value={restStart}
                                        onChange={handleRestStart}
                                    />
                                    <Input
                                        type={"time"}
                                        label={"Конец обеда"}
                                        value={restEnd}
                                        onChange={handleRestEnd}
                                    />
                                </div>
                                {restWarn && (
                                    <span className="time-warn">
                                        {restWarn}
                                    </span>
                                )}
                            </>
                        )}
                    </>
                }
                buttons={
                    <Button type={"submit"} variant={"white"}>
                        {loading ? "Идет создание ..." : "Создать"}
                    </Button>
                }
            />
        </>
    );
};
