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

async function findProduce(name) {
    const product = products.find((data) => { data.productName.includes(name) || data.category.includes(name) || data.supplier.includes(name) })
    if (!product) {
        const queryString = [
            'SELECT product_name, images , price',
            'FROM products JOIN suppliers ON products.supplier_id = suppliers.supplier_id',
            'JOIN categories ON products.category_id = categories.category_id',
            'WHERE product_name LIKE "%"?"%" OR suppliers.supplier_name LIKE "%"?"%" OR categories.category_name LIKE "%"?"%"',
            'LIMIT 5,5'
        ].join(' ')
        try {
            const [rows] = await pool.query(queryString, [name,name,name])
            return rows
        } catch (error) {
          return {data: []}
        }
    }
    return product
}

async function getSuppliersCategories_Name() {
    const queryString1 = 'select supplier_name from suppliers;';
    const queryString2 = 'select category_name  from categories;';

    try {
        const [rows1] = await pool.query(queryString1)
        const [rows2] = await pool.query(queryString2)
        return {rows1 , rows2}
    } catch (error) {
        sole.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(error.message)
    }
}

module.exports = {
    initializeProduct,
    findProduce,
    getSuppliersCategories_Name,
    products
}