export const validateRoomName = (name) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9]{3,50}$/;
    return regex.test(name) && name.trim().length >= 3;
}

export const validateRoomNameMessage = 'El nombre de la habitación debe tener entre 3 y 50 caracteres'
