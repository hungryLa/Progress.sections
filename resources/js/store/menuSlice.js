import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isActive: false
}

export const manuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isActive = !state.isActive
        }
    }
})

export const {toggleMenu} = manuSlice.actions
export default manuSlice.reducer
