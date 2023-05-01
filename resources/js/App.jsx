import React, {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {UnauthorizedLayout} from "./pages/layouts/UnauthorizedLayout";
import {MainPage} from "./pages/Main.page";
import {AuthorizedLayout} from "./pages/layouts/AuthorizedLayout";
import {useSelector} from "react-redux";


export const App = () => {
    const user = useSelector((state) => state.auth.user)

    useEffect(() => {
        // console.log(user)
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<UnauthorizedLayout/>}>
                    <Route path={'/'} element={<MainPage/>}/>
                </Route>


                <Route path={'/admin'} element={<AuthorizedLayout/>}>
                    <Route index path={'users'} element={<h1>Список пользователей</h1>}/>
                    <Route path={'users/new'} element={<h1>Создать пользователя</h1>}/>
                    <Route path={'sections'} element={<h1>Список секций</h1>}/>
                    <Route path={'commission'} element={<h1>Комиссия</h1>}/>
                    <Route path={'extracts'} element={<h1>Выписки</h1>}/>
                    <Route path={'settings'} element={<h1>Настройки</h1>}/>
                </Route>


                <Route element={<AuthorizedLayout/>}>
                    <Route path={'/school_owner/sections'} element={<h1>Список секций</h1>}/>
                    <Route path={'/school_owner/sections/new'} element={<h1>Создать секцию</h1>}/>
                    <Route path={'/school_owner/lessons'} element={<h1>Виды занятий</h1>}/>
                    <Route path={'/school_owner/teachers'} element={<h1>Преподаватели</h1>}/>
                    <Route path={'/school_owner/schedules'} element={<h1>Расписания</h1>}/>
                    <Route path={'/school_owner/settings'} element={<h1>Настройки</h1>}/>
                    <Route path={'/school_owner/extracts'} element={<h1>Выписки</h1>}/>
                </Route>


                {user && user.role === 'user' && (
                    <Route element={<AuthorizedLayout/>}>
                        <Route/>
                    </Route>
                )}
                {/*<Route path={'*'} element={<Navigate to={'/'}/>}/>*/}
            </Routes>
        </BrowserRouter>
    )
}
