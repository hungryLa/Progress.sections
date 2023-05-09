import './Sidebar.scss';
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import useAuthStore from '../../store/useAuthStore';


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
            path: '/users'
        },
        {
            title: 'Создать пользователя',
            path: '/users/new'
        },
        {
            title: 'Список секций',
            path: '/sections'
        },
        {
            title: 'Комиссия',
            path: '/commission'
        },
        {
            title: 'Выписки',
            path: '/extracts'
        },
        {
            title: 'Настройки',
            path: '/settings'
        }
    ],
}

export const Sidebar = () => {
    const user = useAuthStore((state) => state.user)
    const navigate = useNavigate()

    const logoutHandler = async () => {
        await useAuthStore.reset()
        await localStorage.removeItem('token')
        await navigate('/')
    }

    

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
