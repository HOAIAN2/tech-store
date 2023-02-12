import request from '../api-config'

const LOGIN_MESSAGAE = {
    "missing data": "Vui lòng gửi đủ dữ liệu",
    "cannot find username": "Không tìm thấy tên người dùng",
    "incorrect password": "Sai mật khẩu"
}
const REGISTER_MESSAGE = {
    "missing data": "Vui lòng gửi đủ dữ liệu",
    "invalid username or email": "Tên đăng nhập hoặc email không hợp lệ",
    "username exists": "Tên đăng nhập đã tồn tại",
    "password must have atleast 8 characters": "Mật khẩu phải có ít nhất 8 ký tự",
    "error": "Server tạm thời không thể xử lý yêu cầu"
}
const CHANGE_PASSWORD_MESSAGE = {
    "missing data": "Vui lòng gửi đủ dữ liệu",
    "invalid token": "Token không hợp lệ",
    "cannot find username": "Không tìm thấy tên người dùng",
    "you are using the same password": "Mật khẩu không được trùng với mật khẩu cũ",
    "incorrect password": "Sai mật khẩu",
    "password must have atleast 8 characters": "Mật khẩu phải có ít nhất 8 ký tự",
    "error": "Server tạm thời không thể xử lý yêu cầu"
}
const LOGOUT_MESSAGE = {
    "success": "Thành công",
    "can not logout": "Có lỗi trong quá trình xử lý"
}
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
        throw new Error(LOGIN_MESSAGAE[message])
    }
}
async function logout() {
    try {
        const refreshToken = JSON.parse(localStorage.getItem('token')).refreshToken
        const res = await request.post('/auth/logout', {
            refreshToken: refreshToken
        })
        return res.data
    } catch (error) {
        if (!error.response) throw new Error(error.message)
        const message = error.response.data.message
        throw new Error(LOGOUT_MESSAGE[message])
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
        throw new Error(REGISTER_MESSAGE[message])
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
        if (!error.response) throw new Error(error.message)
        const message = error.response.data.message
        throw new Error(CHANGE_PASSWORD_MESSAGE[message])
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
    logout,
    changePassword,
    register,
    fetchUserData,
    reGetToken
}