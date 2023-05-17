import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useSchoolsStore = create(
    persist(
        (set, get) => ({
            schools: [],
            school: {},
            loading: false,
            error: null,
            statusError: '',
            recruitmentError: '',
            typeError: '',
            titleError: '',
            descriptionError: '',
            phoneError: '',
            addressError: '',
            getSchools: async () => {
                try {
                    set({loading: true})
                    const response = await api.get('cabinet/schools/')
                    const {school} = response.data
                    set({
                        loading: false,
                        schools: [...school]
                    })
                    console.log(get().schools)
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
            addSchool: async (status, recruitmentOpen, type, title, description, phoneNumber, address, images, schoolTypes) => {
                try {
                    set({
                        loading: true,
                        statusError: '',
                        recruitmentError: '',
                        typeError: '',
                        titleError: '',
                        descriptionError: '',
                        phoneError: '',
                        addressError: ''
                    })
                    const formData = new FormData()
                    formData.append('status', status)
                    formData.append('recruitment_open', recruitmentOpen)
                    formData.append('type', type)
                    formData.append('title', title)
                    formData.append('description', description)
                    formData.append('phone_number', phoneNumber)
                    formData.append('address', address);
                    images && images.forEach((image, index) => {
                        formData.append(`images[${index}]`, image)
                    })
                    schoolTypes && schoolTypes.forEach((type, index) =>
                        formData.append(`school_types[${index}]`, type)
                    )

                    await api.post(`cabinet/schools/store`, formData)
                    await get().getSchools()
                    set({
                        loading: false,
                        statusError: '',
                        recruitmentError: '',
                        typeError: '',
                        titleError: '',
                        descriptionError: '',
                        phoneError: '',
                        addressError: ''
                    })
                } catch (error) {
                    if(error.response.data.errors) {
                        set({
                            loading: false,
                            statusError: '',
                            recruitmentError: '',
                            typeError: '',
                            titleError: '',
                            descriptionError: '',
                            phoneError: '',
                            addressError: ''
                        })
                    }
                }
            }
        }),
        {name: 'schools-storage'}
    )
)

export default useSchoolsStore
