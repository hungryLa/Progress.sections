import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useSchoolTypesStore = create(
    persist((set, get) => ({
            schoolTypes: [],
            schoolType: [],
            loading: false,
            error: null,
            getSchoolTypes: async () => {
                try {
                    set({loading: true})
                    const response = await api.get('cabinet/school_types/')
                    console.log(response)
                    set({loading: false})
                } catch (error) {
                    set({loading: false})
                }
            }
        }),
        {name: 'schoolTypes-storage'}
    )
)

export default useSchoolTypesStore
