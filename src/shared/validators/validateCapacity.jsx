export const validateCapacity = (capacity) => {
    const numCapacity = Number(capacity);
    return !isNaN(numCapacity) && numCapacity > 0 && numCapacity <= 20;
}

export const validateCapacityMessage = 'La capacidad debe ser un número entre 1 y 20 personas'
