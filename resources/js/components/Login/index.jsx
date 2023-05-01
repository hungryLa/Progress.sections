import {Container} from "../Container";
import './Login.scss'
import {LoginSwiper} from "./LoginSwiper";
import {useState} from "react";
import {useDispatch} from "react-redux";
import api from "../../middlewares/auth.middleware";
import {setToken} from "../../store/authSlice";

export const Login = () => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post(`/auth/login?email=${login}&password=${password}`);
            console.log(response.data)
            const {access_token} = response.data;
            console.log(access_token)
            dispatch(setToken(access_token))
        } catch (error) {
            console.error(error)
        }
    }

    const handleClick = async () => {
        try {
            const response = await api.post(`/auth/me`);
            // console.log(response.data)

        } catch (error) {
            // console.error(error)
        }
    }

    return (
        <div className={'login'}>
            <Container>
                <div className="login__inner">
                    <div className='login__form'>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="">
                                Login
                                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
                            </label>
                            <label htmlFor="">
                                Password
                                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </label>
                            <button type='submit'>Login</button>
                        </form>
                        <button onClick={handleClick}>get info</button>
                    </div>
                    <LoginSwiper/>
                </div>
            </Container>
        </div>
    )
}
