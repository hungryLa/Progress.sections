import {create} from "zustand";

const useMenuStore = create((set) => ({
    isMenuActive: false,
    toggleIsMenuActive: () => set(state => ({isMenuActive: !state.isMenuActive})),
    closeMenu: () => set({isMenuActive: false})
}))

export default useMenuStore
