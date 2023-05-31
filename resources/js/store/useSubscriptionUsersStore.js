import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useSubscriptionUsersStore = create(
    persist(
        (set, get) => ({
            loading: false,
            errors: [],
            subscriptionUsers: [],
            getSubscriptionUsers: async (userId) => {
                try {
                    set({loding: true})
                    const response = await api.get(`/cabinet/users/${userId}/subscriptions`)
                    console.log('subscriptions', response)
                    set({loading: false})
                } catch (error) {
                    console.log(error);
                    set({loading: false})
                }
            }
        }), {name: 'subscriptionUsers-storage'}
    )
)

export default useSubscriptionUsersStore
