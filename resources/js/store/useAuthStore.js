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
                    const response = await api.post(`/auth/login?email=${email}&password=${password}`)
                    console.log(response)
                    const {user, access_token} = await response.data
                    set({
                        user,
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
