const { readAccessToken } = require("../controllers/authController")
const { orders, getOrder, addOrder, addOrderDetail, updateOrderDetail } = require("../cache")
const orderErrors = require("./orderErrors.json")

// [POST create-order]
async function createOrder(req, res) {
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    // kiểm tra cuối order mới nhất thanh toán chưa
    // thanh toán rồi thì tạo mới, không thì bad request.
    const lastOrder = orders.findLast(order => {
        return order.userID === user.id
    })
    if (!lastOrder || lastOrder.paid === 1) {
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
    const lastOrder = orders.findLast(order => {
        console.log(order)
        return order.userID === user.id
    })
    console.log(lastOrder)
    if (lastOrder && lastOrder.paid === 0) {
        if (lastOrder.products.find(product => {
            return product.productID === data.productID
        })) return res.sendStatus(400)
        try {
            const order = await addOrderDetail(lastOrder.orderID, data.productID, data.quantity)
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
    const lastOrder = orders.findLast(order => {
        console.log(order)
        return order.userID === user.id
    })
    console.log(lastOrder)
    if (lastOrder && lastOrder.paid === 0) {
        if (!lastOrder.products.find(product => {
            return product.productID === data.productID
        })) return res.sendStatus(400)
        try {
            const order = await updateOrderDetail(lastOrder.orderID, data.productID, data.quantity)
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
    const lastOrder = orders.findLast(order => {
        console.log(order)
        return order.userID === user.id
    })
    console.log(lastOrder)
    if (lastOrder && lastOrder.paid === 0) {
        if (!lastOrder.products.find(product => {
            return product.productID === data.productID
        })) return res.sendStatus(400)
        try {
            const order = await removeOrderDetail(lastOrder.orderID, data.productID)
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
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    //
}

// middleware,..
function formatdata(data) {
    const rs = data;
    const a = Object.keys(rs).every((item) => {
        if (rs[item]) {
            if (item === 'productID' || item === 'price', item === 'productQuantity') {
                return parseInt(rs.item) != NaN ? true : false;
            }
            return true
        }
        return false;
    })
    return a
}


module.exports = {
    createOrder,
    addProduct,
    updateProduct,
    removeProduct,
    makePayment
}