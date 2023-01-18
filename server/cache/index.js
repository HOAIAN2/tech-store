require('dotenv').config()
const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME']
}).promise()

async function initializeData() {
    try {
        await pool.getConnection()
        console.log('\x1b[1m%s\x1b[0m', 'Initializing data...')
        console.log('\x1b[32m%s\x1b[0m', 'Initialized data')
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
    }
}

module.exports = {
    initializeData: initializeData,
    pool: pool
}