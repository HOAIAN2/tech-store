const { pool } = require('./database')

const orders = []

async function initializeOrder() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing orders data...')
    try {
        // Write query and push to products array here
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize orders data: ${error.message}`)
        throw new Error(`Fail to initialize orders data: ${error.message}`)
    }
}
module.exports = {
    initializeOrder,
    orders
}