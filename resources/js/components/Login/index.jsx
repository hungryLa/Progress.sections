import {Container} from "../Container";
import {LoginSwiper} from "./LoginSwiper";
import React, {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {Title} from "../Title";
import useAuthStore from "../../store/useAuthStore";
import './Login.scss'

export const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('admin@mail.ru')
    const [password, setPassword] = useState('password')

    const login = useAuthStore((state) => state.login)

    const user = useAuthStore((state) => state.user)
    const accessToken = useAuthStore((state) => state.accessToken)
    const errorMessage = useAuthStore((state) => state.errorMessage)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password).then(() => {
            if(accessToken) {
                localStorage.setItem('token', accessToken)
            }
        })
        if(user.role === 'admin') {
            console.log('i am admin, please let me go to the users page')
            navigate('/users')
        }
    }

    return (
        <div className={'login'}>
            <Container>
                <div className="login__inner">
                    <div className='login__form'>
                        <Title>Единая система оплаты дополнительного образования, секция и кружков</Title>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder={'Login'} value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="text" placeholder={'Password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button type='submit'>Login</button>
                            {errorMessage && errorMessage}
                            {accessToken && accessToken}
                        </form>
                    </div>
                    <LoginSwiper/>
                </div>
            </Container>
        </div>
    )
}
