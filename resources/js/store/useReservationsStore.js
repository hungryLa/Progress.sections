import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

export const useReservationStore = create(
    persist(
        (set, get) => ({
            loading: false,
            errors: [],
            reservations: [],
            message: '',

            addReservation: async (
                id,
                sectionTimetableId,
                clientId,
                date,
                time,
                paymentType,
                price
            ) => {
                try {
                    set({loading: true, message: ''});
                    const response = await api.post(`/cabinet/reservations/store`, {
                        'user': id,
                        'timetableSection': sectionTimetableId,
                        'client': clientId,
                        date,
                        time,
                        'payment_type': paymentType,
                        price
                    })
                    if(response.data.message) {
                        set({message: response.data.message})
                    }
                    set({loading: false});
                } catch (error) {
                    console.log(error);
                    set({loading: false});
                }
            },
        }),
        {name: "reservations-storage"}
    )
);

export default useReservationStore
