import request from '../api-config'


async function login(username = '', password = '') {
    try {
        const res = await request.post('/auth/login', {
            username: username,
            password: password
        })
        return res.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}
async function register(data = {}) {
    try {
        const res = await request.post('/auth/register', {
            username: data.username,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            sex: data.sex,
            address: data.address,
            email: data.email,
            phoneNumber: data.phoneNumber
        })
        return res.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}
async function changePassword(username = '', oldPassword = '', newPassword) {
    try {
        const refreshToken = JSON.parse(localStorage.getItem('token')).refreshToken
        const res = await request.post('/auth/change-password', {
            username: username,
            oldPassword: oldPassword,
            newPassword: newPassword,
            refreshToken: refreshToken
        })
        return res.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}
async function fetchUserData() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) throw new Error('no token')
    try {
        const res = await request.get('/user', {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}
async function reGetToken() {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        const res = await request.post('/auth/refresh', {
            refreshToken: token.refreshToken
        })
        localStorage.setItem('token', JSON.stringify(res.data))
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export {
    login,
    changePassword,
    register,
    fetchUserData,
    reGetToken
}