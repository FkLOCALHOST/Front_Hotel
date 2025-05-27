export const validateCategory = (category) => {
    const validCategories = ["1 STARS", "2 STARS", "3 STARS", "4 STARS", "5 STARS"];
    return validCategories.includes(category);
}

export const validateCategoryMessage = 'Debe seleccionar una categoría válida'
