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
            orders.push(order)
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
        const orderID1 = rows[0]['order_id']
        const userID = rows[0]['user_id']
        const orderDate = rows[0]['order_date']
        const paidMethod = rows[0]['paid_method']
        const paid = rows[0]['paid']
        const order = new Order(orderID1, userID, orderDate, paidMethod, paid)
        const products = await pool.query(queryString1, [orderID])
        products[0].forEach(row => {
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


async function addOrder(userID) {
    let newOrder = null
    try {
        const queryString = [
            'INSERT INTO orders(user_id) VALUES(?)'
        ].join(' ')
        const queryString1 = [
            'SELECT order_id, user_id, order_date, payment_methods.name AS paid_method, paid',
            'FROM orders LEFT JOIN payment_methods ON orders.paid_method_id = payment_methods.method_id'
        ].join(' ')
        await pool.query(queryString, [userID])
        const [rows] = await pool.query(queryString1)
        rows.forEach(async (row) => {
            const orderID = row['order_id']
            const userID = row['user_id']
            const orderDate = row['order_date']
            const paidMethod = row['paid_method']
            const paid = row['paid']
            const order = new Order(orderID, userID, orderDate, paidMethod, paid)
            orders.push(order)
            newOrder = order
        })
        return newOrder
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}
async function addOrderDetail(orderID, productID, quantity) {
    const queryString = [
        'INSERT INTO order_details(order_id, product_id, quantity)',
        'VALUE(?, ?, ?)'
    ].join(' ')
    try {
        await pool.query(queryString, [orderID, productID, quantity])
        const order = await getOrder(orderID)
        return order
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}
async function updateOrderDetail(orderID, productID, quantity) {
    const queryString = [
        'UPDATE order_details',
        'SET quantity = ?',
        'WHERE order_id = ? AND product_id = ?'
    ].join(' ')
    try {
        await pool.query(queryString, [quantity, orderID, productID])

    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}
async function removeOrderDetail(orderID, productID) {
    const queryString = [
        'DELETE FROM order_details',
        'WHERE order_id = ? AND product_id = ?'
    ].join(' ')
    try {
        await pool.query(queryString, [orderID, productID])
        const order = await getOrder(orderID)
        return order
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}

module.exports = {
    initializeOrder,
    addOrder,
    getOrder,
    addOrderDetail,
    updateOrderDetail,
    removeOrderDetail,
    orders
}