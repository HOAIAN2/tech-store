const { pool } = require('./database')
const { products } = require('./product')

async function selectRating(userID, productID) {
    try {
        const queryString = [
            'SELECT rate FROM ratings',
            'WHERE user_id = ? AND product_id = ?'
        ].join(' ')
        const [rows] = await pool.query(queryString, [userID, productID])
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}
async function insertRating(userID, productID, rate) {
    const product = products.products.find(item => item.productID === productID)
    try {
        const queryString = [
            'INSERT INTO ratings (user_id, product_id, rate)',
            'VALUES (?, ?, ?)'
        ].join(' ')
        const queryString1 = [
            'SELECT AVG(rate) AS rate FROM ratings',
            'WHERE product_id = ?'
        ].join(' ')
        await pool.query(queryString, [userID, productID, rate])
        const [rows] = await pool.query(queryString1, [productID])
        product.updateRating(parseFloat(rows[0].rate))
        product.updateRatingCount()
    } catch (error) {
        throw new Error(error.message)
    }
}
async function updateRating(userID, productID, rate) {
    const product = products.products.find(item => item.productID === productID)
    try {
        const queryString = [
            'UPDATE ratings SET rate = ?',
            'WHERE user_id = ? AND product_id = ?'
        ].join(' ')
        const queryString1 = [
            'SELECT AVG(rate) AS rate FROM ratings',
            'WHERE product_id = ?'
        ].join(' ')
        await pool.query(queryString, [rate, userID, productID])
        const [rows] = await pool.query(queryString1, [productID])
        product.updateRating(parseFloat(rows[0].rate))
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {
    selectRating,
    insertRating,
    updateRating
}
