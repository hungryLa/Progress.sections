import {Subtitle} from "../../components/UI/Subtitle";
import useSchoolsStore from "../../store/useSchoolsStore";
import {useEffect, useState} from "react";
import {Loader} from "../../components/UI/Loader";
import {Form} from "../../components/UI/Form";
import {Button} from "../../components/UI/Button";
import {Input} from "../../components/UI/Input";
import {Select} from "../../components/UI/Select";
import useSchoolTypesStore from "../../store/useSchoolTypesStore";
import ReactSelect from "react-select";

export const NewSchool = () => {
    const {getSchoolTypes, schoolTypes, loading: typesLoading} = useSchoolTypesStore()
    const {
        addSchool,
        statusError,
        recruitmentError,
        typeError,
        titleError,
        descriptionError,
        phoneError,
        addressError,
        loading
    } = useSchoolsStore()

    const [status, setStatus] = useState('')
    const [recruitment, setRecruitment] = useState('')
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
        console.log(options)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

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

    return (
        <>
            <Subtitle>Создание школы</Subtitle>
            {loading || typesLoading ? <Loader/> : (
                <>
                    <Form
                        onSubmit={handleSubmit}
                        inputs={
                            <div className='two-cols'>
                                <Input
                                    label={'Название'}
                                    value={title}
                                    onChange={handleTitle}
                                    id={'title'}
                                    type={'text'}
                                />
                                <ReactSelect noOptionsMessage={() => 'Нет доступных типов'} closeMenuOnSelect={true} value={types} onChange={handleTypes} isMulti options={options}/>
                            </div>
                        }
                        buttons={
                            <Button type={"submit"} variant={"white"}>
                                {loading ? "Идет создание ..." : "Создать"}
                            </Button>
                        }
                    />
                    {title && title}
                    {status && status}
                    {types && (
                        <ul>
                            {types.map(type => (
                                <li key={type.value}>{type.value} - {type.label}</li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </>
    )
}
