import { create } from "zustand";

const useMenuStore = create((set) => ({
    menuActive: false,
    toggleMenu: () => {
        set((state) => {menuActive: !state.menuActive})
    }
}))

export default useMenuStore