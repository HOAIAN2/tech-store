const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { pool } = require('./database')
const Cache = require('js-simple-cache')
const fs = require('fs')


if (!fs.existsSync('./tokens.json')) fs.writeFileSync('./tokens.json', '[]')
const users = new Cache('username', 10000)
const refreshTokens = require('../tokens.json')
function invalidDateToken() {
    const today = new Date()
    const newTokens = refreshTokens.filter(item => {
        const tokenDate = new Date(jwt.decode(item).iat * 1000)
        const diff = Math.round((today - tokenDate) / (24 * 60 * 60 * 1000))
        if (diff < 100) return item
    })
    if (!fs.existsSync('./tokens.json')) fs.writeFileSync('./tokens.json', JSON.stringify(newTokens))
}
async function initializeUser() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing users data...')
    try {
        const queryString = [
            'SELECT user_id, roles.name AS role, username, first_name, last_name, birth_date, sex, address, email, phone_number, avatar, hashed_password FROM users',
            'JOIN roles ON users.role_id = roles.id'
        ].join(' ')
        const [rows] = await pool.query(queryString)
        rows.forEach(row => {
            const userID = row['user_id']
            const role = row['role']
            const username = row['username']
            const firstName = row['first_name']
            const lastName = row['last_name']
            const birthDate = row['birth_date']
            const sex = row['sex']
            const address = row['address']
            const email = row['email']
            const phoneNumber = row['phone_number']
            const avatar = row['avatar']
            const hashedPassword = row['hashed_password']
            // push to cache array
            const user = new User(userID, role, username, firstName, lastName, birthDate, sex, address, email, phoneNumber, avatar, hashedPassword)
            users.set(user)
        })
        invalidDateToken()
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize users data: ${error.message}`)
        throw new Error(`Fail to initialize users data: ${error.message}`)
    }
}
async function findUser(username) {
    let user = users.get(username)
    if (!user) {
        try {
            // Preventing SQL injection in Node.js with placeholder
            const queryString = [
                'SELECT user_id, roles.name AS role, username, first_name, last_name, birth_date, sex, address, email, phone_number, avatar, hashed_password FROM users',
                'JOIN roles ON users.role_id = roles.id',
                'WHERE users.username = ?'
            ].join(' ')
            const [rows] = await pool.query(queryString, [username])
            if (rows[0]) {
                const userID = rows[0]['user_id']
                const role = rows[0]['role']
                const username = rows[0]['username']
                const firstName = rows[0]['first_name']
                const lastName = rows[0]['last_name']
                const birthDate = rows[0]['birth_date']
                const sex = rows[0]['sex']
                const address = rows[0]['address']
                const email = rows[0]['email']
                const phoneNumber = rows[0]['phone_number']
                const avatar = rows[0]['avatar']
                const hashedPassword = rows[0]['hashed_password']
                user = new User(userID, role, username, firstName, lastName, birthDate, sex, address, email, phoneNumber, avatar, hashedPassword)
                users.set(user)
                return user
            }
            return null
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            return null
        }
    }
    return user
}
async function createUser(user) {
    try {
        const queryString = [
            'INSERT INTO users (role_id, username, first_name, last_name, birth_date, sex, address, email, phone_number, hashed_password)',
            'VALUES (2, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        ].join(' ')
        await pool.query(queryString, [
            user.username,
            user.firstName,
            user.lastName,
            user.birthDate,
            user.sex,
            user.address,
            user.email,
            user.phoneNumber,
            user.hashedPassword
        ])
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}

async function updateProfile(id, data) {
    const queryString = [
        'UPDATE users SET first_name = ? ,',
        'last_name = ? ,',
        'birth_date = ? ,',
        'sex = ? ,',
        'address = ? ,',
        'email = ? ,',
        'phone_number = ?',
        'WHERE user_id = ?'
    ].join(' ')
    try {
        await pool.query(queryString, [
            data.firstName,
            data.lastName,
            data.birthDate,
            data.sex,
            data.address,
            data.email,
            data.phoneNumber,
            id
        ])
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}
async function updatePassword(username, password) {
    const queryString = ['UPDATE users SET hashed_password = ? WHERE username = ?'].join('')
    try {
        await pool.query(queryString, [password, username])
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}

async function updateUserImage(path, username) {
    const queryString = ['UPDATE users SET avatar = ? WHERE username = ?'].join('')
    try {
        await pool.query(queryString, [path, username])
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}


module.exports = {
    findUser,
    createUser,
    initializeUser,
    updatePassword,
    users,
    refreshTokens,
    updateUserImage,
    updateProfile
}