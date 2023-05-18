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
                    const formData = new FormData()
                    formData.append('status', status)
                    formData.append('recruitment_open', recruitmentOpen)
                    formData.append('type', 'user')
                    formData.append('title', title)
                    formData.append('description', description)
                    formData.append('phone_number', phoneNumber)
                    formData.append('address', address);
                    for (let i = 0; i < images.length; i++) {
                        formData.append(`images[${i}]`, images[i]);
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
                    console.log(error.response.data.errors)
                    if (error.response.data.errors) {
                        set({
                            loading: false,
                            error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key]),
                            titleError: error.response.data.errors.title,
                            descriptionError: error.response.data.errors.description,
                            phoneError: error.response.data.errors.phone_number,
                            addressError: error.response.data.errors.address,
                            imagesError: Object.keys(error.response.data.errors).some(key => /^image\w*/.test(key))
                        })
                    }
                }
            }
        }),
        {name: 'schools-storage'}
    )
)

export default useSchoolsStore
