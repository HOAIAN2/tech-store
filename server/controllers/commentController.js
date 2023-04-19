const { queryComments } = require('../cache')

// [GET comments]
async function getComments(req, res) {
    const sortModes = ['DESC', 'ASC']
    const data = {
        productID: req.query.productID,
        startIndex: req.query.startIndex,
        sortMode: req.query.sortMode
    }
    if (!checkNumber(data.productID)) return res.sendStatus(400)
    if (!sortModes.includes(data.sortMode)) return res.sendStatus(400)
    try {
        const comments = await queryComments(data.productID, data.startIndex, data.sortMode)
        return res.json(comments)
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        return res.status(500).json({ message: 'error' })
    }
}

// Middleware,..
function checkNumber(number) {
    if (!number) return false
    let i = 0
    for (i; i < number.length; i++) {
        if (isNaN(parseInt(number[i]))) return false
    }
    return true
}
module.exports = {
    getComments
}