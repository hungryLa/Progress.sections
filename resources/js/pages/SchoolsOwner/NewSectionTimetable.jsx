import {Fragment, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {Button} from "../../components/UI/Button";
import {Error} from "../../components/Error";
import {Form} from "../../components/UI/Form";
import {Input} from "../../components/UI/Input";
import {Loader} from "../../components/UI/Loader";
import {Select} from "../../components/UI/Select";
import {Subtitle} from "../../components/UI/Subtitle";
import {getShortWeekdayName} from "../../helpers/getShortWeekdayName";
import {toast} from "react-toastify";
import useSectionTimetables from "../../store/useSectionTimetables";
import useTimetablesStore from "../../store/useTimetablesStore";

export const NewSectionTimetable = () => {
    const {schoolId, sectionId} = useParams();
    const {
        loading: timetablesLoading,
        getSchoolOwnerTimetables,
        schoolOwnerTimetables,
        getSchoolsAndTeachersTimetables,
        allTimetables,
    } = useTimetablesStore();
    const {loading, addSectionTimetable} = useSectionTimetables();
    const navigate = useNavigate();

    const [timetable, setTimetable] = useState(null);
    const [lessonPrice, setLessonPrice] = useState(null);
    const [trialPrice, setTrialPrice] = useState(null);
    const [group, setGroup] = useState(null);
    const [groupPrice, setGroupPrice] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        getSchoolsAndTeachersTimetables(schoolId);
    }, [schoolId, getSchoolsAndTeachersTimetables]);

    useEffect(() => {
        console.log(allTimetables)
    }, [allTimetables])

    const handleTimetable = (e) => {
        setErrors([]);
        setTimetable(e.target.value);
    };
    const handleLessonPrice = (e) => {
        setErrors([]);
        setLessonPrice(e.target.value);
    };
    const handleTrialPrice = (e) => {
        setErrors([]);
        setTrialPrice(e.target.value);
    };
    const handleGroup = (e) => {
        setErrors([]);
        setGroup(e.target.value);
    };
    const handleGroupPrice = (e) => {
        setErrors([]);
        setGroupPrice(e.target.value);
    };

    const handleErrors = (message) => {
        setErrors((prev) => [...prev, message]);
    };

    const handleSubmit = async (e) => {
        setErrors([]);
        e.preventDefault();

        let isValid = true;

        if (!timetable) {
            handleErrors("Должно быть выбрано хотя бы одно расписание");
            isValid = false;
        }
        if (!lessonPrice) {
            handleErrors('Поле "Цена занятия" должно быть заполнено');
            isValid = false;
        }
        if (!trialPrice) {
            handleErrors('Поле "Цена пробного занятия" должно быть заполнено');
            isValid = false;
        }
        console.log(errors.length);

        if (isValid) {
            await addSectionTimetable(
                sectionId,
                timetable,
                lessonPrice,
                trialPrice,
                group,
                groupPrice
            );
            toast("Расписание создано");
            navigate(
                `/schools_owner/schools/${schoolId}/sections/${sectionId}/sectionTimetables`
            );
        }
    };

    return (
        <>
            <Subtitle>Создание расписания секции</Subtitle>
            {loading || timetablesLoading ? (
                <Loader/>
            ) : (
                <>
                    {errors.length > 0 ? <Error errors={errors}/> : ""}
                    <Form
                        onSubmit={handleSubmit}
                        inputs={
                            <>
                                <div className={"one-col"}>
                                    <Select
                                        id={"timetable"}
                                        label={"Расписание"}
                                        onChange={handleTimetable}
                                        value={timetable || ""}
                                    >
                                        <option
                                            value=""
                                            disabled
                                            defaultChecked
                                        >
                                            Выберите расписание
                                        </option>
                                        {allTimetables.map((item) => (
                                            <option
                                                key={item?.id}
                                                value={item?.id}
                                            >
                                                {item?.teacher?.full_name
                                                    ? item?.teacher?.full_name +
                                                    " | "
                                                    : ""}
                                                {item?.weekday?.which_days.map(
                                                    (day, index) => (
                                                        <Fragment
                                                            key={day}
                                                        >{`${getShortWeekdayName(
                                                            day
                                                        )}${
                                                            index !==
                                                            item?.weekday
                                                                ?.which_days
                                                                .length -
                                                            1
                                                                ? ", "
                                                                : " | "
                                                        }`}</Fragment>
                                                    )
                                                )}
                                                {item?.workday_start.split(
                                                        ":"
                                                    )[0] +
                                                    ":" +
                                                    item?.workday_start.split(
                                                        ":"
                                                    )[1]}
                                                -
                                                {item?.workday_end.split(
                                                        ":"
                                                    )[0] +
                                                    ":" +
                                                    item?.workday_end.split(
                                                        ":"
                                                    )[1]}
                                            </option>
                                        ))}
                                    </Select>
                                </div>

                                <div className="two-col">
                                    <Input
                                        type={"number"}
                                        id={"lesson-price"}
                                        label={"Цена занятия *"}
                                        value={lessonPrice || ''}
                                        onChange={handleLessonPrice}
                                    />
                                    <Input
                                        type={"number"}
                                        id={"trial-price"}
                                        label={"Цена пробного занятия *"}
                                        value={trialPrice || ''}
                                        onChange={handleTrialPrice}
                                    />
                                    <Input
                                        type={"number"}
                                        id={"group"}
                                        label={"Количество мест"}
                                        value={group}
                                        onChange={handleGroup || ''}
                                    />
                                    <Input
                                        type={"number"}
                                        id={"group-price"}
                                        label={"Цена группового занятия"}
                                        value={groupPrice || ''}
                                        onChange={handleGroupPrice}
                                    />
                                </div>
                            </>
                        }
                        buttons={
                            <Button type={"submit"} variant={"blue"}>
                                {loading ? <Loader/> : "Создать"}
                            </Button>
                        }
                    />
                </>
            )}
        </>
    );
};
