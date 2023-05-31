import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

const useCommunicationsStore = create(
    persist(
        (set, get) => ({
            communications: [],
            mySchools: [],
            loading: false,
            error: '',
            getTeacherCommunications: async () => {
                try {
                    set({loading: true})
                    const response = await api.get('/cabinet/communications/invitations')
                    const {data} = response
                    console.log(data);
                    set({
                        loading: false,
                        mySchools: data?.teacher?.schools,
                        communications: data?.communications
                    })
                    console.log(get().mySchools);
                } catch (error) {
                    console.log(error);
                    set({loading: false})
                }
            }
        }), {name: 'communication-storage'}
    )
)

export default useCommunicationsStore
