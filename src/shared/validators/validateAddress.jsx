export const validateAddress = (address) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9#,.-]{5,100}$/;
    return regex.test(address) && address.trim().length >= 5;
}

export const validateAddressMessage = 'La dirección debe tener entre 5 y 100 caracteres'
