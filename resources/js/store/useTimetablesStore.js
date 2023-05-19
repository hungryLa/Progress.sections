import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useTimetablesStore = create(
    persist((set, get) => ({
        schoolOwnerTimetables: [],
        teacherTimetables: [],
        loading: false,
        error: null,
        getSchoolOwnerTimetables: async (schoolId) => {
            try {
                set({loading: false, error: ''})
                const request = await api.get(`/cabinet/timetables?school=${schoolId}`)
                const {timetables} = request.data
                set({loading: false, error: '', schoolOwnerTimetables: [...timetables]})
                console.log(get().schoolOwnerTimetables)
            } catch (error) {
                if (error.response.data.errors) set({
                    loading: false,
                    error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key])
                })
            }
        },
        getTeacherTimetables: async (teacherId) => {
            const request = await api.get(`/cabinet/timetables?teacher=${teacherId}`)
        },
        editSchoolsOwnerTimetable: async (timetableId, schoolId, weekdays, lessonTime, workdayStart, workdayEnd, withoutRest, restStart, restEnd) => {
            try {
                set({loading: false, error: ''})
                await api.put(`/cabinet/timetables/${timetableId}/update`, {
                    school: schoolId,
                    weekday: weekdays,
                    lesson_time: lessonTime,
                    workday_start: workdayStart,
                    workday_end: workdayEnd,
                    without_rest: withoutRest,
                    rest_start: restStart,
                    rest_end: restEnd
                })
                set({loading: false, error: ''})
            } catch (error) {
                if (error.response.data.errors) set({
                    loading: false,
                    error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key])
                })
            }
        },
        deleteSchoolsOwnerTimetable: async (schooldId, timetableId) => {
            try {
                set({loading: false, error: ''})
                await api.delete(`/cabinet/timetables/${timetableId}/delete`)
                await get().getSchoolOwnerTimetables(schooldId)
                set({loading: false, error: ''})
            } catch (error) {
                if (error.response.data.errors) set({
                    loading: false,
                    error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key])
                })
            }
        },
        createSchoolTimeTable: async (schoolId, weekdays, lessonTime, workdayStart, workdayEnd, withoutRest, restStart, restEnd) => {
            set({loading: false, error: ''})
            try {
                console.log(weekdays)
                const formData = new FormData()
                formData.append('school', schoolId)
                formData.append('lesson_time', lessonTime)
                formData.append('workday_start', workdayStart)
                formData.append('workday_end', workdayEnd)
                formData.append('without_rest', withoutRest)
                formData.append('rest_start', restStart)
                formData.append('rest_end', restEnd)
                for (let i = 0; i < weekdays.length; i++) {
                    formData.append(`weekday[${i}]`, weekdays[i])
                }
                await api.post(
                    `/cabinet/timetables/store`, formData
                )
                set({loading: false, error: ''})
            } catch (error) {
                console.log(error)
                if (error.response.data.errors) set({
                    loading: false,
                    error: (typeof error === "object") ? Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key]) : error
                })
            }
        }
    }), {name: 'timetables-storage'})
)

export default useTimetablesStore
