import request from '../api-config'


async function login(username = '', password = '') {
    try {
        const res = await request.post('/auth/login', {
            username: username,
            password: password
        })
        return res.data
    } catch (error) {
        throw new Error(error)
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
    const token = JSON.parse(localStorage.getItem('token'))
    try {
        const res = await request.post('/auth/refresh', {
            refreshToken: token.refreshToken
        })
        localStorage.setItem('token', JSON.stringify(res.data))
    } catch (error) {
        throw new Error(error)
    }
}

export {
    login,
    fetchUserData,
    reGetToken
}