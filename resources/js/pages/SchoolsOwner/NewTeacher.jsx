import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../components/UI/Button";
import { Error } from "../../components/Error";
import { Form } from "../../components/UI/Form";
import { Input } from "../../components/UI/Input";
import { Subtitle } from "../../components/UI/Subtitle";
import { toast } from 'react-toastify';
import { useState } from "react";
import useTeachersStore from "../../store/useTeachersStore";
import { validateEmail } from "../../helpers/validateEmail";

export const NewTeacher = () => {
    const {schoolId} = useParams()
    const navigate = useNavigate()
    const {loading, error, createTeacher} = useTeachersStore()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])

    const handleSetFullName = (e) => {
        setFullName(e.target.value);
    };

    const handleSetEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleError = (value) => {
        setErrors((prevErrors) => [...prevErrors, value]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([])

        let isValid = true

        if (fullName.length < 8) {
            handleError('Поле "ФИО" не должно быть короче 8 символов');
            isValid = false
        }

        if(!validateEmail(email)) {
            handleError('Введена некорректная почта');
            isValid = false
        }

        if(isValid) {
            await createTeacher(schoolId, fullName, email)
            toast('Преподаватель создан')
            navigate(`/schools_owner/schools/${schoolId}/teachers`)
        }
    };

    return (
        <>
            <Subtitle>Создание преподавателя</Subtitle>

            <>
                {errors.length > 0 ? <Error errors={errors}/> : ''}

                <Form
                    onSubmit={handleSubmit}
                    inputs={
                        <div className={'two-col'}>
                            <Input type={'text'} label={'ФИО'} value={fullName} onChange={handleSetFullName}/>
                            <Input type={'text'} label={'Почта'} value={email} onChange={handleSetEmail}/>
                        </div>
                    }
                    buttons={
                        <>
                            <Button type={'submit'} variant={'blue'}>{loading ? "Идет создание..." : "Создать"}</Button>
                        </>
                    }
                />
            </>
        </>
    )
}
