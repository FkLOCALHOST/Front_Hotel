export const validateDescription = (description) => {
    return description && description.trim().length >= 10 && description.trim().length <= 500;
}

export const validateDescriptionMessage = 'La descripción debe tener entre 10 y 500 caracteres'
