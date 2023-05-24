import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useSchoolTypesStore = create(
    persist((set, get) => ({
            schoolTypes: [],
            schoolType: {},
            loading: false,
            error: null,
            titleError: '',
            colorError: '',
            clearErrors: () => {set({titleError: '', colorError: ''})},
            getSchoolTypes: async () => {
                try {
                    set({loading: true})
                    const response = await api.get('cabinet/school_types/')
                    set({loading: false, schoolTypes: response.data.data})
                } catch (error) {
                    set({loading: false})
                }
            },
            getOneSchoolType: async (schoolTypeId) => {
                try {
                    set({loading: true})
                    const response = await api.get(`/cabinet/school_types/${schoolTypeId}`)
                    set({loading: false, schoolType: response.data.data})
                } catch (error) {
                    set({error})
                }
            },
            addSchoolType: async (title, color) => {
                try {
                    set({loading: true})
                    await api.post(`/cabinet/school_types/store`, {
                        title,
                        color
                    })
                    await get().getSchoolTypes()
                    set({loading: false})
                } catch (error) {
                    if(error.response.data.errors) {
                        set({
                            loading: false,
                            titleError: error.response.data.errors.title || '',
                            colorError: error.response.data.errors.color || '',
                        })
                    }
                }
            },
            editSchoolType: async (schoolTypeId, title, color) => {
                try {
                    set({loading: false})
                    const response = await api.put(`/cabinet/school_types/${schoolTypeId}/edit/`, {
                        title,
                        color
                    })
                    console.log(response)
                    await get().getSchoolTypes()
                    set({loading: false})
                } catch (error) {
                    console.log(error)
                    if (error.response.data.errors) {
                        set({
                            loading: false,
                            titleError: error.response.data.errors.title || '',
                            colorError: error.response.data.errors.color || '',
                        })
                    }
                }
            },
            deleteSchoolType: async (schoolTypeId) => {
                try {
                    set({loading: true})
                    const response = api.delete(`/cabinet/school_types/${schoolTypeId}/delete`)
                    await get().getSchoolTypes()
                    set({loading: false})
                } catch (error) {
                    set({loading: false, error})
                }
            }
        }),
        {name: 'schoolTypes-storage'}
    )
)

export default useSchoolTypesStore
