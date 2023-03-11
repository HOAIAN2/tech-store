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
            const images = row['images'].split(',')
            const description = row['description']
            const product = new Product(productID, productName, supplier, category, price, quantity, unitInOrder, discount, images, description)
            products.push(product)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize products data: ${error.message}`)
        throw new Error(`Fail to initialize products data: ${error.message}`)
    }
}

// async function findProduct(name) {
//     const result = []
//     products.forEach((product) => {
//         if (product.productName.includes(name)) result.push(product)
//     })
//     if (result.length === 0) return result
//     else {
//         const queryString = [
//             'SELECT product_id, product_name, suppliers.supplier_name, categories.category_name, price, quantity,',
//             'unit_in_order, discount, images, products.description',
//             'FROM products JOIN suppliers ON products.supplier_id = suppliers.supplier_id',
//             'JOIN categories ON products.category_id = categories.category_id',
//             'WHERE product_name LIKE "%"?"%"'
//         ].join(' ')
//         try {
//             const [rows] = await pool.query(queryString, [name, name, name])
//             rows.forEach(row => {
//                 const productID = row['product_id']
//                 const productName = row['product_name']
//                 const supplier = row['supplier_name']
//                 const category = row['category_name']
//                 const price = row['price']
//                 const quantity = row['quantity']
//                 const unitInOrder = row['unit_in_order']
//                 const discount = row['discount']
//                 const images = row['images']
//                 const description = row['description']
//                 const product = new Product(productID, productName, supplier, category, price, quantity, unitInOrder, discount, images, description)
//                 products.push(product)
//                 result.push(product)
//             })
//             return result
//         } catch (error) {
//             console.log('\x1b[31m%s\x1b[0m', error.message)
//             return []
//         }
//     }
// }


async function findProduct(text, option, brand, indextostart = 0) {
    const result = { index: 0, data: [] }
    products.every((product, index) => {
        if (!brand) {
            if (product.productName.toLocaleLowerCase().includes(text.toLocaleLowerCase()) && index + 1 > indextostart) {
                result.data.push(product)
            }
        } else {
            if (product.productName.toLocaleLowerCase().includes(text.toLocaleLowerCase()) && product.supplier === brand && index + 1 > indextostart) {
                result.data.push(product)
            }
        }
        if (result.data.length === 5 && option === 'less') return false
        if (result.data.length === 41) {
            result.index = index - 1
            return false
        }
        return true
    })


    return result
}


async function createProduct(data) {
    try {
        const queryString = [
            'INSERT INTO store.products (product_name, supplier_id, category_id ,price, quantity, images ,description)',
            'VALUES(?, ?, ?, ?, ?, ?, ?);'
        ].join(' ')
        const queryString1 = [
            'SELECT product_id, product_name, suppliers.supplier_name, categories.category_name, price, quantity,',
            'unit_in_order, discount, images, products.description',
            'FROM products JOIN suppliers ON products.supplier_id = suppliers.supplier_id',
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
        const product = new Product(productID, productName, supplier, category, price, quantity, unitInOrder, discount, images, description)
        return product
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to add product: ${error.message}`)
        throw new Error(`Fail to add product data: ${error.message}`)
    }
}


module.exports = {
    initializeProduct,
    findProduct,
    createProduct,
    products,
}