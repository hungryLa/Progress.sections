import {create} from "zustand";
import api from "../middlewares/auth.middleware";
import {persist} from "zustand/middleware";

const useUsersStore = create(
    persist(
        (set, get) => ({
            users: [],
            loading: false,
            error: null,
            message: null,
            getUsers: async () => {
                try {
                    set({loading: true})
                    const response = await api.get('/cabinet/users/')
                    console.log(response)
                    const {data} = await response.data
                    set({
                        loading: false,
                        users: [...data]
                    })
                } catch (error) {
                    console.log(error)
                    set({loading: false, error})
                }
            },
            addUser: async (user) => {
                try {
                    const response = await api.post('/cabinet/users/store', {
                        role: user.role,
                        full_name: user.full_name,
                        email: user.email,
                    })
                    console.log(response)
                } catch (error) {
                    set({loading: false, error})
                }
            },
            deleteUser: async (id) => {
                try {
                    set({loading: true})
                    const response = await api.delete(`/cabinet/users/${id}/delete`)
                    await get().getUsers()
                    set({loading: false})
                } catch (error) {
                    set({loading: false, error})
                }
            }
        }),
        {
            name: 'users-storage'
        }
    ))

export default useUsersStore
