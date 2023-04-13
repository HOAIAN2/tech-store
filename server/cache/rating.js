const { Rating } = require('../models')
const { pool } = require('./database')

const ratings = []

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
    // initializeRating,
    isRatingYet,
    ratings
}