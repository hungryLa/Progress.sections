import { create } from "zustand";
import useSectionTimetables from "./useSectionTimetables";

const useCalendarStore = create((set, get) => ({
    loading: false,
    currentSectionTimetable: {},
    getCurrentSectionTimetable: (timetableId) => {
        const sectionTimetable = useSectionTimetables
                .getState()
                .sectionTimetables.filter((item) => item?.id == timetableId)[0]
        set({
            currentSectionTimetable: sectionTimetable
        });
    },
}));
export default useCalendarStore;
