import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useSectionsStore = create(
    persist((set, get) => ({
        sections: [],
        section: {},
        images: [],
        loading: false,
        error: [],
        occupationError: '',
        descriptionError: '',
        contentsError: '',
        teacherSections: [],
        getSections: async (schoolId) => {
            try {
                set({loading: true, error: [], occupationError: '', descriptionError: '', contentsError: ''})
                const sectionsResponse = await api.get(`cabinet/schools/${schoolId}/sections`)
                const {data} = sectionsResponse.data
                set({
                    loading: false,
                    sections: [...data],
                    error: [],
                    occupationError: '',
                    descriptionError: '',
                    contentsError: ''
                })
            } catch (error) {
                set({loading: false, error})
            }
        },

        getSection: async (sectionId) => {
            try {
                set({loading: true, error: [], occupationError: '', descriptionError: '', contentsError: ''})
                const response = await api.get(`cabinet/schools/${schoolId}/sections/${sectionId}`)
                const {data} = response.data
                set({
                    loading: false,
                    section: data,
                    error: [],
                    occupationError: '',
                    descriptionError: '',
                    contentsError: ''
                })
            } catch (error) {
                set({error, loading: false})
            }
        },

        getOneSection: async (schoolId, sectionId) => {
            try {
                set({loading: true, error: [], occupationError: '', descriptionError: '', contentsError: ''})
                const response = await api.get(`cabinet/schools/${schoolId}/sections/${sectionId}`)
                const {data} = response.data
                set({
                    loading: false,
                    section: data,
                    error: [],
                    occupationError: '',
                    descriptionError: '',
                    contentsError: ''
                })
            } catch (error) {
                set({error, loading: false})
            }
        },
        deleteImages: async (sectionId, checkbox) => {
            try {
                set({loading: true, error: [], occupationError: '', descriptionError: '', contentsError: ''})
                await api.delete(`/cabinet/files/deleteImagesThroughCheckBox?checkbox=${checkbox}`)
                set({loading: false, error: [], occupationError: '', descriptionError: '', contentsError: ''})
            } catch (error) {
                set({loading: false, error})
            }
        },
        addImage: async (schoolId, sectionId, images) => {
            try {
                set({loading: true, error: [], occupationError: '', descriptionError: '', contentsError: ''})
                const formData = new FormData();
                for (let i = 0; i < images.length; i++) {
                    formData.append(`files[${i}]`, images[i]);
                }
                const response = await api.post(`/cabinet/files/storeImages/section/${sectionId}/images`, formData)
                await get().getOneSection(schoolId, sectionId)
                set({loading: false, error: [], occupationError: '', descriptionError: '', contentsError: ''})
            } catch (error) {
                set({loading: false, error})
            }
        },
        addSection: async (schoolId, occupation, description, contents, images) => {
            try {
                set({loading: true, error: [], occupationError: '', descriptionError: '', contentsError: ''})
                const formData = new FormData();
                formData.append('school_id', schoolId);
                formData.append('occupation_id', occupation);
                formData.append('description', description);
                formData.append('contents', contents);
                for (let i = 0; i < images.length; i++) {
                    formData.append(`files[${i}]`, images[i]);
                }
                await api.post(`cabinet/schools/${schoolId}/sections/store`, formData)
                set({loading: false, occupationError: '', descriptionError: '', contentsError: ''})
            } catch (error) {
                if (error?.response?.data?.errors) {
                    set({
                        loading: false,
                        error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key]),
                        occupationError: error.response.data.errors.occupation,
                        descriptionError: error.response.data.errors.description,
                        contentsError: error.response.data.errors.contents
                    })
                }
            }
        },
        editSection: async (schoolId, sectionId, occupation, description, contents) => {
            try {
                set({loading: true, occupationError: '', descriptionError: '', contentsError: ''})
                await api.put(`cabinet/schools/${schoolId}/sections/${sectionId}/update`, {
                    section_id: sectionId,
                    occupation_id: occupation,
                    description,
                    contents
                })
                await get().getOneSection(schoolId, sectionId)
                set({loading: false, occupationError: '', descriptionError: '', contentsError: ''})
            } catch (error) {
                if (error?.response?.data?.errors) {
                    set({
                        loading: false,
                        error: Object.keys(error.response.data.errors).map((key, value) => error.response.data.errors[key]),
                        occupationError: error.response.data.errors.occupation,
                        descriptionError: error.response.data.errors.description,
                        contentsError: error.response.data.errors.contents
                    })
                }
            }
        },
        deleteSection: async (schoolId, sectionId) => {
            try {
                set({
                    loading: true
                })
                const response = await api.delete(`/cabinet/schools/${schoolId}/sections/${sectionId}/delete`)
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
        getTeacherSections: async (teacherId) => {
            try {
                set({loading: true})
                const response = await api.get(`/cabinet/teachers/${teacherId}/getSections`)
                // console.log('teachers sections', response)
                set({loading: false, teacherSections: response?.data?.sections})
            } catch (error) {
                console.log(error)
                set({loading: false})
            }
        }
    }), {
        name: "sections-storage",
    })
);

export default useSectionsStore
