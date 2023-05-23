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
            loading: false,
            clearError: () => {
                set({error: ''})
            },
            login: async (email, password) => {
                try {
                    set({loading: true})
                    const response = await api.post(`/login?email=${email}&password=${password}`)
                    console.log(response)
                    const {access_token, expires_in} = await response.data
                    set({
                        token: access_token,
                        expiresIn: expires_in,
                        error: '',
                        loading: false
                    })
                    if(!localStorage.getItem('token')) {
                        localStorage.setItem('token', access_token)
                    }
                } catch (error) {
                    console.log(error.response);
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
                        error: "Неверный логин или пароль",
                        loading: false
                    })
                }
            },
            logout: async () => {
                set({
                    user: null,
                    token: '',
                    error: ''
                })
                localStorage.clear()
            }
        }),
        {
            name: 'auth-storage'
        }
    )
)

export default useAuthStore
