export const logout = () => {
    localStorage.removeItem('User')

    window.location.href = '/'
}

export default logout