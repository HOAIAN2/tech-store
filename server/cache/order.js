const { Order, OrderCache } = require('../models')
const { pool } = require('./database')
const { vouchers } = require('./voucher')
const { products } = require('./product')

// const orders = []
const orders = new OrderCache('orderID', 10000)

async function initializeOrder() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing orders data...')
    try {
        const queryString = [
            "SELECT orders.order_id, user_id, order_date, payment_methods.name AS paid_method, paid, voucher_id,",
            "JSON_ARRAYAGG(JSON_OBJECT('product_id',order_details.product_id,'quantity',",
            "order_details.quantity,'price', order_details.price, 'discount', order_details.discount,'product_name', product_name)) AS details",
            "FROM order_details JOIN products ON order_details.product_id = products.product_id",
            "JOIN orders ON orders.order_id = order_details.order_id",
            "LEFT JOIN payment_methods ON orders.paid_method_id = payment_methods.method_id",
            "GROUP BY orders.order_id",
            // "ORDER BY orders.order_id DESC"
        ].join(' ')
        const [rows] = await pool.query(queryString)
        rows.forEach(item => {
            const orderID = item['order_id']
            const userID = item['user_id']
            const orderDate = item['order_date']
            const paidMethod = item['paid_method']
            const voucherID = item['voucher_id']
            const paid = item['paid']
            const order = new Order(orderID, userID, orderDate, paidMethod, paid)
            if (voucherID) order.setVoucher(vouchers.find(item => item.voucherID === voucherID))
            item.details.forEach(product => {
                const productID = product['product_id']
                const productName = product['product_name']
                const quantity = product['quantity']
                const price = product['price']
                const discount = product['discount']
                order.addProduct(productID, productName, quantity, price, discount)
            })
            if (paid) order.paidOrder(paidMethod, orderDate)
            orders.add(order)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize orders data: ${error.message}`)
        throw new Error(`Fail to initialize orders data: ${error.message}`)
    }
}
async function selectOrder(orderID) {
    try {
        const queryString = [
            'SELECT orders.order_id, user_id, order_date, payment_methods.name AS paid_method, paid, voucher_id,',
            'order_details.product_id, order_details.quantity, order_details.price, order_details.discount, product_name',
            'FROM orders LEFT JOIN payment_methods ON orders.paid_method_id = payment_methods.method_id',
            'JOIN order_details ON orders.order_id = order_details.order_id',
            'JOIN products ON order_details.product_id = products.product_id',
            'WHERE orders.order_id = ?'
        ].join(' ')
        const [rows] = await pool.query(queryString, [orderID])
        const orderID1 = rows[0]['order_id']
        const userID = rows[0]['user_id']
        const orderDate = rows[0]['order_date']
        const paidMethod = rows[0]['paid_method']
        const voucherID = rows[0]['voucher_id']
        const paid = rows[0]['paid']
        const order = new Order(orderID1, userID, orderDate, paidMethod, paid)
        rows.forEach(row => {
            const productID = row['product_id']
            const productName = row['product_name']
            const quantity = row['quantity']
            const price = row['price']
            const discount = row['discount']
            order.addProduct(productID, productName, quantity, price, discount)
        })
        if (voucherID) order.setVoucher(vouchers.find(item => item.voucherID === voucherID))
        if (order.paid) order.paidOrder(paidMethod, orderDate)
        return order
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}
async function addVoucher(orderID, voucherID) {
    try {
        const queryString = [
            'UPDATE orders',
            'SET voucher_id = ?',
            'WHERE order_id = ?'
        ].join(' ')
        await pool.query(queryString, [voucherID, orderID])
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
        const order = await selectOrder(orderID)
        order.products.forEach(product => {
            const delta = product.quantity * -1
            const tempProduct = products.products.find(item => item.productID === product.productID)
            tempProduct.updateUnitInOrder(delta)
            tempProduct.updateQuantity(delta)
            tempProduct.updateSoldQuantity(product.quantity)
        })
        orders.replace(order)
        return order
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}


async function addOrder(userID, productID, quantity) {
    let newOrder = null
    try {
        const queryString = [
            'INSERT INTO orders(user_id) VALUES(?)'
        ].join(' ')
        const queryString1 = [
            'SELECT order_id, user_id, order_date, payment_methods.name AS paid_method, paid',
            'FROM orders LEFT JOIN payment_methods ON orders.paid_method_id = payment_methods.method_id',
            'WHERE user_id = ?',
            'ORDER BY order_id DESC LIMIT 1'
        ].join(' ')
        await pool.query(queryString, [userID])
        const [rows] = await pool.query(queryString1, [userID])
        const orderID = rows[0]['order_id']
        const orderDate = rows[0]['order_date']
        const paidMethod = rows[0]['paid_method']
        const paid = rows[0]['paid']
        const order = new Order(orderID, userID, orderDate, paidMethod, paid)
        orders.add(order)
        newOrder = await addOrderDetail(order.orderID, productID, quantity)
        return newOrder
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}
async function addOrderDetail(orderID, productID, quantity) {
    const product = products.products.find(item => item.productID === productID)
    const queryString = [
        'INSERT INTO order_details(order_id, product_id, quantity)',
        'VALUE(?, ?, ?)'
    ].join(' ')
    try {
        await pool.query(queryString, [orderID, productID, quantity])
        const order = orders.find(orderID)
        order.addProduct(product.productID, product.productName, quantity)
        product.updateUnitInOrder(quantity)
        products.products.sort((x, y) => y.unitInOrder - x.unitInOrder)
        return order
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}
async function updateOrderDetail(orderID, productID, quantity) {
    const product = products.products.find(item => item.productID === productID)
    const queryString = [
        'UPDATE order_details',
        'SET quantity = ?',
        'WHERE order_id = ? AND product_id = ?'
    ].join(' ')
    try {
        await pool.query(queryString, [quantity, orderID, productID])
        const order = orders.find(orderID)
        let delta = 0
        for (let index = 0; index < order.products.length; index++) {
            if (order.products[index].productID === productID) {
                delta = quantity - order.products[index].quantity
                break
            }
        }
        order.products.find(product => product.productID === productID).setQuantity(quantity)
        product.updateUnitInOrder(delta)
        products.products.sort((x, y) => y.unitInOrder - x.unitInOrder)
        return order
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}
async function removeOrderDetail(orderID, productID) {
    const queryString = [
        'DELETE FROM order_details',
        'WHERE order_id = ? AND product_id IN (?)'
    ].join(' ')
    try {
        await pool.query(queryString, [orderID, productID])
        const order = orders.find(orderID)
        productID.forEach(id => {
            const productInOrder = order.products.find(item => item.productID === id)
            const delta = productInOrder.quantity * -1
            order.removeProduct(id)
            const product = products.products.find(item => item.productID === id)
            product.updateUnitInOrder(delta)
        })
        products.products.sort((x, y) => y.unitInOrder - x.unitInOrder)
        return order
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}

module.exports = {
    initializeOrder,
    addOrder,
    addOrderDetail,
    updateOrderDetail,
    removeOrderDetail,
    addVoucher,
    paidOrder,
    orders
}
