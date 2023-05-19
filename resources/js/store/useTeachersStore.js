import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useTeachersStore = create(
    persist((set, get) => ({
        schoolTeachers: [],
        invitedTeachers: [],
        allTeachers: [],
        teacher: {},
        loading: false,
        error: null,
        getSchoolTeachers: async (schoolId) => {
            try {
                set({loading: true, error: null})
                const response = await api.get(`/cabinet/schools/${schoolId}/teachers`)
                const {active_teachers, invitations, teachers} = response.data
                set({
                    loading: false,
                    error: null,
                    schoolTeachers: active_teachers,
                    invitedTeacher: invitations,
                    allTeachers: teachers
                })
            } catch (error) {
                set({
                    loading: false,
                    error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key])
                })
            }
        },
        createTeacher: async (schoolId, fullName, email) => {
            try {
                set({loading: true, error: null})
                const response = await api.post(`/cabinet/schools/${schoolId}/teachers/store`, {
                    'full_name': fullName,
                    email
                })
                console.log(response)
                set({loading: false, error: null})
            } catch (error) {
                set({
                    loading: false,
                    error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key])
                })
            }
        },
    }), {name: 'teachers-storage'})
)

export default useTeachersStore
