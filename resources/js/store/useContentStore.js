import {create} from "zustand";
import {persist} from "zustand/middleware";

const useContentStore = create(
    persist(
        (set, get) => ({
            pageTitle: 'Личный кабинет',
            pageImage: null,
            setTitle: (title) => {
                set({pageTitle: title})
            },
            clearTitle: () => {
                set({pageTitle: 'Личный кабинет'})
            },
            setImage: (image) => {
                set({pageImage: image})
            },
            clearImage: () => {
                set({pageImage: null})
            }
        }),
        {name: 'content-storage'}
    )
)

export default useContentStore


