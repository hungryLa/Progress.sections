import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const usePersonsStore = create(
    persist((set, get) => ({
        linkedUsers: [],
        people: [],
        loading: false,
        error: [],
        status: '',

        getPersons: async () => {
            try {
                set({loading: true})
                const response = await api.get(`/cabinet/people/`)
                set({loading: false, linkedUsers: response?.data?.linked_users, people: response?.data?.people})
            } catch (error) {
                set({loading: false})
            }
        },

        clearError: () => {
            set({error: ''})
        },

        linkUser: async (email, password) => {
            try {
                set({loading: true, error: '', status: ''})
                const response = await api.post(`/cabinet/users/link_user`, {
                    email,
                    password
                })

                if(response?.data?.status === 'error') {
                    set({error: response?.data?.message, status: response?.data?.status})
                }

                if(response?.data?.status === 'success') {
                    set({error: '', status: response?.data?.status})
                }

                get().getPersons()
                set({loading: false})
                return {
                    error: get().error,
                    status: get().status
                }
            } catch (err) {
                set({loading: false})
            }
        },
        unlinkUser: async (userId) => {
            try {
                set({loading: true})
                const response = await api.delete(`/cabinet/users/${userId}/unlink_user`, {user: userId})
                get().getPersons()
                set({loading: false})
            } catch(error) {
                set({loading: false, error})
            }
        },
        createPerson: async(gender, fullName, dateBirth) => {
            try {
                set({loading: true, error: '', status: ''})
                const response = await api.post('/cabinet/people/store', {
                    gender,
                    'full_name': fullName,
                    'date_birth': dateBirth
                })

                if(response?.data?.status === 'success') {
                    set({error: '', status: response?.data?.status})
                }

                get().getPersons()
                set({loading: false})
                return {
                    error: get().error,
                    status: get().status
                }
            } catch (err) {
                set({loading: false})
            }
        },
        deletePerson: async(personId) => {
            try {
                set({loading: true})
                const response = await api.delete(`/cabinet/people/${personId}/delete`,)
                get().getPersons()
                set({loading: false})
            } catch(error) {
                set({loading: false, error})
            }
        }
    }), {name: 'persons-storage'})
)

export default usePersonsStore
