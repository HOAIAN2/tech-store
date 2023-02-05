const { pool } = require('./database')

const products = []

async function initializeProduct() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing products data...')
    try {
        // Write query and push to products array here
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize product data: ${error.message}`)
        throw new Error(`Fail to initialize product data: ${error.message}`)
    }
}
module.exports = {
    initializeProduct,
    products
}