const { readAccessToken } = require("../controllers/authController")
const { orders, getOrder, addOrder, addOrderDetail, updateOrderDetail } = require("../cache")
const orderErrors = require("./orderErrors.json")


async function createOrder(req, res) {
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    // let time = new Date();
    // time = time.toLocaleTimeString('it-IT')
    const data = {
        userID: user.id,
        productID: req.body.productID,
        productQuantity: req.body.productQuantity,
    }
    // Nếu cùng 1 lúc 1 user cho tồn tại nhiều order thì không cần check này nọ, cứ insert luôn
    // Đoạn dưới từ từ handle
    const dataFormat = formatdata(data);
    if (!dataFormat) return res.status(400);
    const orderinvalit = orders.find((item) => {
        console.log(item.userID, user.id, item.userID === user.id)
        if (item.userID === user.id) {
            return item
        }
    })
    console.log(orders)
    console.log(orderinvalit)

    if (orderinvalit) {
        orderinvalit.products.every(async (item) => {
            if (item.productID === data.productID) {
                const newquantity = item.quantity + 1;
                const order = await updateOrderDetail(newquantity, item.orderID, data.productID)
                orderinvalit.setProduct(data.productID, quantity)
                res.status(200).json(orderinvalit)
            }
            return true
        })
        const order = await addOrderDetail(orderinvalit.orderID, data.productID, data.productQuantity, data.price)
        res.status(200).json(order)
    } else {
        const orderID = await addOrder(data.userID)
        const order = await addOrderDetail(orderID, data.productID, data.productQuantity, data.price)
        console.log(order, orders)
        res.status(200).json(order)
    }

}


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
}