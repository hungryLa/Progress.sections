import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../middlewares/auth.middleware";

export const useReservationStore = create(
    persist(
        (set, get) => ({
            loading: false,
            errors: [],
            message: "",
            url: "",
            message: "",

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
                    set({ loading: true, message: "" });
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
                    set({ loading: false});
                } catch (error) {
                    console.log(error);
                    set({ loading: false });
                }
            },
            addReservationByCard: async (
                sectionTimetableId,
                date,
                time,
                price
            ) => {
                try {
                    set({loading: true})
                    const response = await api.post(
                        `/cabinet/reservations/storePayment`,
                        {
                           'timetableSection': sectionTimetableId,
                            date,
                            time,
                            price,
                        }
                    );
                    console.log(response)
                    window.location.replace(response.data.url);
                    set({loading: false, url: response?.data?.url})
                } catch (error) {
                    set({ loading: true, message: "" });
                }
            },
        }),
        { name: "reservations-storage" }
    )
);

export default useReservationStore;
