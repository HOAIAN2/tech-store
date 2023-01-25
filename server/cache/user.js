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
            const data = await pool.query('SELECT * FROM user WHERE username = ?', [username])
            if (data[0][0]) {
                const id = data[0][0]['id']
                const username = data[0][0]['username']
                const firstName = data[0][0]['first_name']
                const lastName = data[0][0]['last_name']
                const hashedPassword = data[0][0]['hashed_password']
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

module.exports = {
    findUser,
    initializeUser,
    users,
    refreshTokens
}