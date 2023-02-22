const { Category } = require('../models')
const { pool } = require('./database')

const categories = []

async function initializeCategory() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing categories data...')
    try {
        const queryString = [
            'SELECT category_id, category_name, description',
            'FROM categories'
        ].join(' ')
        const [rows] = await pool.query(queryString)
        rows.forEach(row => {
            const categoryID = row['category_id']
            const categoryName = row['category_name']
            const description = row['description']
            const category = new Category(categoryID, categoryName, description)
            categories.push(category)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize category data: ${error.message}`)
        throw new Error(`Fail to initialize category data: ${error.message}`)
    }
}
module.exports = {
    initializeCategory,
    categories
}