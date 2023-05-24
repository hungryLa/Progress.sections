import {useEffect, useState} from "react";
import {Subtitle} from "../components/UI/Subtitle";
import useAuthStore from "../store/useAuthStore";
import useUsersStore from "../store/useUsersStore";
import {Loader} from "../components/UI/Loader";
import {Form} from "../components/UI/Form";
import {Input} from "../components/UI/Input";
import useOccupationsStore from "../store/useOccupationsStore";
import {Button} from "../components/UI/Button";
import ReactSelect from "react-select";
import {TextArea} from "../components/UI/TextArea";
import {validateEmail} from "../helpers/validateEmail";
import {Error} from "../components/Error";
import {validatePhone} from "../helpers/validatePhone";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

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
        createOrUpdateTeacherInformation
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
    const [teachingExperience, setTeachingExperience] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const [occupationsForSelect, setOccupationsForSelect] = useState([])
    const [errors, setErrors] = useState([])

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
        console.log(teacherInformation)
    }, [user?.full_name, user?.email, user?.phone_number]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        // CHANGE USER DATA
        if (fullName || email || phone) {
            if (!validateEmail(email)) {
                handleError('Почта введена некорректно')
            }
            if (!validatePhone(phone)) {
                setErrors((prev) => [...prev, 'Номер введен некорректно'])
            }
            if (errors.length === 0) await changeInformation(user?.id, fullName, phone, email).then(() => {
                toast('Данные изменены');
            })
        }

        // CHANGE PASSWORDS
        if (oldPassword || newPassword) {
            if (newPassword.length < 8) setErrors((prev) => [...prev, 'Минимальная длина пароля 8 символов'])
            if (errors.length === 0) await changePassword(user.id, oldPassword, newPassword).then(() => {
                toast('Пароль изменен');
            })
        }

        if ((user?.role === 'teacher') && (occupations || teachingExperience || aboutMe)) {
            console.log(occupations)
            if (occupations.length === 0) setErrors((prev) => [...prev, 'Нужно выбрать хотя бы один вид деятельности'])
            if (occupations.length > 5) setErrors((prev) => [...prev, 'Видов деятельности не может быть более 5'])
            if (teachingExperience.length < 48) setErrors((prev) => [...prev, 'Поле "Опыт преподавания" должно содержать не менее 48 символов'])
            if (aboutMe.length < 48) setErrors((prev) => [...prev, 'Поле "Обо мне" должно содержать не менее 48 символов'])
            if (errors.length === 0) {
                await createOrUpdateTeacherInformation(
                    user.id,
                    occupations.map(item => item.label),
                    teachingExperience,
                    aboutMe
                ).then(() => toast('Информация о преподавателе изменена'))
            }
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
                                        type={'email'}
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
            <ToastContainer position="top-center"
                            autoClose={5000}
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"/>
        </>
    );
};
