import {create} from "zustand";
import {persist} from "zustand/middleware";

const useContentStore = create(
    persist(
        (set, get) => ({
            pageTitle: 'Личный кабинет',
            pageImages: [],
            setTitle: (title) => {
                set({pageTitle: title})
            },
            clearTitle: () => {
                set({pageTitle: 'Личный кабинет'})
            },
            setImage: (images) => {
                set({pageImages: images})
            },
            clearImage: () => {
                set({pageImages: []})
            }
        }),
        {name: 'content-storage'}
    )
)

export default useContentStore


