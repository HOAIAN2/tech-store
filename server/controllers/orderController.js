const { readAccessToken } = require("../controllers/authController")
const { orders, addOrder, addOrderDetail, updateOrderDetail, paidOrder, removeOrderDetail, addVoucher, vouchers } = require("../cache")
const orderErrors = require("./orderErrors.json")

// [GET]
function getOrder(req, res) {
    const queries = ['latest', 'all']
    const query = req.query.type
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    if (!queries.includes(query)) return res.status(400).json({ message: errorMessages.invalidQuery })
    const userOrders = orders.filter(order => order.userID === user.id)
    userOrders.sort((a, b) => b.orderID - a.orderID)
    if (query === 'latest') {
        return res.json(userOrders[0])
    }
    else {
        return res.json(userOrders)
    }
}
// [POST create-order]
async function createOrder(req, res) {
    const data = {
        productID: req.body.productID,
        quantity: req.body.quantity
    }
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    if (!isValidData(data)) return res.status(400).json({ message: errorMessages.invalidDataType })
    // kiểm tra cuối order mới nhất thanh toán chưa
    // thanh toán rồi thì tạo mới, không thì bad request.
    const userOrders = orders.filter(order => order.userID === user.id)
    userOrders.sort((a, b) => b.orderID - a.orderID)
    if (!userOrders[0] || userOrders[0].paid) {
        try {
            const order = await addOrder(user.id, data.productID, data.quantity)
            return res.json(order)
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            return res.status(500).json({ message: 'error' })
        }
    }
    return res.sendStatus(400)
}
// [POST add-product]
async function addProduct(req, res) {
    const data = {
        orderID: req.body.orderID,
        productID: req.body.productID,
        quantity: req.body.quantity
    }
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    if (!isValidData(data)) return res.status(400).json({ message: errorMessages.invalidDataType })
    const order = orders.get(data.orderID)
    if (order?.userID !== user.id) return res.sendStatus(401)
    if (order && !order.paid) {
        let onOrder = false
        if (order.products.find(product => {
            return product.productID === data.productID
        })) onOrder = true
        try {
            let order = null
            if (onOrder) order = await updateOrderDetail(data.orderID, data.productID, data.quantity)
            else order = await addOrderDetail(data.orderID, data.productID, data.quantity)
            return res.json(order)
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            return res.status(500).json({ message: 'error' })
        }
    }
    return res.sendStatus(400)
}
// [POST remove-product]
async function removeProduct(req, res) {
    const data = {
        orderID: req.body.orderID,
        productID: req.body.productID
    }
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    if (!isValidData(data.productID)) return res.status(400).json({ message: errorMessages.invalidDataType })
    if (!Array.isArray(data.productID)) return res.status(400).json({ message: errorMessages.invalidDataType })
    const order = orders.get(data.orderID)
    if (order?.userID !== user.id) return res.sendStatus(401)
    if (order && !order.paid) {
        if (!data.productID.every(id => {
            if (!order.products.find(product => product.productID === id)) return false
            return true
        })) return res.sendStatus(400)
        try {
            const order = await removeOrderDetail(data.orderID, data.productID)
            return res.json(order)
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            return res.status(500).json({ message: 'error' })
        }
    }
    return res.sendStatus(400)
}
// [POST set-voucher]
async function setVoucher(req, res) {
    const data = {
        orderID: req.body.orderID,
        voucherID: req.body.voucherID
    }
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    if (!checkNumber(data.orderID)) return res.status(400).json({ message: errorMessages.invalidDataType })
    const order = orders.get(data.orderID)
    if (order?.userID !== user.id) return res.sendStatus(401)
    const voucher = vouchers.get(data.voucherID)
    if (!voucher) return res.status(400).json({ message: errorMessages.voucherInvalid })
    if (order && !order.paid) {
        try {
            const today = new Date().setHours(0, 0, 0, 0)
            if (voucher.expiryDate < today) return res.json({ message: errorMessages.voucherOutdate })
            await addVoucher(data.orderID, data.voucherID)
            order.setVoucher(voucher)
            return res.json(order)
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            return res.status(500).json({ message: 'error' })
        }
    }
    return res.sendStatus(400)
}
// [POST make-payment]
async function makePayment(req, res) {
    const data = {
        orderID: req.body.orderID,
        paymentMethod: req.body.paymentMethod
    }
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    if (!isValidData(data)) return res.status(400).json({ message: errorMessages.invalidDataType })
    let order = orders.get(data.orderID)
    if (order?.userID !== user.id) return res.sendStatus(401)
    if (order && !order.paid) {
        try {
            if (order.products.length === 0) return res.sendStatus(400)
            const today = new Date().setHours(0, 0, 0, 0)
            if (order.voucher?.expiryDate < today) return res.json({ message: errorMessages.voucherOutdate })
            order = await paidOrder(order.orderID, data.paymentMethod)
            return res.json(order)
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            return res.status(500).json({ message: 'error' })
        }
    }
    return res.sendStatus(400)
}

// middleware,..
function isValidData(data) {
    if (Array.isArray(data)) {
        const result = data.every((item) => {
            if (typeof item === 'number' && Number.isInteger(item) && item > 0) return true
            return false
        })
        return result
    }
    else {
        const result = Object.keys(data).every((item) => {
            if (typeof data[item] === 'number' && Number.isInteger(data[item]) && data[item] > 0) return true
            return false;
        })
        return result
    }
}

function checkNumber(number) {
    let i = 0
    for (i; i < number.length; i++) {
        if (isNaN(parseInt(number[i]))) return false
    }
    return true
}

module.exports = {
    getOrder,
    createOrder,
    addProduct,
    removeProduct,
    setVoucher,
    makePayment
}
