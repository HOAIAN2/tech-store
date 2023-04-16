const { Comment } = require('../models')
const { pool } = require('./database')


// async function initializeComment() {
//     console.log('\x1b[1m%s\x1b[0m', 'Initializing comments data...')
//     try {
//         const queryString = [
//             'SELECT comment_id, user_id, product_id, comment FROM comments'
//         ].join(' ')
//         const [rows] = await pool.query(queryString)
//         rows.forEach(row => {
//             const commentID = row['comment_id']
//             const userID = row['user_id']
//             const productID = row['product_id']
//             const commentContent = row['comment']
//             const comment = new Comment(commentID, userID, productID, commentContent)
//             comments.push(comment)
//         })
//     } catch (error) {
//         console.log('\x1b[31m%s\x1b[0m', `Fail to initialize comments data: ${error.message}`)
//         throw new Error(`Fail to initialize comments data: ${error.message}`)
//     }
// }

async function queryComments(productID, startIndex, sortMode) {
    const comments = []
    try {
        const queryString = [
            'SELECT comment_id, first_name, last_name, product_id, comment, comment_date FROM comments',
            'JOIN users ON users.user_id = comments.user_id',
            'WHERE product_id = ? AND comment_id > ?',
            `ORDER BY comment_id ${sortMode}`,
            'LIMIT 10'
        ].join(' ')
        const [rows] = await pool.query(queryString, [productID, startIndex])
        rows.forEach(row => {
            const commentID = row['comment_id']
            const firstName = row['first_name']
            const lastName = row['last_name']
            const productID = row['product_id']
            const commentContent = row['comment']
            const commentDate = row['comment_date']
            const comment = new Comment(commentID, firstName, lastName, productID, commentContent, commentDate)
            comments.push(comment)
        })
        return comments
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {
    queryComments
}