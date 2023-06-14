import {Subtitle} from "../../components/UI/Subtitle";
import useSchoolTypesStore from "../../store/useSchoolTypesStore";
import {Loader} from "../../components/UI/Loader";
import {useEffect, useState} from "react";
import {Button} from "../../components/UI/Button";
import {useNavigate} from "react-router-dom";
import {Table} from "../../components/UI/Table";
import {TableRow} from "../../components/UI/Table/TableRow";
import {TableCell} from "../../components/UI/Table/TableCell";
import {Title} from "../../components/UI/Title";
import {Modal} from "../../components/UI/Modal";
import { toast } from "react-toastify";

export const SchoolTypes = () => {
    const {loading, error, schoolTypes, getSchoolTypes, deleteSchoolType} = useSchoolTypesStore()
    const navigate = useNavigate()

    const [modalIsActive, setModalIsActive] = useState(false)
    const [schoolTypeToDelete, setSchoolTypeToDelete] = useState({})

    useEffect(() => {
        getSchoolTypes()
    }, [])

    const chooseSchoolTypeToDelete = (schoolType) => {
        setSchoolTypeToDelete(schoolType)
        setModalIsActive(true)
    }

    const chooseSchoolTypeToEdit = (schoolTypeId) => {
        navigate(`/admin/schoolTypes/${schoolTypeId}/edit`)
    }

    const openCreateSchoolTypeHandler = () => {
        navigate('/admin/schoolTypes/new')
    }

    return (
        <>
            <Subtitle>Типы школ</Subtitle>
            {loading ? <Loader/> : (
                <>
                    <Button type={'button'} variant={'blue'} onClick={() => openCreateSchoolTypeHandler()}>Создать тип
                        школы</Button>
                    <Table className={'school-types__table'}>
                        <TableRow head>
                            <TableCell>Название</TableCell>
                            <TableCell>Цвет</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                        {schoolTypes.length > 0 ? schoolTypes.map(schoolType => (
                            <TableRow key={schoolType.id}>
                                <TableCell>{schoolType.title}</TableCell>
                                <TableCell>
                                    <div style={{
                                        backgroundColor: schoolType.color,
                                        width: '100%',
                                        height: '2.4rem',
                                        borderRadius: '.4rem'
                                    }}></div>
                                </TableCell>
                                <TableCell>
                                    <button onClick={() => chooseSchoolTypeToEdit(schoolType.id)}>
                                        <svg width={24} height={24} fill={'currentColor'}
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 512 512">
                                            <path
                                                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path>
                                        </svg>
                                    </button>
                                    <button onClick={() => {
                                        chooseSchoolTypeToDelete(schoolType)
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
                        )) : <TableRow>
                            <TableCell></TableCell>
                            <TableCell>
                                <div style={{textAlign: "center", width: '100%'}}>Нет типов школ</div>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>}
                    </Table>
                </>
            )}

            <Modal isActive={modalIsActive}>
                <Title>Удаление типа школы</Title>
                <p>Вы действительно хотите удалить тип школы {schoolTypeToDelete.title}?</p>
                <div className={'modal__buttons'}>
                    <Button variant={'green'} onClick={async () => {
                        await deleteSchoolType(schoolTypeToDelete.id)
                        toast(`Тип школы "${schoolTypeToDelete.title}" удален`)
                        setModalIsActive(false)
                    }}>Да</Button>
                    <Button variant={'gray'} onClick={() => {
                        setModalIsActive(false)
                    }}>Отмена</Button>
                </div>
            </Modal>
        </>
    )
}
