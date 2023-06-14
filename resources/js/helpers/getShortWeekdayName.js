import {translateWeekDay} from "./translateWeekDay";

export const getShortWeekdayName = (day) => {
    const fullWeekdayName = translateWeekDay(day)
    switch (fullWeekdayName) {
        case 'Понедельник':
            return 'Пн.'
        case 'Вторник':
            return 'Вт.'
        case 'Среда':
            return 'Ср.'
        case 'Четверг':
            return 'Чт.'
        case 'Пятница':
            return 'Пт.'
        case 'Суббота':
            return 'Сб.'
        case 'Воскресенье':
            return 'Вс'
        default:
            break
    }
}
