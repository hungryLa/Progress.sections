import {Subtitle} from "../../components/UI/Subtitle";
import {Fragment, useEffect, useState} from "react";
import useSectionTimetables from "../../store/useSectionTimetables";
import {Error} from "../../components/Error";
import {Loader} from "../../components/UI/Loader";
import {useNavigate, useParams} from "react-router-dom";
import useTimetablesStore from "../../store/useTimetablesStore";
import {Form} from "../../components/UI/Form";
import {Select} from "../../components/UI/Select";
import {getShortWeekdayName} from "../../helpers/getShortWeekdayName";
import {Input} from "../../components/UI/Input";
import {Button} from "../../components/UI/Button";
import {toast, ToastContainer} from "react-toastify";

export const EditSectionTimetable = () => {
    const {schoolId, sectionId, sectionTimetableId} = useParams()
    const navigate = useNavigate()

    const {
        loading: timetablesLoading,
        getSchoolOwnerTimetables,
        schoolOwnerTimetables
    } = useTimetablesStore()
    const {
        loading,
        sectionTimetable,
        getOneSectionTimetable,
        editSectionTimetable
    } = useSectionTimetables()

    useEffect(() => {
        const fetchSchoolTimeTables = async () => {
            await getSchoolOwnerTimetables(schoolId)
        }

        fetchSchoolTimeTables()
    }, [schoolId, getSchoolOwnerTimetables])

    useEffect(() => {
        getOneSectionTimetable(sectionId, sectionTimetableId)
    }, [sectionId, sectionTimetableId, getOneSectionTimetable])

    const [timetable, setTimetable] = useState(null)
    const [lessonPrice, setLessonPrice] = useState(null)
    const [trialPrice, setTrialPrice] = useState(null)
    const [group, setGroup] = useState(null)
    const [groupPrice, setGroupPrice] = useState(null)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setTimetable(sectionTimetable?.timetable_id)
        setLessonPrice(sectionTimetable?.lesson_price)
        setTrialPrice(sectionTimetable?.trial_price)
        setGroup(sectionTimetable?.group)
        setGroupPrice(sectionTimetable?.group_price)
    }, [
        sectionTimetable?.timetable_id,
        sectionTimetable?.lesson_price,
        sectionTimetable?.trial_price,
        sectionTimetable?.group,
        sectionTimetable?.group_price
    ])

    const handleTimetable = (e) => {
        setErrors([])
        setTimetable(e.target.value)
    }
    const handleLessonPrice = (e) => {
        setErrors([])
        setLessonPrice(e.target.value)
    }
    const handleTrialPrice = (e) => {
        setErrors([])
        setTrialPrice(e.target.value)
    }
    const handleGroup = (e) => {
        setErrors([])
        setGroup(e.target.value)
    }
    const handleGroupPrice = (e) => {
        setErrors([])
        setGroupPrice(e.target.value)
    }

    const handleErrors = (message) => {
        setErrors(prev => [...prev, message])
    }

    const handleSubmit = async (e) => {
        setErrors([])
        e.preventDefault()

        if (!timetable) handleErrors('Должно быть выбрано хотя бы одно расписание')
        if (!lessonPrice) handleErrors('Поле "Цена занятия" должно быть заполнено')
        if (!trialPrice) handleErrors('Поле "Цена пробного занятия" должно быть заполнено')
        console.log(errors.length)
        await editSectionTimetable(
            sectionId,
            sectionTimetableId,
            timetable,
            lessonPrice,
            trialPrice,
            group,
            groupPrice
        )

        if (!!timetable && !!lessonPrice && !!trialPrice && errors.length === 0) {
            toast('Успешно редактировано')
            // navigate(`/schools_owner/schools/${schoolId}/sections/${sectionId}/sectionTimetables`)
        }
    }

    return (
        <>
            <Subtitle>Редактирование расписания секции</Subtitle>
            {loading || timetablesLoading ? <Loader/> : (
                <>
                    {errors.length > 0 ? <Error errors={errors}/> : ''}
                    <Form
                        onSubmit={handleSubmit}
                        inputs={
                            <>
                                <div className={'one-col'}>
                                    <Select
                                        id={'timetable'}
                                        label={'Расписание'}
                                        onChange={handleTimetable}
                                        value={timetable || ''}
                                    >
                                        <option value="" disabled defaultChecked>Выберите расписание</option>
                                        {schoolOwnerTimetables.map((item) => (
                                            <option
                                                key={item?.id}
                                                value={item?.id}
                                            >
                                                {item?.weekday?.which_days.map((day, index) => (
                                                    <Fragment
                                                        key={day}>{`${getShortWeekdayName(day)}${index !== item?.weekday?.which_days.length - 1 ? ', ' : ' | '}`}</Fragment>
                                                ))}
                                                {item?.workday_start.split(':')[0] + ":" + item?.workday_start.split(':')[1]}
                                                -
                                                {item?.workday_end.split(':')[0] + ":" + item?.workday_end.split(':')[1]}
                                            </option>
                                        ))}
                                    </Select>
                                </div>

                                <div className="two-col">
                                    <Input
                                        type={'number'}
                                        id={'lesson-price'}
                                        label={'Цена занятия *'}
                                        value={lessonPrice}
                                        onChange={handleLessonPrice}
                                    />
                                    <Input
                                        type={'number'}
                                        id={'trial-price'}
                                        label={'Цена пробного занятия *'}
                                        value={trialPrice}
                                        onChange={handleTrialPrice}
                                    />
                                    <Input
                                        type={'number'}
                                        id={'group'}
                                        label={'Количество мест'}
                                        value={group}
                                        onChange={handleGroup}
                                    />
                                    <Input
                                        type={'number'}
                                        id={'group-price'}
                                        label={'Цена группового занятия'}
                                        value={groupPrice}
                                        onChange={handleGroupPrice}
                                    />
                                </div>
                            </>
                        }
                        buttons={
                            <Button type={'submit'} variant={'blue'}>
                                {loading ? 'Редактирование' : 'Редактировать'}
                            </Button>
                        }
                    />
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </>
            )
            }
        </>
    )
}
