import React from "react";

export const navigationLinks = {
    sectionAdmin: [
        {
            title: 'Школы',
            path: '/schools',
            links: [
                {
                    title: 'Секции',
                    path: '/sections'
                },
                {
                    title: 'Преподаватели',
                    path: '/teachers'
                },
            ]
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
            title: 'Абонементы',
            path: 'subscriptions'
        },
        {
            title: 'Школы',
            path: 'schools'
        },
        {
            title: 'Избранное',
            path: 'favorites'
        },
        {
            title: 'Аккаунты',
            path: 'accounts'
        },
        {
            title: 'Настройки',
            path: 'settings'
        }],
    teacher: [
        {
            title: 'Секции',
            path: 'sections'
        },
        {
            title: 'Школы',
            path: 'schools'
        },
        {
            title: 'Мои расписания',
            path: 'my-timetables'
        },
        {
            title: 'Заявки',
            path: 'applications'
        },
        {
            title: 'Настройки',
            path: 'settings'
        }
    ],
    unauthorized: [
        {
            title: 'О нас',
            path: 'about'
        },
        {
            title: 'Соглашение',
            path: 'agreement'
        },
    ]
}
