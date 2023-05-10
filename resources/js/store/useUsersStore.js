import {create} from "zustand";
import api from "../middlewares/auth.middleware";

const useUsersStore = create((set) => ({
    users: [],
    loading: false,
    error: '',
    message: '',
    getUsers: async () => {
        try {
            set({loading: true})
            const response = await api.get('/cabinet/users')
            console.log(response.data)
            const {data} = await response.data
            set({
                loading: false,
                users: data
            })
        } catch (error) {
            set({loading: false, error})
        }
    },
    addUser: async (user) => {
        try {

        } catch (error) {
            set({loading: false, error})
        }
    },
    deleteUser: async (id) => {
        try {
            set({loading: false})
            const response = await api.delete(`/cabinet/users/${id}/delete`)
            console.log(response.data)
        } catch (error) {
            set({loading: false, error})
        }

        
    }
}))

export default useUsersStore
