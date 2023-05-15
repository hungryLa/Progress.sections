import {Subtitle} from "../../components/UI/Subtitle";
import useOccupationsStore from "../../store/useOccupationsStore";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Form} from "../../components/UI/Form";
import {Input} from "../../components/UI/Input";
import {Select} from "../../components/UI/Select";
import {Button} from "../../components/UI/Button";
import useSectionsStore from "../../store/useSectionsStore";

export const NewSection = () => {
    const {schoolId} = useParams()
    const {
        loading: occupationLoading,
        occupations,
        getOccupations,
    } = useOccupationsStore()
    const {loading, occupationError, descriptionError, contentsError, addSection} = useSectionsStore()

    const [occupation, setOccupation] = useState({})
    const [description, setDescription] = useState('')
    const [contents, setContents] = useState('')

    useEffect(() => {
        getOccupations()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <>
            <Subtitle>Создание секции</Subtitle>
            <Form
                onSubmit={handleSubmit}
                inputs={
                    <>
                        <div className="two-col">
                            <Select onChange={(e) => setOccupation(e.target.value)} label={'Вид деятельности'}
                                    error={occupationError}>
                                {occupations.map(item => (
                                    <option value={item.id}>{item.title}</option>
                                ))}
                            </Select>
                            <Input label={'Описание'} type={'text'} value={description} error={descriptionError}
                                   onChange={(e) => setDescription(e.target.value)}/>
                            <Input label={'Содержание'} type={'text'} value={contents} error={contentsError}
                                   onChange={(e) => setContents(e.target.value)}/>
                        </div>
                    </>
                }
                buttons={
                    <Button type={"submit"} variant={"white"}>
                        {loading ? "Идет создание ..." : "Создать"}
                    </Button>
                }
            />
            {description}
        </>
    )
}
