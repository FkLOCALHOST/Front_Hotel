export const validateImages = (images) => {
    if (!images || images.length === 0) return false;
    if (images.length > 5) return false;
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    return images.every(image => {
        if (typeof image === 'string') return true; // Para imágenes existentes (URLs)
        return validTypes.includes(image.type) && image.size <= 5 * 1024 * 1024; // 5MB
    });
}

export const validateImagesMessage = 'Debe subir entre 1 y 5 imágenes válidas (JPEG, PNG, WebP) de máximo 5MB cada una'
