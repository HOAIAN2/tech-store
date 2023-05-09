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
    if (query === 'latest') {
        const latestOrder = orders.findLast(order => {
            return order.userID === user.id
        })
        return res.json(latestOrder)
    }
    else {
        return res.json(orders.filter(order => {
            return order.userID === user.id
        }))
    }
}
// [POST create-order]
async function createOrder(req, res) {
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    // kiểm tra cuối order mới nhất thanh toán chưa
    // thanh toán rồi thì tạo mới, không thì bad request.
    const latestOrder = orders.findLast(order => {
        return order.userID === user.id
    })
    if (!latestOrder || latestOrder.paid) {
        try {
            const order = await addOrder(user.id)
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
        productID: req.body.productID,
        quantity: req.body.quantity
    }
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    if (!isValidData(data)) return res.status(400).json({ message: errorMessages.invalidDataType })
    const latestOrder = orders.findLast(order => {
        return order.userID === user.id
    })
    if (latestOrder && !latestOrder.paid) {
        if (latestOrder.products.find(product => {
            return product.productID === data.productID
        })) return res.sendStatus(400)
        try {
            const order = await addOrderDetail(latestOrder.orderID, data.productID, data.quantity)
            return res.json(order)
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            return res.status(500).json({ message: 'error' })
        }
    }
    return res.sendStatus(400)
}
// [POST update-product]
async function updateProduct(req, res) {
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
    const latestOrder = orders.findLast(order => {
        return order.userID === user.id
    })
    if (latestOrder && !latestOrder.paid) {
        if (!latestOrder.products.find(product => {
            return product.productID === data.productID
        })) return res.sendStatus(400)
        try {
            const order = await updateOrderDetail(latestOrder.orderID, data.productID, data.quantity)
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
        productID: req.body.productID
    }
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    if (!isValidData(data)) return res.status(400).json({ message: errorMessages.invalidDataType })
    const latestOrder = orders.findLast(order => {
        return order.userID === user.id
    })
    if (latestOrder && !latestOrder.paid) {
        if (!latestOrder.products.find(product => {
            return product.productID === data.productID
        })) return res.sendStatus(400)
        try {
            const order = await removeOrderDetail(latestOrder.orderID, data.productID)
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
        voucherID: req.body.voucherID
    }
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    const latestOrder = orders.findLast(order => {
        return order.userID === user.id
    })
    const voucher = vouchers.find(item => {
        return (item.voucherID === data.voucherID && item.expiryDate > new Date())
    })
    if (!voucher) return res.status(400).json({ message: errorMessages.voucherInvalid })
    if (latestOrder && !latestOrder.paid) {
        try {
            await addVoucher(latestOrder.orderID, data.voucherID)
            latestOrder.setVoucher(voucher)
            return res.json(latestOrder)
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
        paymentMethod: req.body.paymentMethod
    }
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    if (!isValidData(data)) return res.status(400).json({ message: errorMessages.invalidDataType })
    const latestOrder = orders.findLast(order => {
        return order.userID === user.id
    })
    if (latestOrder && !latestOrder.paid) {
        try {
            if (latestOrder.products.length === 0) return res.sendStatus(400)
            const order = await paidOrder(latestOrder.orderID, data.paymentMethod)
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
    const result = Object.keys(data).every((item) => {
        if (typeof data[item] === 'number' && Number.isInteger(data[item]) && data[item] > 0) return true
        return false;
    })
    return result
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
    updateProduct,
    removeProduct,
    setVoucher,
    makePayment
}