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
            teacher: {},

            clearError: () => {
                set({error: ''})
            },
            login: async (email, password) => {
                try {
                    set({loading: true})
                    const response = await api.post(`/login?email=${email}&password=${password}`)
                    const {access_token, expires_in} = await response.data
                    set({
                        token: access_token,
                        expiresIn: expires_in,
                        error: '',
                        loading: false
                    })
                    if (!localStorage.getItem('token')) {
                        localStorage.setItem('token', access_token)
                    }
                    set({loading: false})
                } catch (error) {
                    set({
                        loading: false,
                        user: null,
                        token: '',
                        error: "Неверный логин или пароль"
                    })
                }
                try {
                    const response = await api.post('/me')
                    set({
                        user: await response.data
                    })
                } catch (error) {
                    set({
                        user: null,
                        token: '',
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
            },
            getUserInfo: async () => {
                try {
                    set({loading: true})
                    const response = await api.post('/me-res')
                    set({user: await response.data})
                    set({loading: false})
                } catch (error) {
                    set({loading: false})
                }
            },

        }),
        {
            name: 'auth-storage'
        }
    )
)

export default useAuthStore
