const { orders, selectRating, insertRating, updateRating } = require('../cache')

// [GET index]
async function getRating(req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const tokenData = readAccessToken(token)
}

// [POST index]
async function addRating(req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const tokenData = readAccessToken(token)
    const validRates = [1, 2, 3, 4, 5]
    const data = {
        userID: tokenData.id,
        productID: req.body.id,
        rate: req.body.rate
    }
    if (typeof data.productID !== 'number' || typeof data.rate !== 'number') return res.sendStatus(400)
    if (!Number.isInteger(data.productID) && validRates.includes(data.rate)) return res.sendStatus(400)
    if (!didUserBought(data.userID, data.productID)) return res.sendStatus(400)
    try {
        await insertRating(data.userID, data.productID, data.rate)
        return res.sendStatus(200)
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        return res.status(500).json({ message: 'error' })
    }
}
// [PUT index]
async function editRating(req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const tokenData = readAccessToken(token)
    const data = {
        userID: tokenData.id,
        productID: req.body.id,
        rate: req.body.rate
    }
    if (typeof data.productID !== 'number' || typeof data.rate !== 'number') return res.sendStatus(400)
    if (!Number.isInteger(data.productID) && validRates.includes(data.rate)) return res.sendStatus(400)
    if (!didUserBought(data.userID, data.productID)) return res.sendStatus(400)
    try {
        await updateRating(data.userID, data.productID, data.rate)
        return res.sendStatus(200)
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        return res.status(500).json({ message: 'error' })
    }
}

// Midleware,...
function didUserBought(userID, productID) {
    const userOrders = orders.filter(order => (order.userID === userID && order.paid === true))
    return userOrders.some(order => {
        return order.products.find(product => product.productID === productID) !== null
    })
}
module.exports = {
    getRating,
    addRating,
    editRating
}