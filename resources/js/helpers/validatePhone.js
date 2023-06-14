export const validatePhone = phone => {
    return String(phone)
        .toLowerCase()
        .match(/(\+|)[0-9]+(-|)[0-9]{3}(-|)[0-9]{3}(-|)[0-9]{2}(-|)[0-9]{2}/)
}
