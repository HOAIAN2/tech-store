const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const updatePassword = require("../cache/user")
require('dotenv').config()
const { refreshTokens, findUser, createUser } = require('../cache')

/// API routes
// [POST login]
async function login(req, res) {
    const username = req.body.username
    const user = await findUser(username)
    if (!user) res.status(404).json({ message: 'cannot find username' })
    else {
        if (isCorrectPassword(req.body.password, user.hashedPassword)) {
            const token = createToken(user)
            refreshTokens.push(token.refreshToken)
            res.json(token)
        }
        else res.status(404).json({ message: 'incorrect password' })
    }
}
// [POST logout]
function logout(req, res) {
    const refreshToken = req.body.refreshToken
    const index = refreshTokens.indexOf(refreshToken)
    if (index !== -1) {
        refreshTokens.splice(index, 1)
        res.json({ message: 'success' })
    }
    else {
        res.status(404).json({ message: 'can not logout' })
    }
}
// [POST register]
async function register(req, res) {
    const username = req.body.username
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const birthDate = req.body.birthDate
    const sex = req.body.sex
    const address = req.body.address
    const email = req.body.email
    const phoneNumber = req.body.phoneNumber
    if (!validate(username, email)) res.status(404).json({ message: 'invalid username or email' })
    if (await findUser(username)) res.status(404).json({ message: 'username exists' })
    else {
        try {
            const hashedPassword = bcrypt.hashSync(password, 10)
            const formatedBirthDate = formatDate(birthDate)
            await createUser({
                username: username,
                firstName: firstName,
                lastName: lastName,
                birthDate: formatedBirthDate,
                sex: sex,
                address: address,
                email: email,
                phoneNumber: phoneNumber,
                hashedPassword: hashedPassword
            })
            const user = await findUser(username)
            const token = createToken(user)
            refreshTokens.push(token.refreshToken)
            res.json(token)
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            res.status(500).json({ message: 'error' })
        }
    }
}
/// Middlewares, etc...
function formatDate(date) {
    const formatedDate = new Date(date)
    return formatedDate.toISOString().split('T')[0]
}
function validate(username, email) {
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
        refreshTokens.slice(index, 1)
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

async function changePassword(rep, res) {
    const user = await findUser(rep.body.username)?handleChangePassword():res.status(400).json({errorMessage: "username is not exist"})
    async function handleChangePassword() {
        if(isCorrectPassword(rep.oldPassword, user.hashed_password)){
            const hashedPassword = await bcrypt.hashSync(rep.newPassword, 10)
            const query = updatePassword.updatePassword(user.username,hashedPassword)
            if(query.errorMessage){
                res.status(200).json({errorMessage: "update password success"})
            }
        }
        else{
            res.status(400).json({errorMessage: "mật khẩu không đúng"})
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