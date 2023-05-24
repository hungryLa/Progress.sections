import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useSectionTimetables = create(
    persist((set, get) => ({
        sectionTimetables: [],
        sectionTimetable: {},
        loading: false,
        error: [],

        getSectionTimetables: async (sectionId) => {
            try {
                set({loading: true, error: []})
                const response = await api.get(`/cabinet/sections/${sectionId}/timetable_sections`)
                const {timetables} = response?.data
                set({loading: false, sectionTimetables: timetables})
            } catch (error) {
                set({loading: false})
            }
        },

        addSectionTimetable: async (
            sectionId,
            timetableId,
            lessonPrice,
            trialPrice,
            group,
            groupPrice
        ) => {
            try {
                set({loading: true, error: []})
                const response = await api.post(`/cabinet/sections/${sectionId}/timetable_sections/store`, {
                    'timetable_id': timetableId,
                    'lesson_price': lessonPrice,
                    'trial_price': trialPrice,
                    'group': group,
                    'group_price': groupPrice
                })
                await get().getSectionTimetables(sectionId)
                set({loading: false})
            } catch (error) {
                console.log(error)
                set({loading: false})
            }
        }
    }), {name: 'sectionTimetables-storage'})
)

export default useSectionTimetables
