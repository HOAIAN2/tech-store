require('dotenv').config()
const { pool } = require('./database')
const { users, findUser, createUser, initializeUser, updatePassword, refreshTokens , updateUserImage} = require('./user')
const { products, initializeProduct } = require('./product')
const { categories, initializeCategory } = require('./category')
const { orders, initializeOrder } = require('./order')

async function initializeData() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing data...')
    try {
        // Promise.all only catch one error https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
        const results = await Promise.allSettled([
            initializeUser(),
            initializeProduct(),
            initializeCategory(),
            initializeOrder()
        ])
        results.forEach(promise => {
            if (promise.status === 'rejected') throw new Error('Fail to initialize data')
        })
        console.log('\x1b[32m%s\x1b[0m', 'Initialized data')
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        // uncomment this line on production or have database
        throw new Error(`Fail to initialize data: ${error.message}`)
    }
}

module.exports = {
    initializeData,
    findUser,
    createUser,
    updatePassword,
    updateUserImage,
    pool,
    users,
    products,
    categories,
    orders,
    refreshTokens,
}