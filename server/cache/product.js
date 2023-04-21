const { Product } = require('../models')
const { pool } = require('./database')

const products = []

async function initializeProduct() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing products data...')
    try {
        const queryString = [
            'SELECT products.product_id, product_name, suppliers.supplier_name, products.supplier_id, categories.category_name, price, quantity,',
            'unit_in_order, discount, images, products.description, rates.rating, rates.rating_count, comments.comment_count',
            'FROM products JOIN suppliers ON products.supplier_id = suppliers.supplier_id',
            'LEFT JOIN (SELECT ratings.product_id, AVG(rate) AS rating, COUNT(*) AS rating_count FROM ratings GROUP BY ratings.product_id) AS rates ON rates.product_id = products.product_id ',
            'LEFT JOIN (SELECT comments.product_id, COUNT(*) AS comment_count FROM comments GROUP BY comments.product_id) AS comments ON comments.product_id = products.product_id ',
            'JOIN categories ON products.category_id = categories.category_id',
            'ORDER BY products.unit_in_order DESC'
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
            const images = row['images'].split(',')
            const description = row['description']
            const rating = row['rating']
            const ratingCount = row['rating_count']
            const supplierID = row['supplier_id']
            const commentCount = row['comment_count']
            const product = new Product(productID, productName, supplier, category, price, quantity, unitInOrder, discount, images, description, rating, ratingCount, supplierID, commentCount)
            products.push(product)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize products data: ${error.message}`)
        throw new Error(`Fail to initialize products data: ${error.message}`)
    }
}

async function createProduct(data) {
    try {
        const queryString = [
            'INSERT INTO store.products (product_name, supplier_id, category_id ,price, quantity, images ,description)',
            'VALUES(?, ?, ?, ?, ?, ?, ?);'
        ].join(' ')
        const queryString1 = [
            'SELECT products.product_id, product_name, suppliers.supplier_name, products.supplier_id, categories.category_name, price, quantity,',
            'unit_in_order, discount, images, products.description, rates.rating, rates.rating_count, comments.comment_count',
            'FROM products JOIN suppliers ON products.supplier_id = suppliers.supplier_id',
            'LEFT JOIN (SELECT ratings.product_id, AVG(rate) AS rating, COUNT(*) AS rating_count FROM ratings GROUP BY ratings.product_id) AS rates ON rates.product_id = products.product_id ',
            'LEFT JOIN (SELECT comments.product_id, COUNT(*) AS comment_count FROM comments GROUP BY comments.product_id) AS comments ON comments.product_id = products.product_id ',
            'JOIN categories ON products.category_id = categories.category_id',
            'ORDER BY product_id DESC LIMIT 1;'
        ].join(' ')
        await pool.query(queryString, [
            data.productName,
            data.supplierID,
            data.categoryID,
            data.price,
            data.quantity,
            data.images,
            data.description
        ])
        const [newProduct] = await pool.query(queryString1)
        const productID = newProduct[0]['product_id']
        const productName = newProduct[0]['product_name']
        const supplier = newProduct[0]['supplier_name']
        const category = newProduct[0]['category_name']
        const price = newProduct[0]['price']
        const quantity = newProduct[0]['quantity']
        const unitInOrder = newProduct[0]['unit_in_order']
        const discount = newProduct[0]['discount']
        const images = newProduct[0]['images'].split(',')
        const description = newProduct[0]['description']
        const rating = row['rating']
        const ratingCount = row['rating_count']
        const supplierID = row['supplier_id']
        const commentCount = row['comment_count']
        const product = new Product(productID, productName, supplier, category, price, quantity, unitInOrder, discount, images, description, rating, ratingCount, supplierID, commentCount)
        return product
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to add product: ${error.message}`)
        return null
    }
}

module.exports = {
    initializeProduct,
    createProduct,
    products,
}