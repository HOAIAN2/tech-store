const { pool } = require('./database')

const products = []

async function initializeProduct() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing products data...')
}
module.exports = {
    initializeProduct,
    products
}