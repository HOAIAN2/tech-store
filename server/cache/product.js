const { Product } = require('../models')
const { pool } = require('./database')

const products = []

async function initializeProduct() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing products data...')
    try {
        const queryString = [
            'SELECT product_id, product_name, suppliers.supplier_name, categories.category_name, price, quantity,',
            'unit_in_order, discount, images, products.description',
            'FROM products JOIN suppliers ON products.supplier_id = suppliers.supplier_id',
            'JOIN categories ON products.category_id = categories.category_id',
            'ORDER BY unit_in_order DESC'
        ].join(' ')
        const [rows] = await pool.query(queryString)
        rows.forEach(row => {
            const productID = row['product_id']
            const productName = row['product_name']
            const supplier = row['supplier_name']
            const category = row['category_name']
            const price = row['price']
            const quantity = row['quantity']
            const unitInOrder = row['unit_in_order']
            const discount = row['discount']
            const images = row['images']
            const description = row['description']
            const product = new Product(productID, productName, supplier, category, price, quantity, unitInOrder, discount, images, description)
            products.push(product)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize products data: ${error.message}`)
        throw new Error(`Fail to initialize products data: ${error.message}`)
    }
}

async function findProduct(name) {
    const result = []
    products.forEach((product) => {
        if (product.productName.includes(name)) result.push(product)
    })
    if (result.length === 0) return result
    else {
        const queryString = [
            'SELECT product_id, product_name, suppliers.supplier_name, categories.category_name, price, quantity,',
            'unit_in_order, discount, images, products.description',
            'FROM products JOIN suppliers ON products.supplier_id = suppliers.supplier_id',
            'JOIN categories ON products.category_id = categories.category_id',
            'WHERE product_name LIKE "%"?"%"',
        ].join(' ')
        try {
            const [rows] = await pool.query(queryString, [name, name, name])
            rows.forEach(row => {
                const productID = row['product_id']
                const productName = row['product_name']
                const supplier = row['supplier_name']
                const category = row['category_name']
                const price = row['price']
                const quantity = row['quantity']
                const unitInOrder = row['unit_in_order']
                const discount = row['discount']
                const images = row['images']
                const description = row['description']
                const product = new Product(productID, productName, supplier, category, price, quantity, unitInOrder, discount, images, description)
                products.push(product)
                result.push(product)
            })
            return result
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            return []
        }
    }
}

module.exports = {
    initializeProduct,
    findProduct,
    products
}