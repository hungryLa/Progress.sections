import { useParams } from "react-router-dom"
import { Subtitle } from "../../components/UI/Subtitle";
import { useEffect, useState } from "react";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import useUsersStore from "../../store/useUsersStore";
import { Form } from "../../components/UI/Form";
import { Select } from "../../components/UI/Select";

export const EditUser = () => {
    const {userId} = useParams()
    const {editUser, fullNameErrors, emailErrors, roleErrors, loading, users} = useUsersStore()
    const [fullName, setFullName] = useState('')
    const [role, setRole] = useState('user')
    const [email, setEmail] = useState("");

    useEffect(() => {
        const user = users.find(user => user.id == userId)
        console.log(user);
        setFullName(user.full_name)
        setRole(user.role)
        setEmail(user.email)
    }, [])


    const handleSetFullName = (e) => {
        setFullName(e.target.value);
    };

    const handleSetRole = (e) => {
        setRole(e.target.value);
    };

    const handleSetEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            full_name: fullName,
            email,
            role,
        };
        await editUser(userId, user);
    };

    return (
        <>
            <Subtitle>Новая учетная запись</Subtitle>
            <Form
                onSubmit={handleSubmit}
                inputs={
                    <>
                        <Input
                            placeholder={"ФИО"}
                            value={fullName}
                            onChange={handleSetFullName}
                            error={fullNameErrors}
                            bordered
                            id={"fullName"}
                        />
                        <Input
                            placeholder={"Почта"}
                            value={email}
                            onChange={handleSetEmail}
                            error={emailErrors}
                            bordered
                            id={"email"}
                        />
                        <Select
                            onChange={handleSetRole}
                            bordered
                            id={"role"}
                            error={roleErrors}
                            value={role}
                            style={
                                role === ""
                                    ? { color: " rgba(44, 61, 115, 0.25)" }
                                    : { color: "inherit" }
                            }
                        >
                            <option value="admin">Администратор</option>
                            <option value="schools_owner">
                                Администратор секции
                            </option>
                            <option value="teacher">Преподаватель</option>
                            <option value="user">Пользователь</option>
                        </Select>
                    </>
                }
                buttons={
                    <Button type={"submit"} variant={"white"}>
                        {loading ? "Идет изменение ..." : "Изменить"}
                    </Button>
                }
            />
        </>
    );
}
