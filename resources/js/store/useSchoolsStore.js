import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";
import useSchoolTypesStore from "./useSchoolTypesStore";

const useSchoolsStore = create(
    persist(
        (set, get) => ({
            schools: [],
            school: {},
            loading: false,
            error: null,
            titleError: '',
            descriptionError: '',
            phoneError: '',
            addressError: '',
            imagesError: '',
            getSchools: async () => {
                try {
                    set({loading: true})
                    const response = await api.get('cabinet/schools/')
                    const {school} = response.data
                    set({
                        loading: false,
                        schools: [...school]
                    })
                } catch (error) {
                    set({loading: false, error})
                }
            },
            getOneSchool: async (schoolId) => {
                try {
                    set({loading: true})
                    const response = await api.get(`cabinet/schools/${schoolId}`)
                    const {data} = response.data
                    set({loading: false, school: data})
                } catch (error) {
                    set({loading: false, error})
                }
            },
            addSchool: async (status, recruitmentOpen, title, description, phoneNumber, address, images, schoolTypes) => {
                try {
                    set({
                        loading: true,
                        titleError: '',
                        descriptionError: '',
                        phoneError: '',
                        addressError: '',
                        imagesError: '',
                        error: ''
                    })
                    console.log('images', images)
                    const formData = new FormData()
                    formData.append('status', status)
                    formData.append('recruitment_open', recruitmentOpen)
                    formData.append('type', 'user')
                    formData.append('title', title)
                    formData.append('description', description)
                    formData.append('phone_number', phoneNumber)
                    formData.append('address', address);
                    for (let i = 0; i < images.length; i++) {
                        formData.append(`files[${i}]`, images[i]);
                    }
                    schoolTypes && schoolTypes.forEach((type, index) =>
                        formData.append(`school_types[${index}]`, type)
                    )
                    await api.post(`cabinet/schools/store`, formData)
                    await get().getSchools()
                    set({
                        loading: false,
                        titleError: '',
                        descriptionError: '',
                        phoneError: '',
                        addressError: '',
                        imagesError: '',
                        error: ''
                    })
                } catch (error) {
                    if (error.response.data.errors) {
                        set({
                            loading: false,
                            error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key]),
                        })
                    }
                }
            },
            editSchool: async (schoolId, status, recruitmentOpen, title, description, address, phoneNumber, schoolTypes, images) => {
                try {
                    set({loading: true, error: false})

                    const typesToAdd = schoolTypes.filter((exist) => !get().school.school_types.some((accessible) => exist.value === accessible.id)).map(obj => obj.value);
                    const typesToDelete = get().school.school_types.filter((accessible) => !schoolTypes.some((exist) => accessible.id === exist.value))

                    await api.put(`cabinet/schools/${schoolId}/update/`, {
                        'status': status,
                        'recruitment_open': recruitmentOpen,
                        'type': 'user',
                        'title': title,
                        'description': description,
                        'phone_number': phoneNumber,
                        'address': address,
                        'school_types_to_delete': typesToDelete,
                        'school_types_to_add': typesToAdd,
                    })
                    set({loading: false, error: ''})
                    await get().getOneSchool(schoolId)
                } catch (error) {
                    if (error?.response?.data?.errors) {
                        set({
                            loading: false,
                            error: Object.keys(error?.response?.data?.errors).map((key, value) => error.response.data.errors[key])
                        })
                    } else set({loading: false})
                }
            },
            deleteSchool: async (schoolId, schoolTitle) => {
                try {
                    set({
                        loading: true,
                        error: ''
                    })
                    await api.delete(`/cabinet/schools/${schoolId}/delete?school_title=${schoolTitle}`)
                    set({
                        loading: false,
                        error: ''
                    })
                } catch (error) {
                    if (error?.response?.data?.errors) {
                        set({
                            loading: false,
                            error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key])
                        })
                    }
                }
            },
            addImages: async (schoolId, images) => {
                try {
                    set({loading: true})
                    const formData = new FormData();
                    for (let i = 0; i < images.length; i++) {
                        formData.append(`files[${i}]`, images[i]);
                    }
                    const response = await api.post(`/cabinet/files/storeImages/school/${schoolId}/images`, formData)
                    set({loading: false})
                } catch (error) {
                    set({loading: false, error})
                }
            },
            deleteImages: async (checkbox) => {
                try {
                    set({
                        loading: true,
                        error: ''
                    })
                    await api.delete(`/cabinet/files/deleteImagesThroughCheckBox?checkbox=${checkbox}`)
                    set({
                        loading: false,
                        error: ''
                    })
                } catch (error) {
                    if (error.response.data.errors) {
                        set({
                            loading: false,
                            error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key])
                        })
                    }
                }
            }
        }),
        {name: 'schools-storage'}
    )
)

export default useSchoolsStore
