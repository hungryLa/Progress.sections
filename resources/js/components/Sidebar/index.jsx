import './Sidebar.scss';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/authSlice";
import {useEffect} from "react";
import {persistor} from "../../store";


const navigationLinks = {
    sectionAdmin: [
        {
            title: 'Список секций',
            path: '/sections'
        },
        {
            title: 'Создать секцию',
            path: '/sections/new'
        },
        {
            title: 'Виды занятий',
            path: '/lessons'
        },
        {
            title: 'Преподаватели',
            path: '/teachers'
        },
        {
            title: 'Расписания',
            path: '/schedules'
        },
        {
            title: 'Настройки',
            path: '/settings'
        },
        {
            title: 'Выписки',
            path: '/extracts'
        }
    ],
    mainAdmin: [
        {
            title: 'Список пользователей',
            path: 'users'
        },
        {
            title: 'Создать пользователя',
            path: 'users/new'
        },
        {
            title: 'Список секций',
            path: 'sections'
        },
        {
            title: 'Комиссия',
            path: 'commission'
        },
        {
            title: 'Выписки',
            path: 'extracts'
        },
        {
            title: 'Настройки',
            path: 'settings'
        }
    ],
    user: [
        {
            title: 'Мое расписание',
            path: 'schedule'
        },
        {
            title: 'Список секций',
            path: 'sections'
        },
        {
            title: 'Аккаунты',
            path: 'accounts'
        },
        {
            title: 'Выписки',
            path: 'extracts'
        },
        {
            title: 'Настройки',
            path: 'settings'
        }],
    teacher: [
        {
            title: 'Мое расписание',
            path: 'schedule'
        },
        {
            title: 'Настройки',
            path: 'settings'
        }]
}

export const Sidebar = () => {
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        await dispatch(logout())
        await persistor.purge();
        await navigate('/', {replace: true})
    }

    useEffect(() => {
        console.log(user)
    })

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
                    {user && user.role === 'schools_owner' && navigationLinks.sectionAdmin.map(link => (
                            <li key={link.title}>
                                <NavLink to={link.path}>{link.title}</NavLink>
                            </li>
                        )
                    )}
                    {user && user.role === 'user' && navigationLinks.user.map(link => (
                            <li key={link.title}>
                                <NavLink to={link.path}>{link.title}</NavLink>
                            </li>
                        )
                    )}
                    {user && user.role === 'teacher' && navigationLinks.teacher.map(link => (
                            <li key={link.title}>
                                <NavLink to={link.path}>{link.title}</NavLink>
                            </li>
                        )
                    )}
                    <li>
                        <button onClick={() => logoutHandler()}>Выйти</button>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
