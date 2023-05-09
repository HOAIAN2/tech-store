const { Rating } = require('../models')
const { pool } = require('./database')

// async function initializeRating() {
//     console.log('\x1b[1m%s\x1b[0m', 'Initializing ratings data...')
//     try {
//         const queryString = [
//             'SELECT rating_id, user_id, product_id, rate FROM ratings'
//         ].join(' ')
//         const [rows] = await pool.query(queryString)
//         rows.forEach(row => {
//             const ratingID = row['rating_id']
//             const userID = row['user_id']
//             const productID = row['product_id']
//             const rate = row['rate']
//             const rating = new Rating(ratingID, userID, productID, rate)
//             ratings.push(rating)
//         })
//     } catch (error) {
//         console.log('\x1b[31m%s\x1b[0m', `Fail to initialize ratings data: ${error.message}`)
//         throw new Error(`Fail to initialize ratings data: ${error.message}`)
//     }
// }
async function selectRating(userID, productID) {
    try {
        const queryString = [
            'SELECT rate FROM ratings',
            'WHERE user_id = ? AND product_id = ?'
        ].join(' ')
        const [rows] = await pool.query(queryString, [userID, productID])
    } catch (error) {
        throw new Error(error.message)
    }
}
async function insertRating(userID, productID, rate) {
    try {
        const queryString = [
            'INSERT INTO ratings (user_id, product_id, rate)',
            'VALUES (?, ?, ?)'
        ].join(' ')
        if (await isRatingYet(userID, productID)) throw new Error('User rated this product')
        await pool.query(queryString, [userID, productID, rate])
    } catch (error) {
        throw new Error(error.message)
    }
}
async function updateRating(userID, productID, rate) {
    try {
        const queryString = [
            'UPDATE ratings SET rate = ?',
            'WHERE user_id = ? AND product_id = ?'
        ].join(' ')
        if (!await isRatingYet(userID, productID)) throw new Error('User didn\'t rated this product')
        await pool.query(queryString, [rate, userID, productID])
    } catch (error) {
        throw new Error(error.message)
    }
}
async function isRatingYet(userID, productID) {
    try {
        const queryString = [
            'SELECT rating_id FROM ratings',
            'WHERE user_id = ? AND product_id = ?'
        ].join(' ')
        const [result] = pool.query(queryString, [userID, productID])
        if (result.length === 0) return false
        else return true
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {
    selectRating,
    insertRating,
    updateRating
}