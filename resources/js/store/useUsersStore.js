import {create} from "zustand";
import api from "../middlewares/auth.middleware";

const useUsersStore = create((set) => ({
    users: [],
    loading: false,
    error: '',
    getUsers: async () => {
        try {
            set({loading: true})
            const response = await api.get('/cabinet/users/index')
            const {users} = await response.data
            set({
                loading: false,
                users
            })
        } catch (error) {
            set({loading: false, error})
        }
    }
}))

export default useUsersStore
