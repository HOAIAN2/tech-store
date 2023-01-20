const { pool } = require('./database')

const categories = []

async function initializeCategory() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing categories data...')
}
module.exports = {
    initializeCategory,
    categories
}