import React, {useEffect} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {UnauthorizedLayout} from "./pages/layouts/UnauthorizedLayout";
import {MainPage} from "./pages/Main.page";
import {AuthorizedLayout} from "./pages/layouts/AuthorizedLayout";
import {Timetables} from "./pages/Teacher/Timetables";
import useAuthStore from "./store/useAuthStore";
import {Users} from "./pages/Admin/Users";
import {NewUser} from "./pages/Admin/NewUser";


export const App = () => {
    const user = useAuthStore(({user}) => user)

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<UnauthorizedLayout/>}>
                    <Route path={'/'} element={<MainPage/>}/>
                </Route>

                {!localStorage.getItem('token') && <Route element={<UnauthorizedLayout/>}>
                    <Route path={'/'} element={<MainPage/>}/>
                </Route>}

                {user && user.role === 'admin' && (
                    <Route path={'/'} element={<AuthorizedLayout/>}>
                        <Route index path={'users'} element={<Users />}/>
                        <Route path={'users/new'} element={<NewUser />}/>
                        <Route path={'sections'} element={<h1>Список секций</h1>}/>
                        <Route path={'commission'} element={<h1>Комиссия</h1>}/>
                        <Route path={'extracts'} element={<h1>Выписки</h1>}/>
                        <Route path={'settings'} element={<h1>Настройки</h1>}/>
                    </Route>
                )}


                {user && user.role === 'schools_owner' && (
                    <Route path={'/'} element={<AuthorizedLayout/>}>
                        <Route path={'/sections'} element={<h1>Список секций</h1>}/>
                        <Route path={'/sections/new'} element={<h1>Создать секцию</h1>}/>
                        <Route path={'/lessons'} element={<h1>Виды занятий</h1>}/>
                        <Route path={'/teachers'} element={<h1>Преподаватели</h1>}/>
                        <Route path={'/schedules'} element={<h1>Расписания</h1>}/>
                        <Route path={'/settings'} element={<h1>Настройки</h1>}/>
                        <Route path={'/extracts'} element={<h1>Выписки</h1>}/>
                    </Route>
                )}

                {user && user.role === 'user' && (
                    <Route path={'/'} element={<AuthorizedLayout/>}>
                        <Route path={'/schedule'} element={<h1>Моё расписание</h1>}/>
                        <Route path={'/schools'} element={<h1>Школы</h1>}/>
                        <Route path={'/favorites'} element={<h1>Избранное</h1>}/>
                        <Route path={'/subscriptions'} element={<h1>Абонементы</h1>}/>
                        <Route path={'/accounts'} element={<h1>Аккаунты</h1>}/>
                        <Route path={'/settings'} element={<h1>Настройки</h1>}/>
                    </Route>
                )}

                {user && user.role === 'teacher' && (
                    <Route path={'/'} element={<AuthorizedLayout/>}>
                        <Route path={'/my-timetables'} element={<Timetables />}/>
                        <Route path={'/sections'} element={<h1>Секции</h1>}/>
                        <Route path={'/schools'} element={<h1>Школы</h1>}/>
                        <Route path={'/my-timetables'} element={<h1>Мои расписания</h1>}/>
                        <Route path={'/applications'} element={<h1>Заявки</h1>}/>
                        <Route path={'/settings'} element={<h1>Настройки</h1>}/>
                    </Route>
                )}

                <Route path={'*'} element={<Navigate to={'/'} /> }/>
            </Routes>
        </BrowserRouter>
    )
}
