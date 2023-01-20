const { pool } = require('./database')

const orders = []

async function initializeOrder() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing orders data...')
}
module.exports = {
    initializeOrder,
    orders
}