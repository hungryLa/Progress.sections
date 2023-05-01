import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import menuReducer from './menuSlice'
import authReducer from './authSlice'

const reducers = combineReducers({
    menu: menuReducer,
    auth: authReducer
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)
