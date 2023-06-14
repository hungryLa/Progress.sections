export const validateHEXColor = color => {
    return String(color).match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
}
