import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    type: 'Guest'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeToAdmin: (state) => {
            state.type = 'Admin'
        },
        changeToSectionAdmin: (state) => {
            state.type = 'SectionAdmin'
        },
        changeToUser: (state) => {
            state.type = 'User'
        },
        changeToGuest: (state) => {
            state.type = 'Guest'
        }
    }
})

export const {
    changeToAdmin,
    changeToSectionAdmin,
    changeToUser,
    changeToGuest
} = userSlice.actions
export default userSlice.reducer
