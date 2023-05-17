export const translateWeekDay = (day) => {
    switch (day) {
        case 'Monday':
            return 'Понедельник'
        case 'Tuesday':
            return 'Вторник'
        case 'Wednesday':
            return 'Среда'
        case 'Thursday':
            return 'Четверг'
        case 'Friday':
            return 'Пятница'
        case 'Saturday':
            return 'Суббота'
        case 'Sunday':
            return 'Воскресенье'
        default:
            break
    }
}
