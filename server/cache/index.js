require('dotenv').config()
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME']
})

function initializeData() {
    connection.connect( err => {
        if (err) console.log(err.message)
        else {
            console.log('\x1b[32m%s\x1b[0m', 'Database connected!')
        }
    })
}

module.exports = {
    initializeData: initializeData,
    connection: connection
}