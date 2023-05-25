import {Subtitle} from "../../components/UI/Subtitle";
import useSectionTimetables from "../../store/useSectionTimetables";
import {Loader} from "../../components/UI/Loader";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "../../components/UI/Button";
import {Table} from "../../components/UI/Table";
import {TableRow} from "../../components/UI/Table/TableRow";
import {TableCell} from "../../components/UI/Table/TableCell";
import {Title} from "../../components/UI/Title";
import {Modal} from "../../components/UI/Modal";
import {toast, ToastContainer} from "react-toastify";

export const SectionTimetables = () => {
    const navigate = useNavigate()
    const {schoolId, sectionId} = useParams()
    const {
        loading,
        sectionTimetables,
        getSectionTimetables,
        deleteSectionTimetable,
    } = useSectionTimetables()

    const [modalIsActive, setModalIsActive] = useState(false)
    const [sectionsTimetableToDelete, setSectionsTimetableToDelete] = useState({})

    useEffect(() => {
        getSectionTimetables(sectionId)
    }, [])

    const chooseSectionsTimetableToDelete = (sectionsTimetable) => {
        setSectionsTimetableToDelete(sectionsTimetable)
        setModalIsActive(true)
    }

    const chooseSectionsTimetableToEdit = (sectionTimetableId) => {
        navigate(`/schools_owner/schools/${schoolId}/sections/${sectionId}/sectionTimetables/${sectionTimetableId}/edit`)
    }

    const handleNewSectionTimetable = () => {
        navigate(`/schools_owner/schools/${schoolId}/sections/${sectionId}/sectionTimetables/new`)
    }

    const handleDeleteSectionsTimetable = async (id) => {
        await deleteSectionTimetable(sectionId, id)
    }

    return (
        <>
            <Subtitle>Расписания</Subtitle>
            {loading ? <Loader/> : (
                <>
                    <Button
                        variant={'blue'}
                        onClick={handleNewSectionTimetable}
                    >Создать расписание секции</Button>
                    <Table>
                        <TableRow head>
                            <TableCell>Цена занятия</TableCell>
                            <TableCell>Цена пробного занятия</TableCell>
                            <TableCell>Кол-во мест</TableCell>
                            <TableCell>Цена группового занятия</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                        {sectionTimetables && sectionTimetables.map(timetable => (
                            <TableRow key={timetable.id}>
                                <TableCell>{timetable.lesson_price}</TableCell>
                                <TableCell>{timetable.trial_price}</TableCell>
                                <TableCell>{timetable.group ? timetable.group : '-'}</TableCell>
                                <TableCell>{timetable.group_price ? timetable.group_price : '-'}</TableCell>
                                <TableCell>
                                    <button onClick={() => chooseSectionsTimetableToEdit(timetable.id)}>
                                        <svg width={24} height={24} fill={'currentColor'}
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 512 512">
                                            <path
                                                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path>
                                        </svg>
                                    </button>
                                    <button onClick={() => {
                                        chooseSectionsTimetableToDelete(timetable)
                                    }}>
                                        <svg width={24} height={24} fill={'currentColor'}
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 448 512">
                                            <path
                                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                        </svg>
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </>
            )}
            <Modal isActive={modalIsActive}>
                <Title>Удаление расписания секции</Title>
                <p>Вы действительно хотите удалить расписание?</p>
                <div className={'modal__buttons'}>
                    <Button variant={'green'} onClick={async () => {
                        await handleDeleteSectionsTimetable(sectionsTimetableToDelete.id)
                        setModalIsActive(false)
                        toast('Удалено')
                    }}>Да</Button>
                    <Button variant={'gray'} onClick={() => {
                        setModalIsActive(false)
                    }}>Отмена</Button>
                </div>
            </Modal>
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
