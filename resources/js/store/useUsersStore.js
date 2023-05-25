import {
    create
} from "zustand";
import api from "../middlewares/auth.middleware";
import {
    persist
} from "zustand/middleware";

const useUsersStore = create(
    persist(
        (set, get) => ({
            users: [],
            user: {},
            teacherInformation: {},
            error: [],
            loading: false,
            fullNameError: '',
            emailError: '',
            roleError: '',
            getUsers: async () => {
                try {
                    set({
                        loading: true
                    })
                    const response = await api.get('/cabinet/users/')
                    const {
                        data
                    } = await response.data
                    set({
                        loading: false,
                        users: [...data]
                    })
                } catch (error) {
                    set({
                        loading: false,
                        error
                    })
                }
            },
            getOneUser: async (userId) => {
                try {
                    set({loading: true})
                    const response = await api.get(`/cabinet/users/${userId}`)
                    set({
                        loading: false,
                        user: response?.data?.user,
                        teacherInformation: response?.data?.teacher_information
                    })
                } catch (error) {
                    set({loading: false})
                }
            },
            changeInformation: async (userId, fullName, phone, email) => {
                try {
                    set({loading: true})
                    const response = await api.put(`/cabinet/users/${userId}/change_information`, {
                        'full_name': fullName,
                        'phone_number': phone,
                        'email': email
                    })
                    await get().getOneUser(userId)
                    set({loading: false})
                } catch (error) {
                    set({loading: false})
                }
            },
            changePassword: async (userId, oldPassword, newPassword) => {
                try {
                    set({loading: true})
                    const response = await api.put(`/cabinet/users/${userId}/change_password`, {
                        'password_old': oldPassword,
                        'password_new': newPassword
                    })
                    set({loading: false})
                } catch (error) {
                    set({loading: false})
                }
            },
            createOrUpdateTeacherInformation: async (userId, occupations, teachingExperience, aboutMe) => {
                try {
                    set({loading: true})
                    const response = await api.post(`/cabinet/users/${userId}/createOrUpdateTeacherInformation`, {
                        'occupations': occupations.map(item => item.label),
                        'teaching_experience': teachingExperience,
                        'about_me': aboutMe
                    })
                    set({loading: false})
                } catch (error) {
                    set({loading: false})
                }
            },
            addTeacherImage: async (teacherId, images) => {
                try {
                    set({loading:true, error: null})
                    const formData = new FormData();
                    formData.append(`files[0]`, images[0])
                    const response = await api.post(`/cabinet/files/storeImages/teacher/${teacherId}/images`, formData)
                    set({loading: false})
                } catch (error) {
                    set({loading: true, error})
                }
            },
            deleteTeacherImage: async (checkbox) => {
              try {
                  set({loading: true, error: null})
                  await api.delete(`/cabinet/files/deleteImagesThroughCheckBox?checkbox=${checkbox}`)
                  set({loading: false})
              } catch (error) {
                  set({
                      loading: false,
                      error: Object.keys(error?.response?.data?.errors).map((key, value) => error.response.data.errors[key])
                  })
              }
            },
            addUser: async (user) => {
                set({
                    fullNameError: '',
                    emailError: '',
                    roleError: '',
                    loading: true
                })
                try {
                    await api.post('/cabinet/users/store', {
                        role: user.role,
                        full_name: user.full_name,
                        email: user.email,
                    })
                    set({
                        fullNameError: '',
                        emailError: '',
                        roleError: '',
                        loading: false
                    })
                    window.location.href = '/users'
                } catch (error) {
                    if (error.response.data.errors) {
                        set({
                            fullNameError: error.response.data.errors.full_name,
                            emailError: error.response.data.errors.email,
                            roleError: error.response.data.errors.role,
                            loading: false
                        })
                    }
                }
            },
            editUser: async (userId, user) => {
                set({
                    fullNameError: '',
                    emailError: '',
                    roleError: '',
                    loading: true
                })
                try {
                    await api.put(`/cabinet/users/${userId}/update`, {
                        role: user.role,
                        full_name: user.full_name,
                        email: user.email,
                    })
                    set({
                        fullNameError: '',
                        emailError: '',
                        roleError: '',
                        loading: false
                    })
                    window.location.href = '/users'
                } catch (error) {
                    if (error.response.data.errors) {
                        set({
                            fullNameError: error.response.data.errors.full_name,
                            emailError: error.response.data.errors.email,
                            roleError: error.response.data.errors.role,
                            loading: false
                        })
                    }
                }
            },
            deleteUser: async (id) => {
                try {
                    set({
                        loading: true
                    })
                    const response = await api.delete(`/cabinet/users/${id}/delete`)
                    await get().getUsers()
                    set({
                        loading: false
                    })
                } catch (error) {
                    set({
                        loading: false,
                        error
                    })
                }
            },
        }), {
            name: 'users-storage'
        }
    ))

export default useUsersStore
