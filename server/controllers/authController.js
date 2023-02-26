const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const { refreshTokens, findUser, createUser, updatePassword, updateUserImage } = require('../cache')
const authErrors = require('./authErrors.json')
const path = require("path")
const fs = require("fs")

/// API routes
// [POST login]
async function login(req, res) {
    let errorMessages = authErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = authErrors.vi
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    const user = await findUser(data.username)
    if (!user) {
        return res.status(404).json({ message: errorMessages.notFoundUsername })
    }
    else {
        if (isCorrectPassword(data.password, user.hashedPassword)) {
            const token = createToken(user)
            refreshTokens.push(token.refreshToken)
            res.json(token)
        }
        else res.status(400).json({ message: errorMessages.incorrectPassword })
    }
}
// [POST logout]
function logout(req, res) {
    let errorMessages = authErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = authErrors.vi
    const refreshToken = req.body.refreshToken
    const index = refreshTokens.indexOf(refreshToken)
    if (index !== -1) {
        refreshTokens.splice(index, 1)
        res.json({ message: 'success' })
    }
    else {
        res.status(400).json({ message: errorMessages.invalidToken })
    }
}
// [POST changepass]
async function changePassword(req, res) {
    let errorMessages = authErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = authErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const { username } = readAccessToken(token)
    const data = {
        username: username,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
        refreshToken: req.body.refreshToken
    }
    const index = refreshTokens.indexOf(data.refreshToken)
    if (index === -1) return res.status(404).json({ message: errorMessages.invalidToken })
    const user = await findUser(username)
    if (!user) {
        return res.status(404).json({ message: errorMessages.notFoundUsername })
    }
    if (data.oldPassword === data.newPassword) {
        return res.status(400).json({ message: errorMessages.samePassword })
    }
    if (!isCorrectPassword(data.oldPassword, user.hashedPassword)) {
        return res.status(400).json({ message: errorMessages.incorrectPassword })
    }
    else {
        if (data.newPassword.length < 8) return res.status(400).json({ message: errorMessages.passwordTooShort })
        const hashedPassword = bcrypt.hashSync(data.newPassword, 10)
        try {
            await updatePassword(data.username, hashedPassword)
            user.setPassword(hashedPassword)
            refreshTokens.splice(index, 1)
            return res.sendStatus(200)
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            return res.status(500).json({ message: 'error' })
        }
    }
}
// [POST register]
async function register(req, res) {
    let errorMessages = authErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = authErrors.vi
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
    if (data.password.includes(' ')) return res.status(400).json({ message: errorMessages.invalidPassword })
    if (!validate(data.username, data.email)) {
        return res.status(404).json({ message: errorMessages.invalidUsernameOrEmail })
    }
    if (await findUser(data.username)) {
        return res.status(404).json({ message: errorMessages.usernameExists })
    }
    else {
        try {
            if (data.password.length < 8) return res.status(400).json({ message: errorMessages.passwordTooShort })
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
            if (error.message.includes('users.UQ_email')) return res.status(400).json({ message: errorMessages.emailExists })
            if (error.message.includes('users.UQ_phone_number')) return res.status(400).json({ message: errorMessages.phoneNumberExists })
            return res.status(500).json({ message: 'error' })
        }
    }
}
// [POST refresh token]
function reCreateToken(req, res) {
    let errorMessages = authErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = authErrors.vi
    const token = req.body.refreshToken
    const index = refreshTokens.indexOf(token)
    if (index === -1) res.status(404).json({ message: errorMessages.invalidToken })
    else {
        const user = jwt.decode(token, process.env['REFRESH_TOKEN_SERCET'])
        const newToken = createToken(user)
        refreshTokens.splice(index, 1)
        refreshTokens.push(newToken.refreshToken)
        res.json(newToken)
    }
}
//[POST uploadImage]
async function uploadImage(req, res) {
    let errorMessages = authErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = authErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const tokenData = readAccessToken(token)
    const acceptFormats = ['image/png', 'image/jpg', 'image/jpeg']
    const limitSize = 500 * 1024
    const file = req.files?.file
    // files.file is our variable, if someone stole api and send another variable, server will crash
    if (!file) return res.status(400).json({ message: errorMessages.noFileFound })
    if (file.size > limitSize) return res.status(413).json({ message: errorMessages.fileToLarge })
    if (!acceptFormats.includes(file.mimetype)) return res.status(400).json({ message: errorMessages.formatNotAccept })
    const user = await findUser(tokenData.username)
    /// Save new Avatar and delete previous avatar
    try {
        let fileName = `${Date.now()}-${user.username}.${file.mimetype.split('/')[1]}` // block unicode errors
        let newpath = path.join('./static/images/avatar', fileName)
        file.mv(newpath)
        await updateUserImage(fileName, tokenData.username)
        if (user.avatar) fs.unlinkSync(`./static/images/avatar/${user.avatar}`)
        user.setAvatar(fileName)
        return res.sendStatus(200)
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        return res.status(500).json({ message: 'error' })
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
function readAccessToken(token) {
    return jwt.decode(token, process.env['ACCESS_TOKEN_SECRET'])
}
function isCorrectPassword(password, hashedPassword) {
    try {
        const isCorrect = bcrypt.compareSync(password, hashedPassword)
        if (isCorrect) return true
        else return false
    } catch (errorMessages) {
        console.log('\x1b[31m%s\x1b[0m', errorMessages.message)
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
            } catch (errorMessages) {
                console.log('\x1b[31m%s\x1b[0m', errorMessages.message)
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
    changePassword,
    uploadImage
}