const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const { refreshTokens, findUser } = require('../cache')

function createToken(user) {
    const token = {
        accessToken: '',
        refreshToken: ''
    }
    function signAccessToken(user) {
        const token = jwt.sign(JSON.stringify({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            id: user.id,
            username: user.username
        }), process.env['ACCESS_TOKEN_SECRET'])
        return token
    }
    function signRefreshToken(user) {
        const token = jwt.sign(JSON.stringify({
            id: user.id, username: user.username
        }), process.env['REFRESH_TOKEN_SERCET'])
        return token
    }
    token.accessToken = signAccessToken(user)
    token.refreshToken = signRefreshToken(user)
    return token
}
// [POST login]
async function login(req, res) {
    const username = req.body.username
    const user = await findUser(username)
    if (!user) res.status(404).json(null)
    else {
        if (isCorrectPassword(req.body.password, user.hashedPassword)) {
            const token = createToken(user)
            refreshTokens.push(token.refreshToken)
            res.json(token)
        }
        else res.status(404).json(null)
    }
}
// [POST logout]
function logout(req, res) {
    const refreshToken = req.body.refreshToken
    const index = refreshTokens.indexOf(refreshToken)
    if (index !== 0) {
        refreshTokens.splice(index, 1)
        res.json({ message: 'success' })
    }
    else {
        res.status(404).json({ message: 'can not logout' })
    }
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

module.exports = {
    login,
    logout
}