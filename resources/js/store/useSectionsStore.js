import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useSectionsStore = create(
    persist((set, get) => ({
        sections: [],
        section: {},
        loading: false,
        error: null,
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
    }), {
        name: "sections-storage",
    })
);

export default useSectionsStore
