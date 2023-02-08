const { User } = require('../models')
const { pool } = require('./database')

const users = []
const refreshTokens = []

async function initializeUser() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing users data...')
    try {
        const queryString = [
            'SELECT user_id, roles.name AS role, username, first_name, last_name, birth_date, sex, address, email, phone_number, hashed_password FROM users',
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
            const hashedPassword = row['hashed_password']
            // push to cache array
            const user = new User(userID, role, username, firstName, lastName, birthDate, sex, address, email, phoneNumber, hashedPassword)
            users.push(user)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize user data: ${error.message}`)
        throw new Error(`Line16 user.js: Fail to initialize user data: ${error.message}`)
    }
}
async function findUser(username) {
    let user = users.find(user => user.username === username)
    if (!user) {
        try {
            // Preventing SQL injection in Node.js with placeholder
            const queryString = 'SELECT * FROM users WHERE username = ?'
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
    }
}

module.exports = {
    findUser,
    createUser,
    initializeUser,
    users,
    refreshTokens
}