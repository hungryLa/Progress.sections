import React, {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import {UnauthorizedLayout} from "./pages/layouts/UnauthorizedLayout";
import {MainPage} from "./pages/Main.page";
import {AuthorizedLayout} from "./pages/layouts/AuthorizedLayout";
import { Users } from "./pages/Admin/Users";
import useAuthStore from "./store/useAuthStore";

const AdminRoute = ({children}) => {
    const user = useAuthStore(state => state.user)
    let location = useLocation()

    if(user.role !== 'admin') {
        return <Navigate to={'/'} state={{from: location}} />
    }

    return children
}

export const App = () => {
    const user = useAuthStore((state) => state.user)

    useEffect(() => {
        // console.log(user)
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<UnauthorizedLayout/>}>
                    <Route path={'/'} element={<MainPage/>}/>
                </Route>

                
                <Route path="/users" element={<AuthorizedLayout><Users /></AuthorizedLayout>} /> 

                {/* <Route element={<AuthorizedLayout/>}>
                    <Route path={'users'} element={<Users />}/>
                    <Route path={'users/new'} element={<h1>Создать пользователя</h1>}/>
                    <Route path={'sections'} element={<h1>Список секций</h1>}/>
                    <Route path={'commission'} element={<h1>Комиссия</h1>}/>
                    <Route path={'extracts'} element={<h1>Выписки</h1>}/>
                    <Route path={'settings'} element={<h1>Настройки</h1>}/>
                </Route>


                <Route element={<AuthorizedLayout/>}>
                    <Route path={'/sections'} element={<h1>Список секций</h1>}/>
                    <Route path={'/sections/new'} element={<h1>Создать секцию</h1>}/>
                    <Route path={'/lessons'} element={<h1>Виды занятий</h1>}/>
                    <Route path={'/teachers'} element={<h1>Преподаватели</h1>}/>
                    <Route path={'/schedules'} element={<h1>Расписания</h1>}/>
                    <Route path={'/settings'} element={<h1>Настройки</h1>}/>
                    <Route path={'/extracts'} element={<h1>Выписки</h1>}/>
                </Route> */}


                {/* {user && user.role === 'user' && (
                    <Route element={<AuthorizedLayout/>}>
                        <Route/>
                    </Route>
                )} */}
                {/* <Route path={'*'} element={<Navigate to={'/'}/>}/> */}
            </Routes>
        </BrowserRouter>
    )
}
