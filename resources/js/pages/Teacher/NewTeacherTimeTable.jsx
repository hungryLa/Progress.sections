import {Subtitle} from "../../components/UI/Subtitle";
import {useNavigate} from "react-router-dom";
import useTimetablesStore from "../../store/useTimetablesStore";
import useAuthStore from "../../store/useAuthStore";
import {useState} from "react";
import {Error} from "../../components/Error";
import {Checkbox} from "../../components/UI/Checkbox";
import {Input} from "../../components/UI/Input";
import {Button} from "../../components/UI/Button";
import {Form} from "../../components/UI/Form";
import {Loader} from "../../components/UI/Loader";

export const NewTeacherTimeTable = () => {
    const navigate = useNavigate()
    const {loading: authLoading, user} = useAuthStore()
    const {loading, createTeacherTimeTable} = useTimetablesStore()
    const [weekdays, setWeekdays] = useState([])
    const [lessonTime, setLessonTime] = useState("")
    const [workdayStart, setWorkdayStart] = useState("");
    const [workdayEnd, setWorkdayEnd] = useState("");
    const [withRest, setWithRest] = useState(false);
    const [restStart, setRestStart] = useState("");
    const [restEnd, setRestEnd] = useState("");
    const [errors, setErrors] = useState([]);

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
            await createTeacherTimeTable(
                user?.id,
                weekdays,
                lessonTime,
                workdayStart,
                workdayEnd,
                withRest,
                restStart,
                restEnd
            );
            navigate(`/teacher/timetables/`);
        }
    };



    return (
        <>
            <Subtitle>Новое расписание</Subtitle>
            {loading || authLoading ? <Loader /> : (
                <>
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
                                        value={true}
                                        name={"rest"}
                                        label={"Без обеда"}
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
                                {loading ? "Идет создание ..." : "Создать"}
                            </Button>
                        }
                    />
                </>
            )}
        </>
    )
}
