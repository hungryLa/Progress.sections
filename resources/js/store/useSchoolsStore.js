import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useSchoolsStore = create(
    persist(
        (set, get) => ({
            schools: [],
            loading: false,
            error: null,
            getSchools: async () => {
                try {
                    set({loading: true})
                    const response = await api.get('cabinet/schools/')
                    console.log(response)
                    const {school} = response.data
                    console.log(school)
                    set({
                        loading: false,
                        schools: [...school]
                    })
                } catch (error) {
                    set({loading: false, error})
                }
            }
        }),
        {name: 'schools-storage'}
    )
)

export default useSchoolsStore
