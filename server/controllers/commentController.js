const { queryComments, insertComment, products } = require('../cache')
const { readAccessToken } = require('../controllers/authController')
// [GET comments]
async function getComments(req, res) {
    const sortModes = ['DESC', 'ASC']
    const data = {
        productID: req.query.productID,
        startIndex: req.query.startIndex,
        sortMode: req.query.sortMode
    }
    if (!isValidNumber(data.productID)) return res.sendStatus(400)
    if (!sortModes.includes(data.sortMode)) return res.sendStatus(400)
    try {
        const comments = await queryComments(data.productID, data.startIndex, data.sortMode)
        return res.json(comments)
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        return res.status(500).json({ message: 'error' })
    }
}
async function addComment(req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const data = {
        userID: readAccessToken(token).id,
        productID: req.params.id,
        content: req.body.content
    }
    if (typeof data.content !== 'string') return res.sendStatus(400)
    if (!isValidNumber(data.productID)) return res.sendStatus(400)
    data.productID = parseInt(data.productID)
    try {
        await insertComment(data.userID, data.productID, data.content)
        const product = products.find(item => item.productID === data.productID)
        product.updateCommentCount()
        return res.sendStatus(200)
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        return res.status(500).json({ message: 'error' })
    }
}

// Middleware,..
function isValidNumber(number) {
    if (!number) return false
    let i = 0
    for (i; i < number.length; i++) {
        if (isNaN(parseInt(number[i]))) return false
    }
    return true
}
module.exports = {
    getComments,
    addComment
}