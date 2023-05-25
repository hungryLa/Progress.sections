import {useEffect, useState} from "react"
import useOccupationsStore from "../../store/useOccupationsStore"
import { Subtitle } from "../../components/UI/Subtitle"
import { Form } from "../../components/UI/Form"
import { Input } from "../../components/UI/Input"
import { Button } from "../../components/UI/Button"
import { useNavigate } from "react-router-dom"
import {Error} from "../../components/Error";

export const NewOccupation = () => {
    // const addOccupation = useOccupationsStore(({addOccupation}) => addOccupation)
    // const loading = useOccupationsStore(({loading}) => loading)
    const {loading, error, addOccupation} = useOccupationsStore()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState([])
    const [allowRedirect, setAllowRedirect] = useState(false)

    const handleSetTitle = (e) => {
        setErrors([])
        setTitle(e.target.value)
    }

    useEffect(() => {
        if(!title) {
            setAllowRedirect(false)
        }
    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        setAllowRedirect(false)
        if (!title) {
            setErrors((prev) => [...prev, 'Поле "Название" не должно быть пустым'])
        }
        if(errors.length === 0) {
            setAllowRedirect(true)
        }
        if(allowRedirect && errors?.length === 0) {
            console.log(allowRedirect, errors.length, 'Тут')
            await addOccupation(title)
            navigate('/admin/occupations')
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
