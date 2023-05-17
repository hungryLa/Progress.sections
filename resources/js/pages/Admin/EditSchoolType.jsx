import useSchoolTypesStore from "../../store/useSchoolTypesStore";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Loader} from "../../components/UI/Loader";
import {Subtitle} from "../../components/UI/Subtitle";
import {Form} from "../../components/UI/Form";
import {Input} from "../../components/UI/Input";
import {Button} from "../../components/UI/Button";

export const EditSchoolType = () => {
    const {schoolTypeId} = useParams()
    const navigate = useNavigate()

    const {
        getOneSchoolType,
        editSchoolType,
        schoolType,
        loading,
        titleError,
        colorError,
        clearErrors
    } = useSchoolTypesStore()

    const [title, setTitle] = useState('')
    const [color, setColor] = useState('#000000')

    useEffect(() => {
        getOneSchoolType(schoolTypeId)
        setTitle(schoolType.title)
        setColor(schoolType.color)
    }, [])

    const handleSetTitle = (e) => {
        setTitle(e.target.value)
        clearErrors()
    }
    const handleSetColor = (e) => {
        setColor(e.target.value)
        clearErrors()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await editSchoolType(schoolType.id, title, color)
        if (!titleError && !colorError) navigate('/admin/schoolTypes')
    }

    return (
        <>
            {loading ? <Loader/> : (
                <>
                    <Subtitle>Редактирование типа школы</Subtitle>
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
                            <Button type='submit' variant='white'>{loading ? "Идет редактирование..." : "Редактировать"}</Button>
                        }
                    />
                </>
            )}
        </>
    )
}
