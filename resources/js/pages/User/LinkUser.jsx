import { Button } from "../../components/UI/Button";
import { Form } from "../../components/UI/Form";
import { Subtitle } from "../../components/UI/Subtitle";
import { useEffect, useState } from "react";
import usePersonsStore from "../../store/usePersonsStore";
import { Input } from "../../components/UI/Input";
import { validateEmail } from "../../helpers/validateEmail";
import { Error } from "../../components/Error";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LinkUser = () => {
    const { loading, error, linkUser, clearError } = usePersonsStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setErrors([]);
        clearError();
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setErrors([]);
        clearError();
        setPassword(e.target.value);
    };

    const handleError = (value) => {
        setErrors((prev) => [...prev, value]);
    };

    useEffect(() => {
        clearError()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([])

        let isValid = true;

        if (!validateEmail(email)) {
            handleError("Почта введена некорректно");
            isValid = false;
        }

        if (password.length === 0) {
            handleError("Пароль не может быть пустым");
            isValid = false;
        }

        if (password.length < 8) {
            handleError("Пароль должен быть не менее 8 символов");
            isValid = false;
        }

        if (isValid) {
            const linkedUserResult = await linkUser(email, password);


            if (!linkedUserResult.error && linkedUserResult.status === "success") {
                navigate("/user/accounts");
                toast("Пользователь привязан");
              }
        }
    };

    return (
        <>
            <Subtitle>Привязка пользователя</Subtitle>
            <Form
                onSubmit={handleSubmit}
                inputs={
                    <div className="one-col">
                        {errors.length > 0 ? <Error errors={errors} /> : ""}
                        {error ? <Error errors={[error]} /> : ""}
                        <div className="two-col">
                            <Input
                                placeholder={"Почта"}
                                value={email}
                                onChange={handleEmail}
                                bordered
                                id={"email"}
                            />
                            <Input
                                placeholder={"Пароль"}
                                value={password}
                                onChange={handlePassword}
                                bordered
                                id={"password"}
                            />
                        </div>
                    </div>
                }
                buttons={
                    <Button type={"submit"} variant={"white"}>
                        {loading ? "Привязка..." : "Призявать"}
                    </Button>
                }
            />
        </>
    );
};
