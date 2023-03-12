const { Order } = require('../models')
const { pool } = require('./database')

const orders = []

async function initializeOrder() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing orders data...')
    try {
        const queryString = [
            'SELECT order_id, user_id, order_date, payment_methods.name AS paid_method, paid',
            'FROM orders LEFT JOIN payment_methods ON orders.paid_method_id = payment_methods.method_id'
        ].join(' ')
        const queryString1 = [
            'SELECT order_details.product_id, order_details.quantity, products.price, product_name', // replace products.price later
            'FROM order_details JOIN products ON order_details.product_id = products.product_id',
            'WHERE order_id = ?'
        ].join(' ')
        const [rows] = await pool.query(queryString)
        rows.forEach(row => {
            const orderID = row['order_id']
            const userID = row['user_id']
            const orderDate = row['order_date']
            const paidMethod = row['paid_method']
            const paid = row['paid']
            const order = new Order(orderID, userID, orderDate, paidMethod, paid)
            const [rows] = pool.query(queryString1, [orderID])
            rows.forEach(row => {
                const productID = row['product_id']
                const productName = row['product_name']
                const quantity = row['quantity']
                const price = row['price']
                order.addProduct(productID, productName, quantity, price)
            })
            if (order.paid) order.paidOrder(paidMethod, orderDate)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize orders data: ${error.message}`)
        throw new Error(`Fail to initialize orders data: ${error.message}`)
    }
}
module.exports = {
    initializeOrder,
    orders
}