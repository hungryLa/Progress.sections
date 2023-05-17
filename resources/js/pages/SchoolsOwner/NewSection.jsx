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
        getOccupations
    } = useOccupationsStore()
    const {loading, occupationError, descriptionError, contentsError, addSection, addImages} = useSectionsStore()

    const [occupation, setOccupation] = useState(1)
    const [description, setDescription] = useState('')
    const [contents, setContents] = useState('')
    const [images, setImages] = useState([])
    const [errors, setErrors] = useState({
        description: '',
        contents: ''
    })

    useEffect(() => {
        getOccupations()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errorMessages = {}

        if(!description) {
            errorMessages.description = 'Поле описание не должно быть пустым'
        }
        if(!contents) {
            errorMessages.contents = 'Поле содержание не должно быть пустым'
        }

        setErrors(errorMessages)

        if(contents !== '' && description !== '')
            await addSection(
            schoolId,
            occupation,
            description,
            contents,
            images
        ).then(() => navigate(`/schools_owner/schools/${schoolId}/sections`))
    }

    const handleDescription = (e) => {
        setErrors({...errors, description: ''})
        setDescription(e.target.value)
    }

    const handleContents = (e) => {
        setErrors({...errors, contents: ''})
        setContents(e.target.value)
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
                                    error={errors.description}
                                    onChange={handleDescription}
                                />
                                <Input label={'Изображения'} type={'file'} onChange={(e) => {
                                    setImages(e.target.files)
                                }} multiple/>
                            </div>
                            <div className="one-col">
                                <TextArea
                                    label={'Содержание'}
                                    value={contents}
                                    error={errors.contents}
                                    onChange={handleContents}
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
