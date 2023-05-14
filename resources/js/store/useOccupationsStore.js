import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useOccupationsStore = create(
    persist(
        (set, get) => ({
            occupations: [],
            loading: false,
            error: null,

            getOccupations: async () => {
                try {
                    set({loading: true})
                    const response = await api.get('cabinet/occupations/')
                    console.log(response.data.data);
                    set({loading: false, occupations: response.data.data})
                } catch (error) {
                    set({loading: false, error})
                }
            },
            addOccupation: async (title) => {
                try {
                    set({loading: true})
                    await api.post('cabinet/occupations/store', {title})
                    set({loading: false})
                } catch (error) {
                    set({loading: false})
                }
            },
            deleteOccupation: async (id) => {
                try {
                    set({loading: true})
                    const response = await api.delete(`/cabinet/occupations/${id}/delete`)
                    await get().getOccupations()
                    set({loading: false})
                } catch (error) {
                    set({loading: false, error})
                }
            }
        }),
        {name: 'occupations-storage'}
    )
)

export default useOccupationsStore
