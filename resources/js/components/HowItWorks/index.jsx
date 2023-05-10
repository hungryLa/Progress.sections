import { Container } from "../Container"
import { Title } from "../UI/Title"

import './HowItWorks.scss'

const howItWorksData = [
    {
        number: 1,
        title: 'Зарегистрируйтесь ',
        text: ' Простая форма авторизации не вызовет трудностей даже у начинающих пользователей. После регистрации подтвердите учетную запись по ссылке, которая придет вам на почту. '
    },
    {
        number: 2,
        title: 'Авторизуйтесь',
        text: 'Используя логин и пароль выполните вход в учетную запись.'
    },
    {
        number: 3,
        title: 'Добавьте данные вашего ребенка (детей)',
        text: 'Укажите данные, по которым кружки и секции смогут определить Вашего ребенка.'
    },
    {
        number: 4,
        title: 'Выберите необходимую секцию или кружок',
        text: 'Выбирать можно по несколько вариантов для каждого ребенка.'
    },
    {
        number: 5,
        title: 'Оплатите абонемент',
        text: 'Выполните оплату с помощью банковской карты.'
    },
    {
        number: 6,
        title: 'Следите за состоянием счета',
        text: 'Вы всегда будете иметь доступ к личному кабинету и знать, сколько средств осталось на Вашем счете.'
    },
]

export const HowItWorks = () => {
    return (
        <div className="how-it-works">
            <Container>
                <div className="how-it-works__inner">
                    <Title className='how-it-works__title'>Как это работает</Title>
                    <ul className="how-it-works__list">
                        {howItWorksData.map(item => (
                        <li key={item.number} className="how-it-works__item">
                            <span className="how-it-works__item__number">{item.number}</span>
                            <div className="how-it-works__item__body">
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </div>
    )
}