import {Subtitle} from "../../components/UI/Subtitle";
import useTimetablesStore from "../../store/useTimetablesStore";
import {useEffect, useState} from "react";
import {Loader} from "../../components/UI/Loader";
import useAuthStore from "../../store/useAuthStore";
import {Button} from "../../components/UI/Button";
import {Table} from "../../components/UI/Table";
import {TableCell} from "../../components/UI/Table/TableCell";
import {TableRow} from "../../components/UI/Table/TableRow";
import {translateWeekDay} from "../../helpers/translateWeekDay";
import {Title} from "../../components/UI/Title";
import {Modal} from "../../components/UI/Modal";
import {useNavigate} from "react-router-dom";

export const TeacherTimetables = () => {
    const {loading: authLoading, user} = useAuthStore()
    const {loading, error, getTeacherTimetables, teacherTimetables, deleteTeacherTimetable} = useTimetablesStore()

    const navigate = useNavigate()

    const [modalIsActive, setModalIsActive] = useState(false)
    const [timetableToEdit, setTimetableToEdit] = useState({})
    const [timetableToDelete, setTimetableToDelete] = useState({})

    useEffect(() => {
        const fetchTimetables = async () => {
            await getTeacherTimetables(user?.id)
        }
        fetchTimetables()
        console.log(user)
        console.log(teacherTimetables)
    }, [])

    const navigateCreateTimetablesPage = () => {
        navigate(`/teacher/timetables/new`)
    }

    const chooseTimetableToEdit = (timetableId) => {
        navigate(`/teacher/timetables/${timetableId}/update`)
    }

    const chooseTimetableToDelete = (timetable) => {
        setTimetableToDelete(timetable)
        setModalIsActive(true)
    }

    const removeSeconds = (time) => {
        if (time) {
            const timeArray = time.split(':');
            return `${timeArray[0]}:${timeArray[1]}`;
        }
        return '';
    };

    return (
        <>
            <Subtitle>Расписания</Subtitle>

            {loading || authLoading ? <Loader /> : (
                <>
                    <Button variant={'blue'} onClick={() => navigateCreateTimetablesPage()}>Создать расписание</Button>

                    <Table>
                        <TableRow head>
                            <TableCell>Время занятия</TableCell>
                            <TableCell>Начало</TableCell>
                            <TableCell>Конец</TableCell>
                            <TableCell>Дни недели</TableCell>
                            <TableCell>Начало обеда</TableCell>
                            <TableCell>Конец обеда</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>

                        {
                            teacherTimetables && teacherTimetables.length > 0 ? teacherTimetables.map(timetable => (
                                <TableRow key={timetable.id}>
                                    <TableCell>{removeSeconds(timetable.lesson_time)}</TableCell>
                                    <TableCell>{removeSeconds(timetable.workday_start)}</TableCell>
                                    <TableCell>{removeSeconds(timetable.workday_end)}</TableCell>
                                    <TableCell style={{
                                        flexDirection: 'column',
                                        gap: '.8rem'
                                    }}>{timetable.weekday.which_days.map(day => (
                                        <p key={day}>{translateWeekDay(day)}</p>
                                    ))}</TableCell>
                                    <TableCell>{timetable?.without_rest ? '' : removeSeconds(timetable?.rest_start)}</TableCell>
                                    <TableCell>{timetable?.without_rest ? '' : removeSeconds(timetable?.rest_end)}</TableCell>
                                    <TableCell>
                                        <button onClick={() => chooseTimetableToEdit(timetable.id)}>
                                            <svg width={24} height={24} fill={'currentColor'}
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 512 512">
                                                <path
                                                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path>
                                            </svg>
                                        </button>
                                        <button onClick={() => chooseTimetableToDelete(timetable)}>
                                            <svg width={24} height={24} fill={'currentColor'}
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 448 512">
                                                <path
                                                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                            </svg>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow><span style={{width: '100%', textAlign: 'center', padding: '1rem'}}>Расписаний нет</span></TableRow>
                            )

                        }
                    </Table>

                    <Modal isActive={modalIsActive}>
                        <Title>Удаление расписания</Title>
                        <p>Вы действительно хотите удалить расписание?</p>
                        <div className={'modal__buttons'}>
                            <Button variant={'green'} onClick={async () => {
                                await deleteTeacherTimetable(user.id, timetableToDelete.id)
                                setModalIsActive(false)
                            }}>Да</Button>
                            <Button variant={'gray'} onClick={() => {
                                setModalIsActive(false)
                            }}>Отмена</Button>
                        </div>
                    </Modal>
                </>
            )}
        </>
    )
}
