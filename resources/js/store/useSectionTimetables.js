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

        getOneSectionTimetable: async (sectionId, sectionTimetableId) => {
            try {
                set({loading: true, error: []})
                const response = await api.get(`/cabinet/sections/${sectionId}/timetable_sections/${sectionTimetableId}`)
                const {data} = response.data
                set({loading: false, sectionTimetable: data})
            } catch (error) {
                console.log(error)
                set({loading: false, error})
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
        },

        editSectionTimetable: async (
            sectionId,
            sectionTimetableId,
            timetableId,
            lessonPrice,
            trialPrice,
            group,
            groupPrice
        ) => {
            try {
                set({loading: true})
                const response = await api.put(`/cabinet/sections/${sectionId}/timetable_sections/${sectionTimetableId}/update`, {
                    'timetable_id': timetableId,
                    'lesson_price': lessonPrice,
                    'trial_price': trialPrice,
                    'group': group,
                    'group_price': groupPrice
                })
                await get().getOneSectionTimetable(sectionId, sectionTimetableId)
                set({loading: false})
            } catch (error) {
                console.log(error)
                set({loading: false})
            }
        },

        deleteSectionTimetable: async (sectionId, id) => {
            try {
                set({loading: true, error: []})
                const response = await api.delete(`/cabinet/sections/${sectionId}/timetable_sections/${id}/delete`)
                await get().getSectionTimetables(sectionId)
                set({loading: false})
            } catch (error) {
                set({
                    loading: false,
                    error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key]),
                })
            }
        }
    }), {name: 'sectionTimetables-storage'})
)

export default useSectionTimetables
