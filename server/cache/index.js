require('dotenv').config()
const { pool } = require('./database')
const {
    users,
    findUser,
    createUser,
    initializeUser,
    updatePassword,
    refreshTokens,
    updateUserImage,
    updateProfile
} = require('./user')
const { products, initializeProduct, createProduct } = require('./product')
const { categories, initializeCategory } = require('./category')
const {
    orders,
    initializeOrder,
    addOrder,
    addOrderDetail,
    updateOrderDetail,
    paidOrder,
    removeOrderDetail,
    addVoucher
} = require('./order')
const { suppliers, initializeSupplier } = require('./supplier')
const { vouchers, initializeVoucher } = require('./voucher')
const { queryComments, insertComment } = require('./comment')
const { selectRating, insertRating, updateRating } = require('./rating')
async function initializeData() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing data...')
    try {
        // Promise.all only catch one error https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
        const results = await Promise.allSettled([
            initializeUser(),
            initializeProduct(),
            initializeCategory(),
            initializeSupplier(),
            initializeVoucher(),
            initializeOrder(),
        ])
        results.forEach(promise => {
            if (promise.status === 'rejected') throw new Error('Fail to initialize data')
        })
        console.log('\x1b[32m%s\x1b[0m', 'Initialized data')
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(`Fail to initialize data: ${error.message}`)
    }
}

module.exports = {
    initializeData,
    findUser,
    createUser,
    updateProfile,
    updatePassword,
    updateUserImage,
    createProduct,
    addOrder,
    addOrderDetail,
    updateOrderDetail,
    addVoucher,
    paidOrder,
    removeOrderDetail,
    selectRating,
    insertRating,
    updateRating,
    queryComments,
    insertComment,
    pool,
    users,
    products,
    categories,
    suppliers,
    orders,
    vouchers,
    refreshTokens,
}