import {Container} from "../Container";
import './Login.scss'
import {LoginSwiper} from "./LoginSwiper";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Title} from "../UI/Title";
import useAuthStore from "../../store/useAuthStore";

export const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('admin@mail.ru')
    const [password, setPassword] = useState('password')
    const login = useAuthStore(({login}) => login)
    const user = useAuthStore(({user}) => user)
    const error = useAuthStore(({error}) => error)

    useEffect(() => {
        // if(user && user.role === 'admin') navigate('/users')
        if(user) {
            switch (user.role) {
                case 'admin':
                    navigate('/users')
                    break
                case 'teacher':
                    navigate('/timetables')
                    break
                case 'schools_owner':
                    navigate('/sections')
                    break
                default:
                    navigate('/section')
                    break
            }
        }

    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className={'login'}>
            <Container>
                <div className="login__inner">
                    <div className='login__form'>
                        <Title>Единая система оплаты дополнительного образования, секция и кружков</Title>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder={'email@email.com'} value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="text" placeholder={'Password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
                            {error && error}
                            <button type='submit'>Login</button>
                        </form>
                    </div>
                    <LoginSwiper/>
                </div>
            </Container>
        </div>
    )
}
