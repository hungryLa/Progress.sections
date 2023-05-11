import {Subtitle} from "../../components/UI/Subtitle";
import {useState} from "react";
import {Input} from "../../components/UI/Input";
import {Button} from "../../components/UI/Button";
import useAuthStore from "../../store/useAuthStore";
import useUsersStore from "../../store/useUsersStore";

export const NewUser = () => {
    const addUser = useUsersStore(({addUser}) => addUser)

    const [fullName, setFullName] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')

    const handleSetFullName = (e) => {
        setFullName(e.target.value)
    }

    const handleSetRole = (e) => {
        setRole(e.target.value)
    }

    const handleSetEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            full_name: fullName,
            email,
            role
        }
        await addUser(user).then((res) => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <Subtitle>Новый пользователь</Subtitle>
            <form onSubmit={handleSubmit}>
                <Input placeholder={'ФИО'} value={fullName} onChange={handleSetFullName}/>
                <Input placeholder={'Почта'} value={email} onChange={handleSetEmail}/>
                <Input placeholder={'Роль'} value={role} onChange={handleSetRole}/>
                {fullName && fullName}
                {email && email}
                {role && role}
                <Button type={'submit'} variant={'blue'}>Создать</Button>
            </form>
        </>
    )
}
