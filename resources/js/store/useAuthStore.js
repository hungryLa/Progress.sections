import {create} from "zustand"
import {persist} from 'zustand/middleware'
import api from "../middlewares/auth.middleware";

const initialState = {
    user: {},
    accessToken: "",
    errorMessage: "",
}

const useAuthStore = create(
    persist(
        (set) => ({
            ...initialState,
            login: async (email, password) => {
                try {
                    const response = await api.post(
                        `/auth/login?email=${email}&password=${password}`
                    );
                    set({
                        user: response.data.user,
                        accessToken: response.data.access_token,
                        errorMessage: "",
                    });
                    
                } catch (error) {
                    set({
                        user: {},
                        accessToken: '',
                        errorMessage: error.response.statusText
                    })
                }
            },
            reset: async () => {
                set(initialState)
            }
        }),
        {
            name: 'auth-storage'
        }
    )
);

export default useAuthStore