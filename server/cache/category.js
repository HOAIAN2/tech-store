const { pool } = require('./database')

const categories = []

async function initializeCategory() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing categories data...')
    try {
        // Write query and push to products array here
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize category data: ${error.message}`)
        throw new Error(`Fail to initialize category data: ${error.message}`)
    }
}
module.exports = {
    initializeCategory,
    categories
}