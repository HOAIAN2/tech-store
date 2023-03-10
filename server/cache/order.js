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
            'SELECT order_details.product_id, order_details.quantity, order_details.price, order_details.discount, product_name', // Mấy cái thanh toán rồi thì có price, chỉ handle mấy cái chưa thanh toán
            'FROM order_details JOIN products ON order_details.product_id = products.product_id',
            'WHERE order_id = ?'
        ].join(' ')
        const [rows] = await pool.query(queryString)
        rows.forEach(async (row) => {
            const orderID = row['order_id']
            const userID = row['user_id']
            const orderDate = row['order_date']
            const paidMethod = row['paid_method']
            const paid = row['paid']
            const order = new Order(orderID, userID, orderDate, paidMethod, paid)
            const [rows] = await pool.query(queryString1, [orderID])
            rows.forEach(row => {
                const productID = row['product_id']
                const productName = row['product_name']
                const quantity = row['quantity']
                const price = row['price']
                const discount = row['discount']
                order.addProduct(productID, productName, quantity, price, discount)
            })
            if (order.paid) order.paidOrder(paidMethod, orderDate)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize orders data: ${error.message}`)
        throw new Error(`Fail to initialize orders data: ${error.message}`)
    }
}
function findOrder(orderID) {
    orders.findIndex(order => {
        return order.orderID === orderID
    })
}
async function getOrder(orderID) {
    try {
        const queryString = [
            'SELECT order_id, user_id, order_date, payment_methods.name AS paid_method, paid',
            'FROM orders LEFT JOIN payment_methods ON orders.paid_method_id = payment_methods.method_id',
            'WHERE order_id = ?'
        ].join(' ')
        const queryString1 = [
            'SELECT order_details.product_id, order_details.quantity, order_details.price, order_details.discount, product_name', // Mấy cái thanh toán rồi thì có price, chỉ handle mấy cái chưa thanh toán
            'FROM order_details JOIN products ON order_details.product_id = products.product_id',
            'WHERE order_id = ?'
        ].join(' ')
        const [rows] = await pool.query(queryString, [orderID])
        const orderID = rows[0]['order_id']
        const userID = rows[0]['user_id']
        const orderDate = rows[0]['order_date']
        const paidMethod = rows[0]['paid_method']
        const paid = rows[0]['paid']
        const order = new Order(orderID, userID, orderDate, paidMethod, paid)
        const products = await pool.query(queryString1, [orderID])
        products.forEach(row => {
            const productID = row['product_id']
            const productName = row['product_name']
            const quantity = row['quantity']
            const price = row['price']
            const discount = row['discount']
            order.addProduct(productID, productName, quantity, price, discount)
        })
        if (order.paid) order.paidOrder(paidMethod, orderDate)
        orders.splice(findOrder(orderID), 1)
        orders.push(order)
        return order
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}
async function paidOrder(orderID, paymentMethodID) {
    try {
        const queryString = [
            'UPDATE orders',
            'SET paid = 1, paid_method_id = ?, order_date = NOW()',
            'WHERE order_id = ?'
        ].join(' ')
        await pool.query(queryString, [paymentMethodID, orderID])
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}
module.exports = {
    initializeOrder,
    orders
}