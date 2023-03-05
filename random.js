const fs = require('fs')
const crypto = require('crypto')
const DATA =
    `SERVER_PORT=4000
DB_HOST="localhost"
DB_PORT=3306
DB_USER="admin"
DB_PASSWORD="123456789"
DB_NAME="store"
ACCESS_TOKEN_SECRET="${crypto.randomBytes(128).toString('hex')}"
REFRESH_TOKEN_SERCET="${crypto.randomBytes(128).toString('hex')}"`
fs.writeFile('./server/.env', DATA, (error) => {
    if (error) console.log(error)
})