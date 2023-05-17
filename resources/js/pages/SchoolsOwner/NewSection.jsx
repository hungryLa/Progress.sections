import {Subtitle} from "../../components/UI/Subtitle";
import useOccupationsStore from "../../store/useOccupationsStore";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Form} from "../../components/UI/Form";
import {Input} from "../../components/UI/Input";
import {Select} from "../../components/UI/Select";
import {Button} from "../../components/UI/Button";
import useSectionsStore from "../../store/useSectionsStore";
import {TextArea} from "../../components/UI/TextArea";
import {Loader} from "../../components/UI/Loader";

export const NewSection = () => {
    const {schoolId} = useParams()
    const navigate = useNavigate()
    const {
        loading: occupationLoading,
        occupations,
        getOccupations,
    } = useOccupationsStore()
    const {loading, occupationError, descriptionError, contentsError, addSection, addImages} = useSectionsStore()

    const [occupation, setOccupation] = useState(1)
    const [description, setDescription] = useState('')
    const [contents, setContents] = useState('')
    const [images, setImages] = useState([])

    useEffect(() => {
        getOccupations()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addSection(
            schoolId,
            occupation,
            description,
            contents,
            images
        ).then(res => console.log(res)).then(() => navigate(`/schools_owner/schools/${schoolId}/sections`))
    }


    return (
        <>
            <Subtitle>Создание секции</Subtitle>
            {occupationLoading || loading ? <Loader/> : (
                <Form
                    onSubmit={handleSubmit}
                    inputs={
                        <>
                            <div className="two-col">
                                <Select
                                    onChange={(e) => {
                                        setOccupation(e.target.value)
                                    }}
                                    label={'Вид деятельности'}
                                    error={occupationError}
                                >
                                    {occupations.map(item => (
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    ))}
                                </Select>
                                <Input
                                    label={'Описание'}
                                    type={'text'}
                                    value={description}
                                    error={descriptionError}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Input label={'Изображения'} type={'file'} onChange={(e) => {
                                    setImages(e.target.files)
                                }} multiple/>
                            </div>
                            <div className="one-col">
                                <TextArea
                                    label={'Содержание'}
                                    value={contents}
                                    error={contentsError}
                                    onChange={(e) => setContents(e.target.value)}
                                ></TextArea>
                            </div>
                        </>
                    }
                    buttons={
                        <Button type={"submit"} variant={"white"}>
                            {loading ? "Идет создание ..." : "Создать"}
                        </Button>
                    }
                />
            )}
        </>
    )
}
