import {
    create
} from "zustand";
import api from "../middlewares/auth.middleware";
import {
    persist
} from "zustand/middleware";

const useUsersStore = create(
    persist(
        (set, get) => ({
            users: [],
            loading: false,
            error: null,
            fullNameError: '',
            emailError: '',
            roleError: '',
            getUsers: async () => {
                try {
                    set({
                        loading: true
                    })
                    const response = await api.get('/cabinet/users/')
                    console.log(response)
                    const {
                        data
                    } = await response.data
                    set({
                        loading: false,
                        users: [...data]
                    })
                } catch (error) {
                    console.log(error)
                    set({
                        loading: false,
                        error
                    })
                }
            },
            addUser: async (user) => {
                set({
                    fullNameError: '',
                    emailError: '',
                    roleError: '',
                    loading: true
                })
                try {
                    await api.post('/cabinet/users/store', {
                        role: user.role,
                        full_name: user.full_name,
                        email: user.email,
                    })
                    set({
                        fullNameError: '',
                        emailError: '',
                        roleError: '',
                        loading: false
                    })
                    window.location.href = '/users'
                } catch (error) {
                    if (error.response.data.errors) {
                        set({
                            fullNameError: error.response.data.errors.full_name,
                            emailError: error.response.data.errors.email,
                            roleError: error.response.data.errors.role,
                            loading: false
                        })
                    }
                }
            },
            editUser: async (userId, user) => {
                set({
                    fullNameError: '',
                    emailError: '',
                    roleError: '',
                    loading: true
                })
                try {
                    await api.put(`/cabinet/users/${userId}/update`, {
                        role: user.role,
                        full_name: user.full_name,
                        email: user.email,
                    })
                    set({
                        fullNameError: '',
                        emailError: '',
                        roleError: '',
                        loading: false
                    })
                    window.location.href = '/users'
                } catch (error) {
                    if (error.response.data.errors) {
                        set({
                            fullNameError: error.response.data.errors.full_name,
                            emailError: error.response.data.errors.email,
                            roleError: error.response.data.errors.role,
                            loading: false
                        })
                    }
                }
            },
            deleteUser: async (id) => {
                try {
                    set({
                        loading: true
                    })
                    const response = await api.delete(`/cabinet/users/${id}/delete`)
                    await get().getUsers()
                    set({
                        loading: false
                    })
                } catch (error) {
                    set({
                        loading: false,
                        error
                    })
                }
            }
        }), {
            name: 'users-storage'
        }
    ))

export default useUsersStore
