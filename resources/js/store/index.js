import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice'
import menuReducer from './menuSlice'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        menu: menuReducer,
        auth: authReducer
    }
})
