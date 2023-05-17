import {Subtitle} from "../../components/UI/Subtitle";
import {useNavigate, useParams} from "react-router-dom";
import useOccupationsStore from "../../store/useOccupationsStore";
import useSectionsStore from "../../store/useSectionsStore";
import {useEffect, useState} from "react";
import {Loader} from "../../components/UI/Loader";
import {Select} from "../../components/UI/Select";
import {Input} from "../../components/UI/Input";
import {TextArea} from "../../components/UI/TextArea";
import {Button} from "../../components/UI/Button";
import {Form} from "../../components/UI/Form";
import {Title} from "../../components/UI/Title";
import {Modal} from "../../components/UI/Modal";
import {Checkbox} from "../../components/UI/Checkbox";

export const EditSection = () => {
    const {schoolId, sectionId} = useParams()
    const navigate = useNavigate()
    const {loading: occupationLoading, occupations, getOccupations} = useOccupationsStore()
    const {
        loading,
        occupationError,
        descriptionError,
        contentsError,
        editSection,
        section,
        deleteSection,
        deleteImages,
        addImage
    } = useSectionsStore()

    const [occupation, setOccupation] = useState(1)
    const [description, setDescription] = useState('')
    const [contents, setContents] = useState('')
    const [images, setImages] = useState([])
    const [imagesToDelete, setImagesToDelete] = useState([])

    const [modalIsActive, setModalIsActive] = useState(false)

    useEffect(() => {
        getOccupations()
        setOccupation(section?.occupation.id)
        setDescription(section.description)
        setContents(section.contents)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(imagesToDelete.length > 0) {
            await deleteImages(imagesToDelete)
            await editSection(
                schoolId,
                sectionId,
                occupation,
                description,
                contents,
                images
            ).then(() => navigate(`/schools_owner/schools/${schoolId}/sections/${sectionId}`))
        }
        if(images.length > 0) {
            await addImage(section.id, images)
            await editSection(
                schoolId,
                sectionId,
                occupation,
                description,
                contents,
                images
            ).then(() => navigate(`/schools_owner/schools/${schoolId}/sections/${sectionId}`))
        }
        else {
            await editSection(
                schoolId,
                sectionId,
                occupation,
                description,
                contents,
                images
            ).then(() => navigate(`/schools_owner/schools/${schoolId}/sections/${sectionId}`))
        }
    }

    const handleDelete = async () => {
        await deleteSection(schoolId, sectionId)
        navigate(`/schools_owner/schools/${schoolId}/sections`)
    }

    const handleSelect = (e) => {
        let imageList = [...imagesToDelete]
        if(e.target.checked) {
            imageList = [...imagesToDelete, e.target.value]
        } else {
            imageList.splice(imagesToDelete.indexOf(e.target.value), 1)
        }
        setImagesToDelete(imageList)
    }

    return (
        <>
            <Subtitle>Редактирование секции</Subtitle>
            {loading || occupationLoading ? <Loader/> : (
                <>
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
                                </div>
                                <div className="one-col">
                                    <Input label={'Изображения'} type={'file'} onChange={(e) => {
                                        setImages(e.target.files)
                                    }} multiple/>

                                    {section?.images.length > 0 ? (
                                        <div className="one-col">
                                            <span className="delete-images-title">Выберите изображения для удаления</span>
                                            {section && section.images.map(image => (
                                                <Checkbox key={image.id} image onChange={(e) => handleSelect(e)}
                                                          value={image.id} id={image.id}
                                                          label={<img src={`/storage/${image.path}`} alt={image.path}/>}/>
                                            ))}
                                        </div>
                                    ) : ''}
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
                            <>
                                <Button type={"submit"} variant={"white"}>
                                    {loading ? "Идет редактирование ..." : "Редактировать"}
                                </Button>
                                <Button variant={'orange'} type={'button'} onClick={() => setModalIsActive(true)}>
                                    Удалить секцию
                                </Button>
                            </>
                        }
                    />
                    {String(imagesToDelete)}
                </>
            )}
            <Modal isActive={modalIsActive}>
                <Title>Удаление секции</Title>
                <p>Вы действительно хотите удалить секцию?</p>
                <div className={'modal__buttons'}>
                    <Button variant={'green'} onClick={handleDelete}>Да</Button>
                    <Button variant={'gray'} onClick={() => {
                        setModalIsActive(false)
                    }}>Отмена</Button>
                </div>
            </Modal>
        </>
    )
}
