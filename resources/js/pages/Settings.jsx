import 'react-toastify/dist/ReactToastify.css'

import {ToastContainer, toast} from "react-toastify";
import {useEffect, useState} from "react";

import {Button} from "../components/UI/Button";
import {Checkbox} from "../components/UI/Checkbox";
import {Error} from "../components/Error";
import {Form} from "../components/UI/Form";
import {Input} from "../components/UI/Input";
import {Loader} from "../components/UI/Loader";
import ReactSelect from "react-select";
import {Subtitle} from "../components/UI/Subtitle";
import {TextArea} from "../components/UI/TextArea";
import useAuthStore from "../store/useAuthStore";
import useOccupationsStore from "../store/useOccupationsStore";
import useUsersStore from "../store/useUsersStore";
import {validateEmail} from "../helpers/validateEmail";
import {validatePhone} from "../helpers/validatePhone";

export const Settings = () => {
    const {user: authUser, loading: authLoading} = useAuthStore()
    const {
        user,
        loading,
        error,
        getOneUser,
        changeInformation,
        teacherInformation,
        changePassword,
        createOrUpdateTeacherInformation,
        addTeacherImage,
        deleteTeacherImage
    } = useUsersStore();
    const {
        loading: occupationLoading,
        error: occupationError,
        getOccupations,
        occupations: allOccupations
    } = useOccupationsStore()

    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [occupations, setOccupations] = useState([])
    const [image, setImage] = useState({})
    const [imagesToDelete, setImagesToDelete] = useState([])
    const [teachingExperience, setTeachingExperience] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const [occupationsForSelect, setOccupationsForSelect] = useState([])
    const [errors, setErrors] = useState([])
    const [allowToast, setAllowToast] = useState(false)

    const handleFullName = (e) => {
        setErrors([])
        setFullName(e.target.value)
    }
    const handlePhone = (e) => {
        setErrors([])
        setPhone(e.target.value)
    }
    const handleEmail = (e) => {
        setErrors([])
        setEmail(e.target.value)
    }
    const handleOldPassword = (e) => {
        setErrors([])
        setOldPassword(e.target.value)
    }
    const handleNewPassword = (e) => {
        setErrors([])
        setNewPassword(e.target.value)
    }
    const handleOccupations = (occupations) => {
        setErrors([])
        setOccupations(occupations)
    }
    const handleTeachingExperience = (e) => {
        setErrors([])
        setTeachingExperience(e.target.value)
    }
    const handleAboutMe = (e) => {
        setErrors([])
        setAboutMe(e.target.value)
    }
    const handleImage = (e) => {
        setErrors([])
        setImage(e.target.files)
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
    const handleError = (message) => setErrors((prev) => [...prev, message])

    useEffect(() => {
        getOccupations()
        getOneUser(authUser?.id)
    }, [])

    useEffect(() => {
        setOccupationsForSelect(allOccupations.map(item => ({value: item.id, label: item.title})))
        setFullName(user?.full_name)
        setEmail(user?.email)
        setPhone(user?.phone_number)
    }, [user?.full_name, user?.email, user?.phone_number]);

    const isUserDataUnchanged = user?.full_name === fullName && user?.email === email && user?.phone_number === phone
    const isTeacherDataUnchanged =
        teacherInformation?.occupations === occupations
        && teacherInformation?.teaching_experience === teachingExperience
        && teacherInformation?.about_me === aboutMe

    useEffect(() => {
        if (!fullName || !email || !phone) {
            setAllowToast(false)
        }
        if (fullName && email && phone) {
            if (isUserDataUnchanged) {
                setAllowToast(false)
            }
        }
        if (teacherInformation) {
            const teacherOccupations = []
            allOccupations.forEach(occupation => {
                teacherInformation?.occupations?.which_occupations.forEach(item => {
                    if (occupation.title === item) {
                        teacherOccupations.push({value: occupation.id, label: occupation.title})
                    }
                })
            })

            setOccupations(teacherOccupations)
            setAboutMe(teacherInformation?.about_me || '')
            setTeachingExperience(teacherInformation?.teaching_experience || '')
            if (occupations && teachingExperience && aboutMe) {
                if (isTeacherDataUnchanged) {
                    setAllowToast(false)
                }
            }
        }
    }, [fullName, email, phone])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        setAllowToast(false)

        let isValid = true

        if (fullName || email || phone) {
            if(fullName.length < 8) {
                isValid = false
                handleError('Поле "ФИО" не должно быть короче 8 символом')
            }
            if (!validateEmail(email)) {
                isValid = false
                handleError('Почта введена некорректно')
            }
            if (!validatePhone(phone)) {
                isValid = false
                handleError('Номер введен некорректно')
            }
            if (isValid) {
                await changeInformation(user?.id, fullName, phone, email)
                toast('Данные изменены')
            }
        }

        if (oldPassword || newPassword) {
            if (newPassword.length < 8) {
                isValid = false
                handleError('Минимальная длина пароля 8 символов')
            }
            if (isValid) {
                await changePassword(user.id, oldPassword, newPassword)
                toast('Пароль изменен')
            }
        }

        if ((user?.role === 'teacher') && (occupations.length > 0 || teachingExperience || aboutMe)) {
            if (occupations.length === 0) setErrors((prev) => [...prev, 'Нужно выбрать хотя бы один вид деятельности'])
            if (occupations.length > 5) setErrors((prev) => [...prev, 'Видов деятельности не может быть более 5'])
            if (teachingExperience.length < 48) setErrors((prev) => [...prev, 'Поле "Опыт преподавания" должно содержать не менее 48 символов'])
            if (aboutMe.length < 48) setErrors((prev) => [...prev, 'Поле "Обо мне" должно содержать не менее 48 символов'])
            if (errors.length === 0 && !isTeacherDataUnchanged) {
                await createOrUpdateTeacherInformation(
                    user?.id,
                    occupations,
                    teachingExperience,
                    aboutMe
                )
                if (allowToast) toast('Данные о преподавателе изменены')
            }
        }

        if ((user?.role === 'teacher') && (!!image)) {
            await addTeacherImage(user?.id, image)
        }

        if ((user?.role === 'teacher') && (imagesToDelete.length > 0)) {
            await deleteTeacherImage(imagesToDelete)
        }

        await getOneUser(user.id)
    }

    return (
        <>
            <Subtitle>Настройки</Subtitle>
            {errors.length > 0 ? <Error errors={errors}/> : ''}
            {loading || occupationLoading || authLoading ? <Loader/> : (
                <>
                    <Form
                        onSubmit={handleSubmit}
                        inputs={
                            <>
                                <div className="two-col">
                                    <Input
                                        id={'fio'}
                                        label={'ФИО'}
                                        value={fullName}
                                        onChange={handleFullName}
                                    />
                                    <Input
                                        id={'email'}
                                        type={'text'}
                                        label={'Почта'}
                                        value={email}
                                        onChange={handleEmail}
                                    />
                                    <Input
                                        id={'phone'}
                                        label={'Телефон'}
                                        value={phone}
                                        onChange={handlePhone}
                                    />
                                </div>
                                <div className="two-col">
                                    <Input
                                        id={'old-password'}
                                        type={'password'}
                                        label={'Старый пароль'}
                                        value={oldPassword}
                                        onChange={handleOldPassword}
                                    />
                                    <Input
                                        id={'new-password'}
                                        type={'password'}
                                        label={'Новый пароль'}
                                        value={newPassword}
                                        onChange={handleNewPassword}
                                    />
                                </div>
                                {user?.role === 'teacher' ? (
                                    <>
                                        <div className={'two-col'}>
                                            <div className={'input'}>
                                                <label style={{marginBottom: '.8rem'}}>Виды деятельности</label>
                                                <ReactSelect
                                                    noOptionsMessage={() => 'Нет доступных видов деятельности'}
                                                    placeholder={''}
                                                    closeMenuOnSelect={true}
                                                    value={occupations}
                                                    onChange={handleOccupations}
                                                    isMulti
                                                    options={occupationsForSelect}
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
                                                        dropdownIndicator: (styles) => ({
                                                            ...styles,
                                                            color: 'var(--blue)'
                                                        }),
                                                        indicatorSeparator: (styles) => ({
                                                            ...styles,
                                                            backgroundColor: 'var(--blue)'
                                                        }),
                                                    }}
                                                />
                                            </div>
                                            <Input
                                                label={'Изображение'}
                                                type={'file'}
                                                onChange={handleImage}
                                            />
                                        </div>
                                        <div className="one-col">
                                            <span
                                                className="delete-images-title"
                                            >
                                                Выберите изображение для удаления
                                            </span>
                                            {user && user?.images.map(image => (
                                                <Checkbox
                                                    key={image.id}
                                                    image
                                                    onChange={(e) => handleSelect(e)}
                                                    value={image.id}
                                                    id={image.id}
                                                    isChecked={imagesToDelete?.some(item => item == image.id)}
                                                    label={<img src={`/storage/${image.path}`} alt={image.path}/>}
                                                />
                                            ))}
                                        </div>
                                        <div className="one-col">
                                            <TextArea
                                                id={'experience'}
                                                label={'Опыт преподавания'}
                                                value={teachingExperience}
                                                onChange={handleTeachingExperience}
                                            />
                                            <TextArea
                                                id={'about'}
                                                label={'Обо мне'}
                                                value={aboutMe}
                                                onChange={handleAboutMe}
                                            />
                                        </div>
                                    </>
                                ) : ''}
                            </>
                        }
                        buttons={
                            <>
                                <Button type={"submit"} variant={"white"}>
                                    {loading ? "Идет изменение ..." : "Изменить"}
                                </Button>
                            </>
                        }
                    />
                </>
            )}
        </>
    );
};
