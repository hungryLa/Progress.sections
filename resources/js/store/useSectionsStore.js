import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useSectionsStore = create(
    persist((set, get) => ({
        sections: [],
        section: {},
        loading: false,
        error: null,
        occupationError: '',
        descriptionError: '',
        contentsError: '',
        getSections: async (schoolId) => {
            try {
                set({loading: true})
                const sectionsResponse = await api.get(`cabinet/schools/${schoolId}/sections`)
                const {data} = sectionsResponse.data
                const occupationsResponse = await api.get(`cabinet/occupations`)
                const occupationsData = occupationsResponse.data.data
                data.forEach(section => {
                    occupationsData.forEach(occupation => {
                        if (section.occupation_id === occupation.id) {
                            section.occupation = occupation
                        }
                    })
                })
                set({loading: false, sections: [...data]})
            } catch (error) {
                set({loading: false, error})
            }
        },
        addSection: async (schoolId, occupation, description, contents) => {
            try {
                set({loading: true, occupationError: '', descriptionError: '', contentsError: ''})
                await api.post(`cabinet/schools/${schoolId}/sections/new`)
                set({loading: false, occupationError: '', descriptionError: '', contentsError: ''})
            } catch (error) {
                if (error.response.data.errors) {
                    set({
                        loading: false,
                        occupationError: error.response.data.errors.occupation,
                        descriptionError: error.response.data.errors.description,
                        contentsError: error.response.data.errors.contents})
                }
            }
        }
    }), {
        name: "sections-storage",
    })
);

export default useSectionsStore
