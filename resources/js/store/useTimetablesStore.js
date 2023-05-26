import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useTimetablesStore = create(
    persist((set, get) => ({
        schoolOwnerTimetables: [],
        teacherTimetables: [],
        timetable: {},
        loading: false,
        error: null,
        getSchoolOwnerTimetables: async (schoolId) => {
            try {
                set({loading: false, error: ''})
                const request = await api.get(`/cabinet/timetables?school=${schoolId}`)
                const {timetables} = request.data
                set({loading: false, error: '', schoolOwnerTimetables: timetables})
            } catch (error) {
                if (error.response.data.errors) set({
                    loading: false,
                    error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key])
                })
            }
        },
        getTeacherTimetables: async (teacherId) => {
            try {
                set({loading: false, error: ''})
                const request = await api.get(`/cabinet/timetables?teacher=${teacherId}`)
                console.log(request)
                const {timetables} = request.data
                set({loading: false, error: '', teacherTimetables: timetables})
            } catch (error) {
                if (error.response.data.errors) set({
                    loading: false,
                    error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key])
                })
            }
        },
        getOneTimetable: async (timetableId) => {
            try {
                set({loading: false, error: ''})
                const request = await api.get(`/cabinet/timetables/${timetableId}`)
                const {data} = request.data
                set({loading: false, error: '', timetable: data})
            } catch (error) {
                if (error.response.data.errors) set({
                    loading: false,
                    error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key])
                })
            }
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
        editTeachersTimetable: async (timetableId, teacherId, weekdays, lessonTime, workdayStart, workdayEnd, withoutRest, restStart, restEnd) => {
            try {
                set({loading: false, error: ''})
                await api.put(`/cabinet/timetables/${timetableId}/update`, {
                    teacher: teacherId,
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
        deleteTeacherTimetable: async (teacherId, timetableId) => {
            try {
                set({loading: false, error: ''})
                await api.delete(`/cabinet/timetables/${timetableId}/delete`)
                await get().getTeacherTimetables(teacherId)
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
                if (error.response.data.errors) set({
                    loading: false,
                    error: (typeof error === "object") ? Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key]) : error
                })
            }
        },
        createTeacherTimeTable: async (teacherId, weekdays, lessonTime, workdayStart, workdayEnd, withoutRest, restStart, restEnd) => {
            set({loading: false, error: ''})
            try {
                const formData = new FormData()
                formData.append('teacher', teacherId)
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
                if (error.response.data.errors) set({
                    loading: false,
                    error: (typeof error === "object") ? Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key]) : error
                })
            }
        },
        getSchoolsAndTeachersTimetables: async (schoolId) => {
            try {
                set({loading: true})
                const response = await api.get(`/cabinet/timetables/all?school=${schoolId}`)
                console.log(response)
                set({loading: false})
            } catch (error) {
                set({loading: false})
            }
        }
    }), {name: 'timetables-storage'})
)

export default useTimetablesStore
