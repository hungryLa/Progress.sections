import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { Error } from "../../components/Error";
import { Button } from "../../components/UI/Button";
import { Form } from "../../components/UI/Form";
import { Input } from "../../components/UI/Input";
import { Loader } from "../../components/UI/Loader";
import { Select } from "../../components/UI/Select";
import { Subtitle } from "../../components/UI/Subtitle";
import { TextArea } from "../../components/UI/TextArea";
import { validatePhone } from '../../helpers/validatePhone';
import useSchoolTypesStore from "../../store/useSchoolTypesStore";
import useSchoolsStore from "../../store/useSchoolsStore";

export const NewSchool = () => {
    const {getSchoolTypes, schoolTypes, loading: typesLoading} = useSchoolTypesStore()
    const navigate = useNavigate()
    const {
        addSchool,
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
    const [errors, setErrors] = useState([])

    useEffect(() => {
        getSchoolTypes()
        setOptions(schoolTypes.map(item => ({value: item.id, label: item.title})))
    }, [getSchoolTypes])

    const handleErrors = (value) => {
        setErrors(prev => [...prev, value])
    }

    const handleTitle = (e) => {
        setErrors([])
        setTitle(e.target.value)
    }
    const handleDescription = (e) => {
        setErrors([])
        setDescription(e.target.value)
    }
    const handleTypes = (types) => {
        setErrors([])
        setTypes(types)
    }
    const handleStatus = (e) => {
        setErrors([])
        setStatus(e.target.value)
    }
    const handleImages = (e) => {
        setErrors([])
        setImages([...e.target.files])
    }
    const handleRecruitment = (e) => {
        setErrors([])
        setRecruitment(e.target.value)
    }
    const handleAddress = (e) => {
        setErrors([])
        setAddress(e.target.value)
    }
    const handlePhone = (e) => {
        setErrors([])
        setPhone(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const typesToSend = types.map(type => type.value)

        let isValid = true

        if(!title) {
            handleErrors('Поле "Название" обязательно для заполнения')
            isValid = false
        }

        if(title.length < 8) {
            handleErrors('Поле "Название" должно содержать не менее 8 символов')
            isValid = false
        }

        if(typesToSend.length === 0) {
            handleErrors('Поле "Тип школы" обязательно для заполнения')
            isValid = false
        }

        if(!address) {
            handleErrors('Поле "Адрес" обязательно для заполнения')
            isValid = false
        }

        if(address.length < 12) {
            handleErrors('Поле "Адрес" должно содержать не менее 12 символов')
            isValid = false
        }

        if(!phone) {
            handleErrors('Поле "Номер телефона" обязательно для заполнения')
            isValid = false
        }

        if(!validatePhone(phone)) {
            handleErrors('Поле "Номер телефона" имеет некрректное значение')
            isValid = false
        }

        if(!description) {
            handleErrors('Поле "Описание" обязательно для заполнения')
            isValid = false
        }

        if(description.length < 48 || description.length > 255) {
            handleErrors('Поле "Описание" должно содержать не менее 48 символов и не более 255 символов')
            isValid = false
        }

        if(isValid) {
            await addSchool(status, recruitment, title, description, phone, address, images, typesToSend)
            toast('Школа создана')
            navigate('/schools_owner/schools')
        }
    }

    return (
        <>
            <Subtitle>Создание школы</Subtitle>
            {loading || typesLoading ? <Loader/> : (
                <>
                    {errors?.length > 0 ? <Error errors={errors}/> : ''}
                    <Form
                        onSubmit={handleSubmit}
                        inputs={
                            <>
                                <div className='two-col'>
                                    <Input
                                        label={'Название'}
                                        value={title && title}
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
