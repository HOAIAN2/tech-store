require('dotenv').config()
const { pool } = require('./database')
const { users, findUser, initializeUser, refreshTokens } = require('./user')
const { products, initializeProduct } = require('./product')
const { categories, initializeCategory } = require('./category')
const { orders, initializeOrder } = require('./order')

async function initializeData() {
    try {
        console.log('\x1b[1m%s\x1b[0m', 'Initializing data...')
        await Promise.all([
            initializeUser(),
            initializeProduct(),
            initializeCategory(),
            initializeOrder()
        ])
        console.log('\x1b[32m%s\x1b[0m', 'Initialized data')
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
    }
}

module.exports = {
    initializeData,
    findUser,
    pool,
    users,
    products,
    categories,
    orders,
    refreshTokens,
}