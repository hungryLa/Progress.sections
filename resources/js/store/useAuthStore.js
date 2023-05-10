import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: '',
            error: null,
            login: async (email, password) => {
                try {
                    const response = await api.post(`/login?email=${email}&password=${password}`)
                    const {access_token} = await response.data
                    set({
                        token: access_token,
                        error: ''
                    })
                    localStorage.setItem('token', access_token)
                } catch (error) {
                    if(error.response.status === 401) {
                        set({
                            user: null,
                            token: '',
                            error: "Неверный логин или пароль"
                        })
                        localStorage.removeItem('token')
                    }
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
                localStorage.removeItem('token')
            }
        }),
        {
            name: 'auth-storage'
        }
    )
)

export default useAuthStore
