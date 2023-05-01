import './Sidebar.scss';
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/authSlice";
import {useEffect} from "react";
import {persistor} from "../../store";


const navigationLinks = {
    sectionAdmin: [
        {
            title: 'Список секций',
            path: '/school_owner/sections'
        },
        {
            title: 'Создать секцию',
            path: '/school_owner/sections/new'
        },
        {
            title: 'Виды занятий',
            path: '/school_owner/lessons'
        },
        {
            title: 'Преподаватели',
            path: '/school_owner/teachers'
        },
        {
            title: 'Расписания',
            path: '/school_owner/schedules'
        },
        {
            title: 'Настройки',
            path: '/school_owner/settings'
        },
        {
            title: 'Выписки',
            path: '/school_owner/extracts'
        }
    ],
    mainAdmin: [
        {
            title: 'Список пользователей',
            path: '/admin/users'
        },
        {
            title: 'Создать пользователя',
            path: '/admin/users/new'
        },
        {
            title: 'Список секций',
            path: '/admin/sections'
        },
        {
            title: 'Комиссия',
            path: '/admin/commission'
        },
        {
            title: 'Выписки',
            path: '/admin/extracts'
        },
        {
            title: 'Настройки',
            path: '/admin/settings'
        }
    ],
}

export const Sidebar = () => {
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        await dispatch(logout())
        await persistor.purge();
        await navigate('/')
    }

    // useEffect(() => {
    //     console.log(user)
    // })

    return (
        <aside className={'sidebar'}>
            <nav>
                <ul>
                    {user && user.role === 'admin' && navigationLinks.mainAdmin.map(link => (
                            <li key={link.title}>
                                <NavLink to={link.path}>{link.title}</NavLink>
                            </li>
                        )
                    )}
                    {user && user.role === 'school_owner' && navigationLinks.sectionAdmin.map(link => (
                            <li key={link.title}>
                                <NavLink to={link.path}>{link.title}</NavLink>
                            </li>
                        )
                    )}
                    <li><button onClick={() => logoutHandler()}><Navigate to={'/'} replace /></button></li>
                </ul>
            </nav>
        </aside>
    )
}
