import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../middlewares/auth.middleware";

export const useReservationStore = create(
    persist(
        (set, get) => ({
            loading: false,
            errors: [],
            reservations: [],

            addReservation: async (
                id,
                sectionTimetableId,
                clientId,
                date,
                time
            ) => {
                try {
                    set({ loading: true });
                    const response = await api.post(`/cabinet/reservations/store`, {
                        'user': id,
                        'timetableSection': sectionTimetableId,
                        'client': clientId,
                        date,
                        time
                    })
                    console.log(response)
                    set({ loading: false });
                } catch (error) {
                    console.log(error);
                    set({ loading: false });
                }
            },
        }),
        { name: "reservations-storage" }
    )
);

export default useReservationStore
