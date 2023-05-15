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
                set({loading: true})
                const request = await api.get(`/cabinet/timetables?school=${schoolId}`)
                const {timetables} = request.data
                set({loading: false, schoolOwnerTimetables: [...timetables]})
                console.log(get().schoolOwnerTimetables)
            } catch (error) {
                set({loading: false, error})
            }
        },
        getTeacherTimetables: async (teacherId) => {
            const request = await api.get(`/cabinet/timetables?teacher=${teacherId}`)
            console.log(request)
        },
        editSchoolsOwnerTimetable: async (timetableId, schoolId, weekdays, lessonTime, workdayStart, workdayEnd, withoutRest, restStart, restEnd) => {
            try {
                set({loading: true})
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
                set({loading: false})
            } catch (error) {
                console.log(error)
                set({loading: false, error})
            }
        },
        deleteSchoolsOwnerTimetable: async (schooldId, timetableId) => {
            try {
                set({
                    loading: true
                })
                await api.delete(`/cabinet/timetables/${timetableId}/delete`)
                await get().getSchoolOwnerTimetables(schooldId)
                set({
                    loading: false
                })
            } catch (error) {
                console.log(error)
                set({
                    loading: false,
                    error
                })
            }
        },
        createSchoolTimeTable: async (schoolId, weekdays, lessonTime, workdayStart, workdayEnd, withoutRest, restStart, restEnd) => {
            set({loading: false})
            try {
                console.log(weekdays)
                await api.post(
                    `/cabinet/timetables/store`, {
                    }, {
                        params: {
                            school: schoolId,
                            weekday: weekdays,
                            lesson_time: lessonTime,
                            workday_start: workdayStart,
                            workday_end: workdayEnd,
                            without_rest: withoutRest,
                            rest_start: restStart,
                            rest_end: restEnd
                        }
                    }
                ).then(response => {
                    console.log(response.data);
                })
                    .catch(error => {
                        console.error(error);
                    });
                set({loading:false})
                window.location.href = `/schools_owner/schools/${schoolId}/timetables`
            } catch (e) {
                set({loading: false})
            }
        }
    }), {name: 'timetables-storage'})
)

export default useTimetablesStore
