import {createSelector, createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    error: null
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
        setError: (state, action) => {
          state.error = action.payload
        },
        clearUser: (state) => {
            state.user = null
        },
        clearToken: (state) => {
            state.token = null
            localStorage.removeItem('token')
        },
        clearError: (state) => {
            state.error = null
        },
        logout: (state) => {
            clearUser(state)
            clearToken(state)
            clearError(state)
        }
    }
})


export const {
    setUser,
    setToken,
    setError,
    clearUser,
    clearToken,
    clearError,
    logout
} = authSlice.actions
export default authSlice.reducer
