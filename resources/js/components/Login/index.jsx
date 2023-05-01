import {Container} from "../Container";
import './Login.scss'
import {LoginSwiper} from "./LoginSwiper";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "../../middlewares/auth.middleware";
import { setError, setToken, setUser} from "../../store/authSlice";
import {Navigate, useNavigate} from "react-router-dom";
import {Title} from "../Title";

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, setLogin] = useState('admin@mail.ru')
    const [password, setPassword] = useState('password')

    // const user = useSelector(state => state.auth.user)
    // const token = useSelector(state => state.auth.token)
    const error = useSelector(state => state.auth.error)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post(`/auth/login?email=${login}&password=${password}`);
            console.log(response)
            const {user, access_token} = response.data
            console.log(access_token, user)
            await dispatch(setToken(access_token));
            await dispatch(setUser(user));
            await dispatch(setError(''));
            console.log(user.role)
            if(user.role === 'admin') navigate('/admin/users')
            if(user.role === 'school_owner') navigate('/school_owner/sections')
            // if(user.role === 'user') navigate('/')
        } catch (error) {
            dispatch(setError(error.response.status));
        }
    }

    return (
        <div className={'login'}>
            <Container>
                <div className="login__inner">
                    {/*{user.role === 'admin' && <Navigate to={'/admin/users'} />}*/}
                    <div className='login__form'>
                        <Title>Единая система оплаты дополнительного образования, секция и кружков</Title>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder={'Login'} value={login} onChange={(e) => setLogin(e.target.value)}/>
                            <input type="text" placeholder={'Password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
                            {error === 401 && 'Логин или пароль неверные, попробуйте еще раз'}
                            <button type='submit'>Login</button>
                        </form>
                    </div>
                    <LoginSwiper/>
                </div>
            </Container>
        </div>
    )
}
