const { Order } = require('../models')
const { pool } = require('./database')
const { vouchers } = require('./voucher')
const { products } = require('./product')

const orders = []

async function initializeOrder() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing orders data...')
    try {
        const queryString = [
            'SELECT orders.order_id, user_id, order_date, payment_methods.name AS paid_method, paid, voucher_id,',
            'order_details.product_id, order_details.quantity, order_details.price, order_details.discount, product_name',
            'FROM orders LEFT JOIN payment_methods ON orders.paid_method_id = payment_methods.method_id',
            'JOIN order_details ON orders.order_id = order_details.order_id',
            'JOIN products ON order_details.product_id = products.product_id',
            'ORDER BY orders.order_id ASC'
        ].join(' ')
        const [rows] = await pool.query(queryString)
        groupOrder()
        function groupOrder() {
            if (rows.length ===0) return
            let order = null
            let currentID = rows[0]['order_id']
            for (let index = 0; index < rows.length; index++) {
                if (rows[index]['order_id'] === currentID) {
                    if (currentID == rows[0]['order_id'] && order === null) {
                        const orderID = rows[index]['order_id']
                        const userID = rows[index]['user_id']
                        const orderDate = rows[index]['order_date']
                        const paidMethod = rows[index]['paid_method']
                        const voucherID = rows[index]['voucher_id']
                        const paid = rows[index]['paid']
                        order = new Order(orderID, userID, orderDate, paidMethod, paid)
                        if (voucherID) order.setVoucher(vouchers.find(item => item.voucherID === voucherID))
                        const productID = rows[index]['product_id']
                        const productName = rows[index]['product_name']
                        const quantity = rows[index]['quantity']
                        const price = rows[index]['price']
                        const discount = rows[index]['discount']
                        order.addProduct(productID, productName, quantity, price, discount)
                        orders.push(order)
                    }
                    else {
                        const productID = rows[index]['product_id']
                        const productName = rows[index]['product_name']
                        const quantity = rows[index]['quantity']
                        const price = rows[index]['price']
                        const discount = rows[index]['discount']
                        order.addProduct(productID, productName, quantity, price, discount)
                        if (index === rows.length - 1) order.paidOrder(order.paidMethod, order.orderDate)
                    }
                }
                else {
                    if (order.paid) order.paidOrder(order.paidMethod, order.orderDate)
                    currentID = rows[index]['order_id']
                    const orderID = rows[index]['order_id']
                    const userID = rows[index]['user_id']
                    const orderDate = rows[index]['order_date']
                    const paidMethod = rows[index]['paid_method']
                    const voucherID = rows[index]['voucher_id']
                    const paid = rows[index]['paid']
                    order = new Order(orderID, userID, orderDate, paidMethod, paid)
                    if (voucherID) order.setVoucher(vouchers.find(item => item.voucherID === voucherID))
                    const productID = rows[index]['product_id']
                    const productName = rows[index]['product_name']
                    const quantity = rows[index]['quantity']
                    const price = rows[index]['price']
                    const discount = rows[index]['discount']
                    order.addProduct(productID, productName, quantity, price, discount)
                    orders.push(order)
                }
            }
            return orders
        }
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize orders data: ${error.message}`)
        throw new Error(`Fail to initialize orders data: ${error.message}`)
    }
}
function findOrderIndex(orderID) {
    return orders.findIndex(order => {
        return order.orderID === orderID
    })
}
async function getOrder(orderID) {
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
        orders[findOrderIndex(orderID)] = order
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
        const order = await getOrder(orderID)
        order.products.forEach(product => {
            const delta = product.quantity * -1
            const tempProduct = products.products.find(item => item.productID === product.productID)
            tempProduct.updateUnitInOrder(delta)
            tempProduct.updateQuantity(delta)
            tempProduct.updateSoldQuantity(product.quantity)
        })
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
        orders.push(order)
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
        const order = orders.find(item => item.orderID === orderID)
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
        const order = orders.find(item => item.orderID === orderID)
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
        const order = orders.find(item => item.orderID === orderID)
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
    getOrder,
    addOrderDetail,
    updateOrderDetail,
    removeOrderDetail,
    addVoucher,
    paidOrder,
    orders
}
