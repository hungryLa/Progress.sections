import { useState } from "react"
import useOccupationsStore from "../../store/useOccupationsStore"
import { Subtitle } from "../../components/UI/Subtitle"
import { Form } from "../../components/UI/Form"
import { Input } from "../../components/UI/Input"
import { Button } from "../../components/UI/Button"

export const NewOccupation = () => {
    const addOccupation = useOccupationsStore(({addOccupation}) => addOccupation)
    const loading = useOccupationsStore(({loading}) => loading)
    const titleError = useOccupationsStore(({titleError}) => titleError)

    const [title, setTitle] = useState('')

    const handleSetTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addOccupation(title)
    }

    return (
        <>
            <Subtitle>Новый вид деятельности</Subtitle>
            <Form
                onSubmit={handleSubmit}
                inputs={
                    <Input
                        placeholder={'Название'}
                        value={title}
                        onChange={handleSetTitle}
                        error={titleError}
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
