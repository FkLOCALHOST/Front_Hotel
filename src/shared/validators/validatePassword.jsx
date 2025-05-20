export const validatecontrasenaT = (contrasenaT) => {
    if (!/^\S{8,12}$/.test(contrasenaT)) return false;
    if (!/[A-Z]/.test(contrasenaT)) return false;
    if (!/[a-z]/.test(contrasenaT)) return false;
    // Al menos un número
    if (!/\d/.test(contrasenaT)) return false;
    // Al menos un carácter especial
    if (!/[@$!%*?&]/.test(contrasenaT)) return false;
    return true;
}

export const validatecontrasenaTMessage = 'La contraseña debe tener entre 8 y 12 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'

