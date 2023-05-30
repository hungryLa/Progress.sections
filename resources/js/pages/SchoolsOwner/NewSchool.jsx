import {useEffect, useState} from "react";

import {Button} from "../../components/UI/Button";
import {Error} from "../../components/Error";
import {Form} from "../../components/UI/Form";
import {Input} from "../../components/UI/Input";
import {Loader} from "../../components/UI/Loader";
import ReactSelect from "react-select";
import {Select} from "../../components/UI/Select";
import {Subtitle} from "../../components/UI/Subtitle";
import {TextArea} from "../../components/UI/TextArea";
import {useNavigate} from "react-router-dom";
import useSchoolTypesStore from "../../store/useSchoolTypesStore";
import useSchoolsStore from "../../store/useSchoolsStore";

export const NewSchool = () => {
    const {getSchoolTypes, schoolTypes, loading: typesLoading} = useSchoolTypesStore()
    const navigate = useNavigate()
    const {
        addSchool,
        error,
        titleError,
        descriptionError,
        phoneError,
        addressError,
        imagesError,
        loading
    } = useSchoolsStore()

    const [status, setStatus] = useState('active')
    const [recruitment, setRecruitment] = useState('TRUE')
    const [types, setTypes] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [images, setImages] = useState([])
    const [options, setOptions] = useState([])

    useEffect(() => {
        getSchoolTypes()
        setOptions(schoolTypes.map(item => ({value: item.id, label: item.title})))
    }, [getSchoolTypes])

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
        setImages([...e.target.files])
        console.log('images', images)
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
        await addSchool(status, recruitment, title, description, phone, address, images, typesToSend)
        if (error?.length === 0) navigate('/schools_owner/schools')
    }

    return (
        <>
            <Subtitle>Создание школы</Subtitle>
            {loading || typesLoading ? <Loader/> : (
                <>
                    {error?.length > 0 && <Error errors={error}/>}
                    <Form
                        onSubmit={handleSubmit}
                        inputs={
                            <>
                                <div className='two-col'>
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
                                            isMulti options={options}
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
                                    <Select label={'Статус'} onChange={handleStatus}>
                                        <option value="active">Активна</option>
                                        <option value="not active">Не активна</option>
                                    </Select>
                                    <Select label={'Набор учеников'} onChange={handleRecruitment}>
                                        <option value="TRUE">Открыт</option>
                                        <option value="FALSE">Закрыт</option>
                                    </Select>
                                    <Input label={'Адрес'} value={address} onChange={handleAddress}/>
                                    <Input label={'Телефон'} value={phone} onChange={handlePhone}/>
                                </div>
                                <div className="one-col">
                                    <Input id={'files'} name={'files'} label={'Изображения'} type={'file'} onChange={handleImages} multiple/>
                                    <TextArea
                                        label={'Описание'}
                                        value={description}
                                        onChange={handleDescription}
                                    />
                                </div>
                            </>
                        }
                        buttons={
                            <Button type={"submit"} variant={"white"}>
                                {loading ? "Идет создание ..." : "Создать"}
                            </Button>
                        }
                    />
                </>
            )}
        </>
    )
}
