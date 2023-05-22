import {Subtitle} from "../../components/UI/Subtitle";
import useTeachersStore from "../../store/useTeachersStore";
import {Error} from "../../components/Error";
import {Form} from "../../components/UI/Form";
import {Input} from "../../components/UI/Input";
import {useState} from "react";
import {Button} from "../../components/UI/Button";
import {useNavigate, useParams} from "react-router-dom";

export const NewTeacher = () => {
    const {schoolId} = useParams()
    const navigate = useNavigate()
    const {loading, error, createTeacher} = useTeachersStore()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')

    const handleFullNameChange = (e) => setFullName(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createTeacher(schoolId, fullName, email)
        if(!error) navigate(`/schools_owner/schools/${schoolId}/teachers`)
    }

    return (
        <>
            <Subtitle>Создание преподавателя</Subtitle>

            <>
                {error ? <Error errors={error}/> : ''}

                <Form
                    onSubmit={handleSubmit}
                    inputs={
                        <div className={'two-col'}>
                            <Input type={'text'} label={'ФИО'} value={fullName} onChange={(e) => handleFullNameChange(e)}/>
                            <Input type={'email'} label={'Почта'} value={email} onChange={(e) => handleEmailChange(e)}/>
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
