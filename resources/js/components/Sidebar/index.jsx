import './Sidebar.scss';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";


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
        },
        {
            title: 'Выйти',
            path: '/logout'
        },
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
        },
        {
            title: 'Выйти',
            path: '/logout'
        },
    ],
}

export const Sidebar = () => {
    const userType = useSelector((state) => state.user.type)
    return (
        <aside className={'sidebar'}>
            <nav>
                <ul>
                    {userType === 'Admin' && navigationLinks.mainAdmin.map(link => (
                            <li key={link.title}>
                                <NavLink to={link.path}>{link.title}</NavLink>
                            </li>
                        )
                    )}
                    {userType === 'SectionAdmin' && navigationLinks.sectionAdmin.map(link => (
                            <li key={link.title}>
                                <NavLink to={link.path}>{link.title}</NavLink>
                            </li>
                        )
                    )}
                </ul>
            </nav>
        </aside>
    )
}
