const { readAccessToken } = require("../controllers/authController")
const { orders, pool, getOrder } = require("../cache")


async function createOrder(req, res) {
    let errorMessages = productErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = productErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    let time = new Date();
    time = time.toLocaleTimeString('it-IT')
    const data = {
        orderDate: time,
        userID: user.id,
        productID: req.body.productID,
        productQuantity: req.body.productQuantity,
        price: req.body.price,
    }
    const dataFormat = formatdata(data);
    if (!dataFormat) return res.status(400);
    const orderinvalit = orders.find((item) => {
        if (item.userID === user.id) {
            return item
        }
    })
    const queryString1 = [
        'INSERT INTO orders (user_id, order_date)',
        'VALUE(?,?)'
    ].join(' ')
    const queryString2 = [
        'INSERT INTO order_details(order_id,product_id,quantity,price)',
        'VALUE(?,?,?,?)'
    ].join(' ')
    const queryString3 = [
        'UPDATE order_details',
        'SET quantity = ?',
        'WHERE order_id = ? AND product_id = ?'
    ].join(' ')
    if (orderinvalit) {
        const quantity = orderinvalit.quantity + 1;
        await pool.query(queryString3, [quantity, orderinvalit.orderID, data.productID])
        const order = await orderinvalit.getOrder(orderinvalit.orderID)
        res.status(200).json(order)
    } else {
        const orderid = await pool.query(queryString1, [user.id, data.orderDate])
        await pool.query(queryString2, [orderid[0].insertId, data.productID, data.productQuantity, data.price])
        const order = await orderinvalit.getOrder(orderinvalit.orderID)
        res.status(200).json(order)
    }

}


function formatdata(data) {
    const rs = data;
    const a = Object.keys(rs).every((item) => {
        if (item === 'product_id' || item === 'price', item === 'product_quantity') {
            return parseInt(rs.item) != NaN ? true : false;
        }
        return true;
    })
    return a
}


module.exports = {
    createOrder,
}