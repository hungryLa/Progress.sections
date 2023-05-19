import {useNavigate, useParams} from "react-router-dom";
import {Subtitle} from "../../components/UI/Subtitle";
import {Form} from "../../components/UI/Form";
import {Button} from "../../components/UI/Button";
import {Input} from "../../components/UI/Input";
import {Select} from "../../components/UI/Select";
import {useState} from "react";
import useTimetablesStore from "../../store/useTimetablesStore";
import {Checkbox} from "../../components/UI/Checkbox";
import {Error} from "../../components/Error";

export const NewSchoolsTimetable = () => {
    const navigate = useNavigate()
    const {schoolId} = useParams()
    const {loading, createSchoolTimeTable, error} = useTimetablesStore()
    const [weekdays, setWeekdays] = useState([])
    const [lessonTime, setLessonTime] = useState('')
    const [workdayStart, setWorkdayStart] = useState('')
    const [workdayEnd, setWorkdayEnd] = useState('')
    const [withRest, setWithRest] = useState(false)
    const [restStart, setRestStart] = useState('')
    const [restEnd, setRestEnd] = useState('')
    const [errors, setErrors] = useState([])

    const handleWeekday = (e) => {
        let weekList = [...weekdays]
        if(e.target.checked) {
            weekList = [...weekdays, e.target.value]
        } else {
            weekList.splice(weekdays.indexOf(e.target.value), 1)
        }
        setWeekdays(weekList)
    }

    const handleRest = (e) => {
        if(e.target.checked) {
            setWithRest(e.target.value)
        } else {
            setWithRest(false)
        }
    }

    const handleAddError = (value) => {
        setErrors(prev => [...prev, value])
        console.log('errors', errors)
    }

    const handleSubmit = async (e) => {
        setErrors(null)
        console.log(schoolId)
        e.preventDefault()
        await createSchoolTimeTable(
            schoolId,
            weekdays,
            lessonTime,
            workdayStart,
            workdayEnd,
            withRest,
            restStart,
            restEnd
        )
        console.log('weekdays', weekdays)
        if(!weekdays) handleAddError('Дни недели обязательны для заполнения')
        if(!lessonTime) handleAddError('Время занятия обязательно для заполнения')
        if(!workdayStart) handleAddError('Время начала занятия обязательно для заполнения')
        if(!workdayEnd) handleAddError('Время конца занятия обязательно для заполнения')
        if(!withRest) handleAddError('Наличие перерыва обязательно для заполнения')
        if (errors.length < 1 ) navigate(`/schools_owner/schools/${schoolId}/timetables`)
    }

    return (
        <>
            <Subtitle>Новое расписание</Subtitle>
            {errors ? <Error errors={errors} /> : ''}
            <Form
                onSubmit={handleSubmit}
                inputs={
                    <>
                        <Subtitle className={'subtitle-mini'}>Дни недели</Subtitle>
                        <div className={'three-col'}>
                            <Checkbox id={'Monday'} value={'Monday'} name={'weekday[]'} label={'Понедельник'} onChange={handleWeekday} />
                            <Checkbox id={'Tuesday'} value={'Tuesday'} name={'weekday[]'} label={'Вторник'} onChange={handleWeekday} />
                            <Checkbox id={'Wednesday'} value={'Wednesday'} name={'weekday[]'} label={'Среда'} onChange={handleWeekday} />
                            <Checkbox id={'Thursday'} value={'Thursday'} name={'weekday[]'} label={'Четверг'} onChange={handleWeekday} />
                            <Checkbox id={'Friday'} value={'Friday'} name={'weekday[]'} label={'Пятница'} onChange={handleWeekday} />
                            <Checkbox id={'Saturday'} value={'Saturday'} name={'weekday[]'} label={'Суббота'} onChange={handleWeekday} />
                            <Checkbox id={'Sunday'} value={'Sunday'} name={'weekday[]'} label={'Воскресенье'} onChange={handleWeekday} />
                        </div>
                        <div className="two-col">
                            <Input type={'time'} label={'Длительность занятия'} value={lessonTime} onChange={(e) => setLessonTime(e.target.value)} />
                        </div>
                        <div className={'two-col'}>
                            <Input type={'time'} label={'Время начала'} value={workdayStart} onChange={(e) => setWorkdayStart(e.target.value)} />
                            <Input type={'time'}  label={'Время конца'}  value={workdayEnd} onChange={(e) => setWorkdayEnd(e.target.value)} />
                        </div>
                        <div className={'three-col'}>
                            <Checkbox id={'rest'} value={true} name={'rest'} label={'Без обеда'} onChange={handleRest} />
                        </div>
                        {!withRest && (
                            <div className={'two-col'}>
                                <Input type={'time'} label={'Начало обеда'} value={restStart} onChange={(e) => setRestStart(e.target.value)} />
                                <Input type={'time'}  label={'Конец обеда'}  value={restEnd} onChange={(e) => setRestEnd(e.target.value)} />
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
    )
}
