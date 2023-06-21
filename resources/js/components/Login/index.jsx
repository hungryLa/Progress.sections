import {Container} from "../Container";
import "./Login.scss";
import {LoginSwiper} from "./LoginSwiper";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Title} from "../UI/Title";
import useAuthStore from "../../store/useAuthStore";
import {Input} from "../UI/Input";
import {Button} from "../UI/Button";
import {Error} from "../Error";
import {validateEmail} from "../../helpers/validateEmail";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, user, error, clearError, loading} = useAuthStore()

    const [errors, setErrors] = useState([])

    const handleError = (value) => {
        setErrors(prev => [...prev, value])
    }

    useEffect(() => {
        console.log(import.meta?.env?.FRONT_URL)
        setErrors([])
        if (user && !user.email_verified_at) {
            console.log('true')
            navigate("/not-verified", {replace: true})
        }
        if (user) {
            switch (user.role) {
                case "admin":
                    navigate("/admin");
                    break;
                case "teacher":
                    navigate("/teacher");
                    break;
                case "schools_owner":
                    navigate("/schools_owner");
                    break;
                default:
                    navigate("/user");
                    break;
            }
        }
    }, [user]);

    const handleSubmit = async (e) => {
        setErrors([])
        clearError()
        e.preventDefault();

        let isValid = true

        if (!email) {
            handleError('Введите почту')
            isValid = false
        }
        if (!validateEmail(email)) {
            handleError('Почта введена некорректно')
            isValid = false
        }
        if (!password) {
            handleError('Введите пароль')
            isValid = false;
        }
        if (password.length < 8) {
            handleError('Пароль должен быть не короче 8 символов')
            isValid = false;
        }

        if (isValid) {
            await login(email, password);
        }
    };

    useEffect(() => {
        setErrors([])
        if (error !== "") handleError(error)
    }, [error])

    useEffect(() => {
        clearError()
    }, [])

    useEffect(() => {
        console.log(errors);
    }, [errors])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        clearError()
        setErrors([])
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        clearError()
        setErrors([])
    }

    const handleRedirect = (e) => {
        e.preventDefault()
        navigate('/register')
    }

    return (
        <div className={"login"}>
            <Container>
                <div className="login__inner">
                    <div className="login__form">
                        <Title className={"login__title"}>
                            Единая система оплаты дополнительного образования,
                            секция и кружков
                        </Title>
                        <p className="login__text">
                            Решение проблем с безналичной оплатой, контролем
                            посещаемости, табелированием и отчетностью
                        </p>
                        {errors.length > 0 ? <Error errors={errors}/> : ''}
                        <form onSubmit={handleSubmit}>
                            <Input
                                type={"text"}
                                id={"email"}
                                placeholder={"email@email.com"}
                                value={email}
                                onChange={emailHandler}
                            />
                            <Input
                                type={"password"}
                                id={"password"}
                                placeholder={"Пароль"}
                                value={password}
                                onChange={passwordHandler}
                            />
                            <Link className="login__link" to={'/password-reset'}>Восстановить пароль</Link>
                            <div className="login__buttons">
                                <Button type="button" variant={"white"} onClick={handleRedirect}>
                                    Зарегистрироваться
                                </Button>
                                <Button type="submit" variant={"blue"}>
                                    {loading ? 'Вход...' : 'Войти'}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <LoginSwiper/>
                </div>
            </Container>
        </div>
    );
};
