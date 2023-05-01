import React, {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {UnauthorizedLayout} from "./pages/layouts/UnauthorizedLayout";
import {MainPage} from "./pages/Main.page";
import {AboutPage} from "./pages/About.page";
import {ContactsPage} from "./pages/Contacts.page";
import {AuthorizedLayout} from "./pages/layouts/AuthorizedLayout";
import {useSelector} from "react-redux";


export const App = () => {
    const userType = useSelector((state) => state.user.type)

    useEffect(() => {
        console.log(userType)
    })

    return (
        <BrowserRouter>
            {/* Неавторизованный пользователь  */}
            {userType === 'Guest' && (
                <Routes>
                    <Route path={'/'} element={<UnauthorizedLayout />}>
                        <Route path={'/'} element={<MainPage />} />
                        <Route path={'*'} element={<Navigate to={'/'} />} />
                    </Route>
                </Routes>
            )}

            {/* Главный администратор */}
            {userType === 'Admin' && (
                <Routes>
                    <Route path={'/'} element={<AuthorizedLayout />}>
                        <Route path={'users'} element={<h1>Список пользователей</h1>} />
                        <Route path={'users/new'} element={<h1>Создать пользователя</h1>} />
                        <Route path={'sections'} element={<h1>Список секций</h1>} />
                        <Route path={'commission'} element={<h1>Комиссия</h1>} />
                        <Route path={'extracts'} element={<h1>Выписки</h1>} />
                        <Route path={'settings'} element={<h1>Настройки</h1>} />
                        <Route path={'logout'} element={<h1>Выйти</h1>} />
                        <Route path={'*'} element={<Navigate to={'/'} />} />
                    </Route>
                </Routes>
            )}

            {/* Администратор секции */}
            {userType === 'SectionAdmin' && (
                <Routes>
                    <Route path={'/'} element={<AuthorizedLayout />}>
                        <Route path={'sections'} element={<h1>Список секций</h1>} />
                        <Route path={'sections/new'} element={<h1>Создать секцию</h1>} />
                        <Route path={'lessons'} element={<h1>Виды занятий</h1>} />
                        <Route path={'teachers'} element={<h1>Преподаватели</h1>} />
                        <Route path={'schedules'} element={<h1>Расписания</h1>} />
                        <Route path={'settings'} element={<h1>Настройки</h1>} />
                        <Route path={'extracts'} element={<h1>Выписки</h1>} />
                        <Route path={'logout'} element={<h1>Выйти</h1>} />
                        <Route path={'*'} element={<Navigate to={'/'} />} />
                    </Route>
                </Routes>
            )}

            {/* Пользователь */}
            {userType === 'User' && (
                <Routes>
                    <Route path={'/'} element={<AuthorizedLayout />}>
                        <Route />
                    </Route>
                </Routes>
            )}
        </BrowserRouter>
    )
}
