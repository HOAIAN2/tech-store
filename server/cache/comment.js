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
    let replace = '>'
    if (sortMode === 'DESC') replace = '<'
    const comments = []
    try {
        let queryString = [
            'SELECT comment_id, users.user_id, users.avatar, first_name, last_name, comments.product_id, comment, rate, comment_date FROM comments',
            'JOIN users ON users.user_id = comments.user_id',
            'LEFT JOIN ratings ON ratings.user_id = comments.user_id AND ratings.product_id = comments.product_id',
            `WHERE comments.product_id = ? AND comment_id ${replace} ?`,
            `ORDER BY comment_id ${sortMode}`,
            'LIMIT 10'
        ].join(' ')
        if (!startIndex) queryString = queryString.replace(`AND comment_id ${replace} ?`, '')
        const [rows] = await pool.query(queryString, [productID, startIndex])
        rows.forEach(row => {
            const commentID = row['comment_id']
            const userID = row['user_id']
            const avatar = row['avatar']
            const firstName = row['first_name']
            const lastName = row['last_name']
            const productID = row['product_id']
            const commentContent = row['comment']
            const rate = row['rate']
            const commentDate = row['comment_date']
            const comment = new Comment(commentID, userID, avatar, firstName, lastName, productID, commentContent, rate, commentDate)
            comments.push(comment)
        })
        return comments
    } catch (error) {
        throw new Error(error.message)
    }
}
async function insertComment(userID, productID, content) {
    let newComment = null
    try {
        const queryString = [
            'INSERT INTO comments (user_id, product_id, comment, comment_date)',
            'VALUES (?, ?, ?, NOW())'
        ].join(' ')
        const queryString1 = [
            'SELECT comment_id, users.user_id, users.avatar, first_name, last_name, comments.product_id, comment, rate, comment_date FROM comments',
            'JOIN users ON users.user_id = comments.user_id',
            'LEFT JOIN ratings ON ratings.user_id = comments.user_id AND ratings.product_id = comments.product_id',
            `WHERE comment_id = ?`,
        ].join(' ')
        const [result] = await pool.query(queryString, [userID, productID, content])
        const [rows] = await pool.query(queryString1, [result.insertId])
        rows.forEach(row => {
            const commentID = row['comment_id']
            const userID = row['user_id']
            const avatar = row['avatar']
            const firstName = row['first_name']
            const lastName = row['last_name']
            const productID = row['product_id']
            const commentContent = row['comment']
            const rate = row['rate']
            const commentDate = row['comment_date']
            const comment = new Comment(commentID, userID, avatar, firstName, lastName, productID, commentContent, rate, commentDate)
            newComment = comment
        })
        return newComment
    } catch (error) {
        throw new Error(error.message)
    }
}
async function deleteComment(commentID, userID) {
    try {
        const queryString = [
            'DELETE FROM comments',
            'WHERE comment_id = ? AND user_id = ?'
        ].join(' ')
        const [result] = await pool.query(queryString, [commentID, userID])
        if (result.affectedRows === 0) throw new Error('No comments were deleted')
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {
    queryComments,
    insertComment,
    deleteComment
}