import {create} from "zustand";
import {persist} from "zustand/middleware";

const useCommunicationsStore = create(
    persist(
        (set, get) => ({

        }), {name: 'communication-storage'}
    )
)

export default useCommunicationsStore
