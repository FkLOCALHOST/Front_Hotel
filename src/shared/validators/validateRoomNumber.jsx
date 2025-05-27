export const validateRoomNumber = (number) => {
    const regex = /^[a-zA-Z0-9]{1,10}$/;
    return regex.test(number) && number.trim().length >= 1;
}

export const validateRoomNumberMessage = 'El número de habitación debe tener entre 1 y 10 caracteres alfanuméricos'
