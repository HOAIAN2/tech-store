const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const { refreshTokens, findUser, createUser, updatePassword } = require('../cache')
const errorMessage = require('./authMessage.json')

/// API routes
// [POST login]
async function login(req, res) {
    let error = errorMessage[0]
    const language = req.headers["accept-language"]
    if (language === 'vi') error = errorMessage[1]
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    const user = await findUser(data.username)
    if (!user) {
        return res.status(404).json({ message: error.au01 })
    }
    else {
        if (isCorrectPassword(data.password, user.hashedPassword)) {
            const token = createToken(user)
            refreshTokens.push(token.refreshToken)
            res.json(token)
        }
        else res.status(400).json({ message: error.au02 })
    }
}
// [POST logout]
function logout(req, res) {
    let error = errorMessage[0]
    const language = req.headers["accept-language"]
    if (language === 'vi') error = errorMessage[1]
    const refreshToken = req.body.refreshToken
    const index = refreshTokens.indexOf(refreshToken)
    if (index !== -1) {
        refreshTokens.splice(index, 1)
        res.json({ message: 'success' })
    }
    else {
        res.status(400).json({ message: error.au03 })
    }
}
// [POST changepass]
async function changePassword(req, res) {
    let error = errorMessage[0]
    const language = req.headers["accept-language"]
    if (language === 'vi') error = errorMessage[1]
    const token = req.headers['authorization'].split(' ')[1]
    const { username } = readAccessToken(token)
    const data = {
        username: username,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
        refreshToken: req.body.refreshToken
    }
    const index = refreshTokens.indexOf(data.refreshToken)
    if (index === -1) return res.status(404).json({ message: error.au03 })
    const user = await findUser(username)
    if (!user) {
        return res.status(404).json({ message: error.au01 })
    }
    if (data.oldPassword === data.newPassword) {
        return res.status(400).json({ message: error.au04 })
    }
    if (!isCorrectPassword(data.oldPassword, user.hashedPassword)) {
        return res.status(400).json({ message: error.au02 })
    }
    else {
        if (data.newPassword.length < 8) return res.status(400).json({ message: error.au05 })
        const hashedPassword = bcrypt.hashSync(data.newPassword, 10)
        try {
            await updatePassword(data.username, hashedPassword)
            user.setPassword(hashedPassword)
            refreshTokens.splice(index, 0)
            return res.json({ message: 'success' })
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            return res.status(500).json({ message: 'error' })
        }
    }
}
// [POST register]
async function register(req, res) {
    let error = errorMessage[0]
    const language = req.headers["accept-language"]
    if (language === 'vi') error = errorMessage[1]
    const data = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        sex: req.body.sex,
        address: req.body.address,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    }
    if (data.password.includes(' ')) return res.status(400).json({ message: error.au06 })
    if (!validate(data.username, data.email)) {
        return res.status(404).json({ message: error.au07 })
    }
    if (await findUser(data.username)) {
        return res.status(404).json({ message: error.au08 })
    }
    else {
        try {
            if (data.password.length < 8) return res.status(400).json({ message: error.au05 })
            const newData = fortmatData(data)
            const hashedPassword = bcrypt.hashSync(data.password, 10)
            const formatedBirthDate = formatDate(data.birthDate)
            await createUser({
                username: newData.username,
                firstName: newData.firstName,
                lastName: newData.lastName,
                birthDate: formatedBirthDate,
                sex: newData.sex,
                address: newData.address,
                email: newData.email,
                phoneNumber: newData.phoneNumber,
                hashedPassword: hashedPassword
            })
            const user = await findUser(data.username)
            const token = createToken(user)
            refreshTokens.push(token.refreshToken)
            return res.json(token)
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            return res.status(500).json({ message: 'error' })
        }
    }
}
/// Middlewares, etc...
function fortmatData(data = {}) {
    const newData = { ...data }
    for (const prop in newData) {
        if (newData[prop].trim().length === 0) {
            newData[prop] = undefined
        }
        else {
            newData[prop] = newData[prop].trim()
        }
    }
    return newData
}
function formatDate(date) {
    const formatedDate = new Date(date)
    return formatedDate.toISOString().split('T')[0]
}
function validate(username, email) {
    if (!username) return
    const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email) {
        if (username.match(usernameRegex) && email.match(emailRegex)) return true
    }
    else {
        if (username.match(usernameRegex)) return true
    }
    return false
}
function createToken(user) {
    const token = {
        accessToken: '',
        refreshToken: ''
    }
    function signAccessToken(user) {
        const token = jwt.sign(JSON.stringify({
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            id: user.userID,
            username: user.username
        }), process.env['ACCESS_TOKEN_SECRET'])
        return token
    }
    function signRefreshToken(user) {
        const token = jwt.sign(JSON.stringify({
            iat: Math.floor(Date.now() / 1000),
            id: user.userID,
            username: user.username
        }), process.env['REFRESH_TOKEN_SERCET'])
        return token
    }
    token.accessToken = signAccessToken(user)
    token.refreshToken = signRefreshToken(user)
    return token
}
function reCreateToken(req, res) {
    const token = req.body.refreshToken
    const index = refreshTokens.indexOf(token)
    if (index === -1) res.status(404).json({ message: 'invalid token' })
    else {
        const user = jwt.decode(token, process.env['REFRESH_TOKEN_SERCET'])
        const newToken = createToken(user)
        refreshTokens.splice(index, 1)
        refreshTokens.push(newToken.refreshToken)
        res.json(newToken)
    }
}
function readAccessToken(token) {
    return jwt.decode(token, process.env['ACCESS_TOKEN_SECRET'])
}
function isCorrectPassword(password, hashedPassword) {
    try {
        const isCorrect = bcrypt.compareSync(password, hashedPassword)
        if (isCorrect) return true
        else return false
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        return false
    }
}
// Middleware auth
function authenticateToken(req, res, next) {
    const authorizationHeader = req.headers['authorization']
    if (!authorizationHeader) res.sendStatus(401)
    else {
        const token = authorizationHeader.split(' ')[1]
        if (!token) res.sendStatus(401)
        else {
            try {
                jwt.verify(token, process.env['ACCESS_TOKEN_SECRET'])
                next()
            } catch (error) {
                console.log('\x1b[31m%s\x1b[0m', error.message)
                res.sendStatus(403)
            }
        }
    }
}

module.exports = {
    login,
    logout,
    register,
    authenticateToken,
    readAccessToken,
    reCreateToken,
    changePassword
}