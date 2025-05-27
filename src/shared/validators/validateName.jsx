export const validateName = (name) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,25}$/;
    return regex.test(name);
}

export const validateNameMessage = 'El nombre debe tener entre 3 y 25 letras'
