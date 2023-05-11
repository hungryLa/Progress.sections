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
    const [email, setEmail] = useState("admin@mail.ru");
    const [password, setPassword] = useState("password");
    const login = useAuthStore(({ login }) => login, shallow);
    const user = useAuthStore(({ user }) => user, shallow);
    const error = useAuthStore(({ error }) => error, shallow);
    const clearError = useAuthStore(({clearError}) => clearError, shallow)

    useEffect(() => {
        if (user) {
            switch (user.role) {
                case "admin":
                    navigate("/users");
                    break;
                case "teacher":
                    navigate("/sections");
                    break;
                case "schools_owner":
                    navigate("/sections");
                    break;
                default:
                    navigate("/schedule");
                    break;
            }
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    const emailHandler = (e) => {
        setEmail(e.target.value)
        clearError()
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        clearError()
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
