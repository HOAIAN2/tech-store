const { User } = require('../models')
const { pool } = require('./database')

const users = []
const refreshTokens = []

async function initializeUser() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing users data...')
    const user = new User(1, 'hoaian_admin', 'Hoài Ân', 'Lê', '$2a$10$kFM0WGYP4jN52ZJw1bafPeK/kF0RVN30iKyteLxC/vnGjqEP83DI6')
    users.push(user)
}
async function findUser(username) {
    let user = users.find(user => user.username === username)
    if (!user) {
        try {
            // Preventing SQL injection in Node.js with placeholder
            const queryString = 'SELECT * FROM user WHERE username = ?'
            const [rows] = await pool.query(queryString, [username])
            if (rows[0]) {
                const id = rows[0]['id']
                const username = rows[0]['username']
                const firstName = rows[0]['first_name']
                const lastName = rows[0]['last_name']
                const hashedPassword = rows[0]['hashed_password']
                user = new User(id, username, firstName, lastName, hashedPassword)
                users.push(user)
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
        const queryString =
            'INSERT INTO users (username, first_name, last_name, email, phone_number, address, hashed_password) '
            + 'VALUES (?, ?, ?, ?, ?, ?, ?)'
        await pool.query(queryString, [
            user.username,
            user.firstName,
            user.lastName,
            user.email,
            user.phoneNumber,
            user.hashedPassword
        ])
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
    }
}

module.exports = {
    findUser,
    createUser,
    initializeUser,
    users,
    refreshTokens
}