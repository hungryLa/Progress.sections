import {create} from "zustand";
import {persist} from "zustand/middleware";
import api from "../middlewares/auth.middleware";

export const useReservationStore = create(
    persist(
        (set, get) => ({
            loading: false,
            errors: [],
            message: "",
            url: "",
            userId: null,
            sectionTimetableId: null,
            clientId: null,
            date: null,
            time: null,

            addReservation: async (
                id,
                sectionTimetableId,
                clientId,
                date,
                time,
                paymentType,
                price
            ) => {
                set({
                    user: id,
                    sectionTimetableId: sectionTimetableId,
                    clientId: clientId,
                    date: date,
                    time: time,
                });
                console.log('store', get().userId, get().sectionTimetableId, get().clientId, get().date, get().time)
                try {
                    set({
                        loading: true,
                        message: "",
                    });
                    const response = await api.post(
                        `/cabinet/reservations/store`,
                        {
                            user: id,
                            timetableSection: sectionTimetableId,
                            client: clientId,
                            date,
                            time,
                            payment_type: paymentType,
                            price,
                        }
                    );
                    set({loading: false});
                } catch (error) {
                    console.log(error);
                    set({loading: false});
                }
            },
            addReservationByCard: async (
                id,
                clientId,
                sectionTimetableId,
                date,
                time,
                price
            ) => {
                try {
                    set({loading: true});
                    const response = await api.post(
                        `/cabinet/reservations/storePayment`,
                        {
                            'user': id,
                            'client': clientId,
                            'timetableSection': sectionTimetableId,
                            'date': date,
                            'time': time,
                            'price': price,
                        }
                    );
                    console.log(response);
                    window.location.replace(response.data.url);
                    set({loading: false, url: response?.data?.url});
                } catch (error) {
                    set({loading: true, message: ""});
                }
            },
        }),
        {name: "reservations-storage"}
    )
);

export default useReservationStore;
