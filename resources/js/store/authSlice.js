import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem('token')
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem('token', action.payload)
        },
        clearUser: (state) => {
            state.user = null
        },
        clearToken: (state) => {
            state.token = null
            localStorage.removeItem('token')
        },
    }
})

export const {setUser, setToken, clearUser, clearToken} = authSlice.actions
export default authSlice.reducer
