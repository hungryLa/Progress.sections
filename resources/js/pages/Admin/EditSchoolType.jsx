import useSchoolTypesStore from "../../store/useSchoolTypesStore";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Loader} from "../../components/UI/Loader";
import {Subtitle} from "../../components/UI/Subtitle";
import {Form} from "../../components/UI/Form";
import {Input} from "../../components/UI/Input";
import {Button} from "../../components/UI/Button";
import {Title} from "../../components/UI/Title";
import {Modal} from "../../components/UI/Modal";
import {Error} from "../../components/Error";
import {validateHEXColor} from "../../helpers/validateHEXColor";
import { toast } from "react-toastify";

export const EditSchoolType = () => {
    const {schoolTypeId} = useParams()
    const navigate = useNavigate()

    const {
        getOneSchoolType,
        editSchoolType,
        deleteSchoolType,
        schoolType,
        loading,
        clearErrors
    } = useSchoolTypesStore()

    const [title, setTitle] = useState('')
    const [color, setColor] = useState('#000000')
    const [errors, setErrors] = useState([])
    const [modalIsActive, setModalIsActive] = useState(false)

    useEffect(() => {
        getOneSchoolType(schoolTypeId)
        setTitle(schoolType.title)
        setColor(schoolType.color)
    }, [schoolType.title, schoolType.color])

    const handleSetTitle = (e) => {
        setErrors([])
        setTitle(e.target.value)
        clearErrors()
    }
    const handleSetColor = (e) => {
        setErrors([])
        setColor(e.target.value)
        clearErrors()
    }

    const handleSubmit = async (e) => {
        setErrors([])
        e.preventDefault()

        let isValid = true

        if (!title) {
            setErrors((prev) => [...prev, 'Поле "Название" не должно быть пустым'])
            isValid = false
        }

        if (title.length < 4) {
            setErrors((prev) => [...prev, 'Поле "Название" должно состоять хотя бы из 4 символов'])
            isValid = false
        }

        if (!validateHEXColor(color)) {
            setErrors((prev) => [...prev, 'Введен некорректный цвет'])
            isValid = false
        }

        if (isValid) {
            await editSchoolType(schoolType.id, title, color)
            navigate('/admin/schoolTypes')
            toast('Тип школы изменен')
        }
    }

    const handleDelete = async () => {
        await deleteSchoolType(schoolTypeId)
        setModalIsActive(false)
        navigate('/admin/schoolTypes')
        toast('Тип школы изменен')
    }

    return (
        <>
            {loading ? <Loader/> : (
                <>
                    <Subtitle>Редактирование типа школы</Subtitle>
                    {errors.length > 0 ? <Error errors={errors}/> : ''}
                    <Form
                        onSubmit={handleSubmit}
                        inputs={
                            <>
                                <div className="two-col">
                                    <Input
                                        label='Название'
                                        value={title}
                                        onChange={handleSetTitle}
                                        bordered
                                        id='title'
                                    />
                                    <Input
                                        type={'color'}
                                        label='Цвет'
                                        value={color}
                                        onChange={handleSetColor}
                                        bordered
                                        id='color'
                                    />
                                </div>
                            </>
                        }
                        buttons={
                            <>
                                <Button type='submit'
                                        variant='white'>{loading ? "Идет редактирование..." : "Редактировать"}</Button>
                                <Button
                                    variant={"orange"}
                                    type={"button"}
                                    onClick={() => setModalIsActive(true)}
                                >
                                    Удалить тип школы
                                </Button>
                            </>
                        }
                    />
                </>
            )}

            <Modal isActive={modalIsActive}>
                <Title>Удаление типа школы</Title>
                <p>Вы действительно хотите удалить тип "{schoolType.title}"?</p>
                <div className={"modal__buttons"}>
                    <Button variant={"green"} onClick={handleDelete}>
                        Да
                    </Button>
                    <Button
                        variant={"gray"}
                        onClick={() => {
                            setModalIsActive(false);
                        }}
                    >
                        Отмена
                    </Button>
                </div>
            </Modal>
        </>
    )
}
