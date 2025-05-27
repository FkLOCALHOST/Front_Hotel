export const validatePrice = (price) => {
    const numPrice = Number(price);
    return !isNaN(numPrice) && numPrice > 0 && numPrice <= 999999;
}

export const validatePriceMessage = 'El precio debe ser un número mayor a 0 y menor a 999,999'
