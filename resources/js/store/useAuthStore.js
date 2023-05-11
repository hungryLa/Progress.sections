import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: '',
            error: null,
            expiresIn: null,
            clearError: () => {
                set({error: ''})
            },
            login: async (email, password) => {
                try {
                    const response = await api.post(`/login?email=${email}&password=${password}`)
                    console.log(response)
                    const {access_token, expires_in} = await response.data
                    set({
                        token: access_token,
                        expiresIn: expires_in,
                        error: ''
                    })
                    if(!localStorage.getItem('token')) {
                        localStorage.setItem('token', access_token)
                    }
                } catch (error) {
                    console.log(error);
                    // if(error.response.status === 401) {
                    //     set({
                    //         user: null,
                    //         token: '',
                    //         error: "Неверный логин или пароль",
                    //         expiresIn: null
                    //     })
                    //     localStorage.removeItem('token')
                    // }
                }
                try {
                    const response = await api.post('/me')
                    set({
                        user: await response.data
                    })
                } catch(error) {
                    set({
                        user: null,
                        token: '',
                        error: "Неверный логин или пароль"
                    })
                }
            },
            logout: async () => {
                set({
                    user: null,
                    token: '',
                    error: ''
                })
            }
        }),
        {
            name: 'auth-storage'
        }
    )
)

export default useAuthStore
