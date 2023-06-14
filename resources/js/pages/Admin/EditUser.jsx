import { useNavigate, useParams } from "react-router-dom";
import { Subtitle } from "../../components/UI/Subtitle";
import { useEffect, useState } from "react";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import useUsersStore from "../../store/useUsersStore";
import { Form } from "../../components/UI/Form";
import { Select } from "../../components/UI/Select";
import { Loader } from "../../components/UI/Loader";
import { Error } from "../../components/Error";
import { validateEmail } from "../../helpers/validateEmail";
import { toast, ToastContainer } from "react-toastify";

export const EditUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const {
        editUser,
        loading,
        users,
    } = useUsersStore();
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("user");
    const [email, setEmail] = useState("");

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const user = users.find((user) => user.id == userId);
        console.log(user);
        setFullName(user.full_name);
        setRole(user.role);
        setEmail(user.email);
    }, []);

    const handleSetFullName = (e) => {
        setErrors([])
        setFullName(e.target.value);
    };

    const handleSetRole = (e) => {
        setErrors([])
        setRole(e.target.value);
    };

    const handleSetEmail = (e) => {
        setErrors([])
        setEmail(e.target.value);
    };

    const handleError = (value) => {
        setErrors((prevErrors) => [...prevErrors, value]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        const user = {
            full_name: fullName,
            email,
            role,
        };

        let isValid = true

        if (fullName.length < 8) {
            handleError('Поле "ФИО" не должно быть короче 8 символов');
            isValid = false
        }

        if(!validateEmail(email)) {
            handleError('Введена некорректная почта');
            isValid = false
        }

        if (isValid) {
            await editUser(userId, user)
            toast('Данные о пользователе обновлены')
            navigate("/admin/users")
        }
    };

    return (
        <>
            <Subtitle>Новая учетная запись</Subtitle>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {errors.length > 0 ? <Error errors={errors} /> : ""}
                    <Form
                        onSubmit={handleSubmit}
                        inputs={
                            <>
                                <Input
                                    placeholder={"ФИО"}
                                    value={fullName}
                                    onChange={handleSetFullName}
                                    bordered
                                    id={"fullName"}
                                />
                                <Input
                                    placeholder={"Почта"}
                                    value={email}
                                    onChange={handleSetEmail}
                                    bordered
                                    id={"email"}
                                />
                                <Select
                                    onChange={handleSetRole}
                                    bordered
                                    id={"role"}
                                    value={role}
                                    style={
                                        role === ""
                                            ? {
                                                  color: " rgba(44, 61, 115, 0.25)",
                                              }
                                            : { color: "inherit" }
                                    }
                                >
                                    <option value="admin">Администратор</option>
                                    <option value="schools_owner">
                                        Администратор секции
                                    </option>
                                    <option value="teacher">
                                        Преподаватель
                                    </option>
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
            )}
        </>
    );
};
