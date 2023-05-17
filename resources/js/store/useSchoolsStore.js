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
            reqruitmentError: '',
            typeError: '',
            titleError: '',
            descriptionError: '',
            phoneError: '',
            addressError: '',
            getSchools: async () => {
                try {
                    set({loading: true})
                    const response = await api.get('cabinet/schools/')
                    console.log(response)
                    const {school} = response.data
                    console.log(school)
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
            addSchool: async (status, recruitmentOpen, type, title, description, phoneNumber, address, images) => {
                try {
                    set({
                        loading: true,
                        statusError: '',
                        reqruitmentError: '',
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

                    await api.post(`cabinet/schools/store`)
                } catch (error) {
                    set({loading: false, error})
                }
            }
        }),
        {name: 'schools-storage'}
    )
)

export default useSchoolsStore
