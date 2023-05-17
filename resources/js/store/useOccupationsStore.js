import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useOccupationsStore = create(
    persist(
        (set, get) => ({
            occupations: [],
            loading: false,
            error: null,
            titleError: '',

            getOccupations: async () => {
                try {
                    set({loading: true})
                    const response = await api.get('cabinet/occupations/')
                    set({loading: false, occupations: response.data.data})
                } catch (error) {
                    set({loading: false, error})
                }
            },
            addOccupation: async (title) => {
                try {
                    set({loading: true, titleError: ''})
                    await api.post('cabinet/occupations/store', {title})
                    set({loading: false, titleError: ''})
                    window.location.href = '/admin/occupations'
                } catch (error) {
                    if(error.response.data.errors) {
                        set({loading: false, titleError: error.response.data.errors.title})
                    }
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
