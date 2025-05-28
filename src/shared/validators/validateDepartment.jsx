export const validateDepartment = (department) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,30}$/;
    return regex.test(department) && department.trim().length >= 3;
}

export const validateDepartmentMessage = 'El departamento debe tener entre 3 y 30 letras'
