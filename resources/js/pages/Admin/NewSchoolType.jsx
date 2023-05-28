import {Subtitle} from "../../components/UI/Subtitle";
import useSchoolTypesStore from "../../store/useSchoolTypesStore";
import {useEffect, useState} from "react";
import {Form} from "../../components/UI/Form";
import {Input} from "../../components/UI/Input";
import {Button} from "../../components/UI/Button";
import {useNavigate} from "react-router-dom";
import {validateHEXColor} from "../../helpers/validateHEXColor";
import {Error} from "../../components/Error";
import { toast } from "react-toastify";

export const NewSchoolType = () => {
    const {addSchoolType, loading, titleError, colorError, clearErrors} = useSchoolTypesStore()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [color, setColor] = useState('#000000')
    const [errors, setErrors] = useState([])

    const handleSetTitle = (e) => {
        setErrors([])
        setTitle(e.target.value)
    }
    const handleSetColor = (e) => {
        setErrors([])
        setColor(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
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
            await addSchoolType(title, color)
            navigate('/admin/schoolTypes')
            toast('Тип школы добавлен')
        }
    }

    return (
        <>
            <Subtitle>Новый тип школы</Subtitle>
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
                    <Button type='submit' variant='white'>{loading ? "Идет создание..." : "Создать"}</Button>
                }
            />
        </>
    )
}
