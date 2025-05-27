export const validatePhone = (phone) => {
    // Teléfono debe tener exactamente 8 dígitos
    const regex = /^\d{8}$/;
    return regex.test(phone);
}

export const validatePhoneMessage = 'El teléfono debe tener 8 dígitos'
