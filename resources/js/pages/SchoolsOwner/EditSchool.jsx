import {Subtitle} from "../../components/UI/Subtitle";
import useSchoolsStore from "../../store/useSchoolsStore";
import {useEffect, useState} from "react";
import useSchoolTypesStore from "../../store/useSchoolTypesStore";
import {Loader} from "../../components/UI/Loader";
import {Error} from "../../components/Error";
import {Form} from "../../components/UI/Form";
import {Button} from "../../components/UI/Button";
import {Input} from "../../components/UI/Input";
import ReactSelect from "react-select";
import {Select} from "../../components/UI/Select";
import {TextArea} from "../../components/UI/TextArea";
import {useNavigate, useParams} from "react-router-dom";

export const EditSchool = () => {
    const {schoolId} = useParams()
    const navigate = useNavigate()
    const {getSchoolTypes, schoolTypes, loading: typesLoading} = useSchoolTypesStore()
    const {loading, error, school, getOneSchool, editSchool, deleteSchool, deleteImages, addImages} = useSchoolsStore()

    const [status, setStatus] = useState('active')
    const [recruitment, setRecruitment] = useState("TRUE")
    const [types, setTypes] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [images, setImages] = useState([])
    const [options, setOptions] = useState([])
    const [imagesToDelete, setImagesToDelete] = useState([])


    const [modalIsActive, setModalIsActive] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            await getSchoolTypes();
            await getOneSchool(schoolId);

            setStatus(school?.status);
            setRecruitment(school?.recruitment_open === true ? "TRUE" : "FALSE");
            setTitle(school?.title);
            setDescription(school?.description);
            setPhone(school?.phone_number);
            setAddress(school?.address);

            setTypes(school?.school_types?.map(item => ({value: item.id, label: item?.title})));
        };

        fetchData();
    }, [])

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleTypes = (types) => {
        setTypes(types)
    }
    const handleStatus = (e) => {
        setStatus(e.target.value)
    }
    const handleImages = (e) => {
        setImages(e.target.files)
    }
    const handleRecruitment = (e) => {
        setRecruitment(e.target.value)
    }
    const handleAddress = (e) => {
        setAddress(e.target.value)
    }
    const handlePhone = (e) => {
        setPhone(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const typesToSend = types.map(type => type.value)
        if (imagesToDelete.length > 0) {
            await deleteImages(schoolId, imagesToDelete)
            await editSchool()
        }
        if (images?.length > 0) {
            await addImages(school.id, images)
            await editSchool()
        } else {
            await editSchool(schoolId, status, recruitment, title, description, address, phone, types)
        }

        if (!error) navigate(`/schools_owner/schools/${schoolId}`)
    }

    return (
        <>
            <Subtitle>Редактирование школы</Subtitle>
            {loading || typesLoading ? <Loader/> : (
                <>
                    {(error && Array.isArray(error)) && <Error errors={error}/>}
                    <Form
                        onSubmit={handleSubmit}
                        inputs={
                            <>
                                <div className="two-col">
                                    <Input
                                        label={'Название'}
                                        value={title}
                                        onChange={handleTitle}
                                        id={'title'}
                                        type={'text'}
                                    />
                                    <div className={'input'}>
                                        <label style={{marginBottom: '.8rem'}}>Тип школы</label>
                                        <ReactSelect
                                            noOptionsMessage={() => 'Нет доступных типов'}
                                            placeholder={''}
                                            closeMenuOnSelect={true}
                                            value={types}
                                            onChange={handleTypes}
                                            isMulti
                                            options={schoolTypes && schoolTypes.map(item => ({
                                                value: item.id,
                                                label: item?.title
                                            }))}
                                            styles={{
                                                control: (styles, {isFocused}) => (
                                                    {
                                                        ...styles,
                                                        background: 'var(--white)',
                                                        width: '100%',
                                                        padding: '.5rem 2rem .5rem 3rem',
                                                        minHeight: 50,
                                                        borderRadius: '1rem',
                                                        color: 'var(--blue)',
                                                        border: 0,
                                                        ':hover': {
                                                            ...styles[':hover'],
                                                            boxShadow: isFocused ? '0 0 0 1px var(--orange) !important' : '',
                                                            borderColor: isFocused ? 'var(--orange) !important' : '',
                                                            outlineColor: isFocused ? 'var(--orange) !important' : ''
                                                        },
                                                        ':focus': {
                                                            ...styles[':focus'],
                                                            boxShadow: isFocused ? ' inset 0px 0px 10px rgba(255, 121, 121, 0.25)' : ''
                                                        },
                                                        ':active': {
                                                            ...styles[':active'],
                                                            boxShadow: isFocused ? '0 0 0 1px var(--orange) !important' : ''
                                                        }
                                                    }
                                                ),
                                                input: (styles) => ({...styles,}),
                                                dropdownIndicator: (styles) => ({...styles, color: 'var(--blue)'}),
                                                indicatorSeparator: (styles) => ({
                                                    ...styles,
                                                    backgroundColor: 'var(--blue)'
                                                }),
                                            }}
                                        />
                                    </div>
                                    <Select label={'Статус'} value={status} onChange={handleStatus}>
                                        <option value="active">Активна</option>
                                        <option value="not active">Не активна</option>
                                    </Select>
                                    <Select label={'Набор учеников'} value={recruitment} onChange={handleRecruitment}>
                                        <option value={"TRUE"}>Открыт</option>
                                        <option value={"FALSE"}>Закрыт</option>
                                    </Select>
                                    <Input label={'Адрес'} value={address} onChange={handleAddress}/>
                                    <Input label={'Телефон'} value={phone} onChange={handlePhone}/>
                                </div>
                                <div className="one-col">
                                    <Input label={'Изображения'} type={'file'} onChange={handleImages} multiple/>
                                    <TextArea label={'Описание'} value={description || ''}
                                              onChange={handleDescription}/>
                                </div>
                            </>
                        }
                        buttons={
                            <Button type={"submit"} variant={"white"}>
                                {loading ? "Идет редактирование ..." : "Редактировать"}
                            </Button>

                        }
                    />
                </>
            )}
        </>
    )
}