import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useSectionsStore = create(
    persist((set, get) => ({
        sections: [],
        loading: false,
        error: null,
        getSections: async (schoolId) => {
            try {
                set({loading: true})
                const response = await api.get(`cabinet/schools/${schoolId}/sections`)
                const {data} = response.data
                console.log(data);
                set({loading: false, sections: [...data]})
            } catch (error) {
                set({loading: false, error})
            }
        }
    }), {
        name: "sections-storage",
    })
);

export default useSectionsStore
