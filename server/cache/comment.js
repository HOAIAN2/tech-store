const { Comment } = require('../models')
const { pool } = require('./database')

const comments = []

async function initializeComment() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing comments data...')
    try {
        const queryString = [
            'SELECT comment_id, user_id, product_id, comment FROM comments'
        ].join(' ')
        const [rows] = await pool.query(queryString)
        rows.forEach(row => {
            const commentID = row['comment_id']
            const userID = row['user_id']
            const productID = row['product_id']
            const commentContent = row['comment']
            const comment = new Comment(commentID, userID, productID, commentContent)
            comments.push(comment)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize comments data: ${error.message}`)
        throw new Error(`Fail to initialize comments data: ${error.message}`)
    }
}

module.exports = {
    initializeComment,
    comments
}