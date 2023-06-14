import {useEffect, useState} from "react"
import useOccupationsStore from "../../store/useOccupationsStore"
import { Subtitle } from "../../components/UI/Subtitle"
import { Form } from "../../components/UI/Form"
import { Input } from "../../components/UI/Input"
import { Button } from "../../components/UI/Button"
import { useNavigate } from "react-router-dom"
import {Error} from "../../components/Error";
import { toast } from "react-toastify"

export const NewOccupation = () => {
    const {loading, addOccupation} = useOccupationsStore()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState([])

    const handleSetTitle = (e) => {
        setErrors([])
        setTitle(e.target.value)
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

        if(isValid) {
            await addOccupation(title)
            navigate('/admin/occupations')
            toast('Вид деятельности добавлен')
        }
    }

    return (
        <>
            <Subtitle>Новый вид деятельности</Subtitle>
            {errors.length > 0 ? <Error errors={errors} /> : '' }
            <Form
                onSubmit={handleSubmit}
                inputs={
                    <Input
                        placeholder={'Название'}
                        value={title}
                        onChange={handleSetTitle}
                        bordered
                        id={'title'}
                    />
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
