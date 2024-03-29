import request from '../api-config'

async function login(username = '', password = '') {
    try {
        const res = await request.post('/auth/login', {
            username: username,
            password: password
        })
        return res.data
    } catch (error) {
        if (!error.response) throw new Error(error.message)
        const message = error.response.data.message
        throw new Error(message)
    }
}
async function logout() {
    try {
        const refreshToken = JSON.parse(localStorage.getItem('token')).refreshToken
        await request.post('/auth/logout', {
            refreshToken: refreshToken
        })
    } catch (error) {
        if (!error.response) throw new Error(error.message)
        const message = error.response.data.message
        localStorage.removeItem('token')
        throw new Error(message)
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
        if (!error.response) throw new Error(error.message)
        const message = error.response.data.message
        throw new Error(message)
    }
}
async function changePassword(oldPassword = '', newPassword) {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        const res = await request.post('/auth/change-password', {
            oldPassword: oldPassword,
            newPassword: newPassword,
            refreshToken: token.refreshToken
        }, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        })
        return res.data
    } catch (error) {
        if (error.response.status === 403) {
            try {
                await reGetToken()
                await fetchUserData()
            } catch (error) {
                throw new Error(error)
            }
        }
        else {
            if (!error.response) throw new Error(error.message)
            const message = error.response.data.message
            throw new Error(message)
        }
    }
}

async function uploadImage(file) {
    const token = JSON.parse(localStorage.getItem('token'))
    var formData = new FormData();
    formData.append("file", file);
    try {
        await request.post('/auth/upload', formData, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        if (error.response.status === 403) {
            try {
                await reGetToken()
                await uploadImage(file)
            } catch (error) {
                throw new Error(error)
            }
        }
        else throw new Error(error)
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
        if (error.response.status === 403) {
            try {
                await reGetToken()
                await fetchUserData()
            } catch (error) {
                throw new Error(error)
            }
        }
        else throw new Error(error)
    }
}
async function editProfile(data) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) throw new Error('no token')
    try {
        await request.post('/auth/edit', data, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        })
    } catch (error) {
        if (error.response.status === 403) {
            try {
                await reGetToken()
                await editProfile(data)
            } catch (error) {
                throw new Error(error)
            }
        }
        else {
            if (!error.response) throw new Error(error.message)
            const message = error.response.data.message
            throw new Error(message)
        }
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
    logout,
    changePassword,
    register,
    fetchUserData,
    reGetToken,
    uploadImage,
    editProfile,
}