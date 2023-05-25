import { Container } from "../Container";
import "./Login.scss";
import { LoginSwiper } from "./LoginSwiper";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../UI/Title";
import useAuthStore from "../../store/useAuthStore";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import {shallow} from "zustand/shallow";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, user, error, clearError} = useAuthStore()

    const [formError, setFormError] = useState('')

    useEffect(() => {
        clearError()
        if (user && !user.email_verified_at) {
            console.log('true')
            navigate("/not-verified", {replace: true})
        }
        if (user) {
            switch (user.role) {
                case "admin":
                    navigate("/admin/users");
                    break;
                case "teacher":
                    navigate("/sections");
                    break;
                case "schools_owner":
                    navigate("/schools_owner/schools");
                    break;
                default:
                    navigate("/user/schedule");
                    break;
            }
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email && !password) {
            setFormError('Заполните все поля')
            return;
        }
        if(!email){
            setFormError('Введите email')
            return;
        }
        if(!password){
            setFormError('Введите пароль')
            return;
        }
        if(password.length < 8) {
            setFormError('Пароль должен быть не короче 8 символов')
            return;
        }

        if(!formError) {
            await login(email, password);
        }

        if(error) {
            setFormError(error)
        }
    };

    const emailHandler = (e) => {
        setEmail(e.target.value)
        clearError()
        setFormError('')
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        clearError()
        setFormError('')
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
                            {formError && <small className="login__error">{formError}</small>}
                            {error && <small className="login__error">{error}</small>}
                            <Link className="login__link" to={'/password-reset'}>Восстановить пароль</Link>
                            <div className="login__buttons">
                                <Button type="button" variant={"white"} onClick={handleRedirect}>
                                    Зарегистрироваться
                                </Button>
                                <Button type="submit" variant={"blue"}>
                                    Войти
                                </Button>
                            </div>
                        </form>
                    </div>
                    <LoginSwiper />
                </div>
            </Container>
        </div>
    );
};
