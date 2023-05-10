const { orders, selectRating, insertRating, updateRating, products } = require('../cache')
const { readAccessToken } = require('./authController')

// [GET index]
async function getRating(req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const tokenData = readAccessToken(token)
    const data = {
        userID: tokenData.id,
        productID: req.params.id
    }
    if (!products.products.find(product => product.productID === data.productID)) return res.sendStatus(404)
    try {
        const result = await selectRating(tokenData.id, data.productID)
        return res.json(result)
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        return res.status(500).json({ message: 'error' })
    }
}

// [POST index]
async function addRating(req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const tokenData = readAccessToken(token)
    const validRates = [1, 2, 3, 4, 5]
    const data = {
        userID: tokenData.id,
        productID: req.body.productID,
        rate: req.body.rate
    }
    if (typeof data.productID !== 'number' || typeof data.rate !== 'number') return res.sendStatus(400)
    if (!products.products.find(product => product.productID === data.productID)) return res.sendStatus(404)
    if (!validRates.includes(data.rate)) return res.sendStatus(400)
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
    const validRates = [1, 2, 3, 4, 5]
    const data = {
        userID: tokenData.id,
        productID: req.body.productID,
        rate: req.body.rate
    }
    if (typeof data.productID !== 'number' || typeof data.rate !== 'number') return res.sendStatus(400)
    if (!products.products.find(product => product.productID === data.productID)) return res.sendStatus(404)
    if (!validRates.includes(data.rate)) return res.sendStatus(400)
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
function isValidNumber(number) {
    let i = 0
    for (i; i < number.length; i++) {
        if (isNaN(parseInt(number[i]))) return false
    }
    return true
}
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