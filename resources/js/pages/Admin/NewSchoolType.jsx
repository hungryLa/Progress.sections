import {Subtitle} from "../../components/UI/Subtitle";
import useSchoolTypesStore from "../../store/useSchoolTypesStore";
import {useState} from "react";
import {Form} from "../../components/UI/Form";
import {Input} from "../../components/UI/Input";
import {Button} from "../../components/UI/Button";
import {useNavigate} from "react-router-dom";

export const NewSchoolType = () => {
    const {addSchoolType, loading, titleError, colorError, clearErrors} = useSchoolTypesStore()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [color, setColor] = useState('#000000')

    const handleSetTitle = (e) => {
        clearErrors()
        setTitle(e.target.value)
    }
    const handleSetColor = (e) => {
        clearErrors()
        setColor(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addSchoolType(title, color)
        if (!titleError && !colorError) navigate('/admin/schoolTypes')
    }

    return (
        <>
            <Subtitle>Новый тип школы</Subtitle>
            <Form
                onSubmit={handleSubmit}
                inputs={
                    <>
                        <div className="two-col">
                            <Input
                                label='Название'
                                value={title}
                                onChange={handleSetTitle}
                                error={titleError}
                                bordered
                                id='title'
                            />
                            <Input
                                type={'color'}
                                label='Цвет'
                                value={color}
                                onChange={handleSetColor}
                                error={colorError}
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
