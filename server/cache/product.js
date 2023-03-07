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


async function findProduct(text, option, brand , indextostart = 0) {
    const result = []
    products.every((product, index) => {
        if (!brand) {
            if (product.productName.toLocaleLowerCase().includes(text.toLocaleLowerCase()) && product.productID > indextostart) {
                result.push(product)
            }
        } else {
            if (product.productName.toLocaleLowerCase().includes(text.toLocaleLowerCase()) && product.supplier === brand  && product.productID > indextostart) {
                result.push(product)
            }
        }
        if (result.length === 5 && option === 'less') return false
        if (result.length === 41) return false
        return true
    })

    if (option === 'more') {
        if (result.length < 41) {
            if (!brand) {
                const queryString = [
                    'SELECT product_id, product_name, suppliers.supplier_name, categories.category_name, price, quantity,',
                    'unit_in_order, discount, images, products.description',
                    'FROM products JOIN suppliers ON products.supplier_id = suppliers.supplier_id',
                    'JOIN categories ON products.category_id = categories.category_id',
                    'WHERE product_name LIKE "%"?"%" AND product_id > ?',
                    'ORDER BY product_id ASC;'
                ].join(' ')
                try {
                    const index = result[result.length - 1].productID
                    const [rows] = await pool.query(queryString, [text, index])

                    rows.every((product) => {
                        const productID = product['product_id']
                        const productName = product['product_name']
                        const supplier = product['supplier_name']
                        const category = product['category_name']
                        const price = product['price']
                        const quantity = product['quantity']
                        const unitInOrder = product['unit_in_order']
                        const discount = product['discount']
                        const images = product['images']
                        const description = product['description']
                        const newproduct = new Product(productID, productName, supplier, category, price, quantity, unitInOrder, discount, images, description)
                        products.push(newproduct)
                        result.push(newproduct)
                        if (result.length >= 41) return false
                        return true
                    })
                } catch (error) {
                    console.log('\x1b[31m%s\x1b[0m', error.message)
                }
            } else {
                const queryString1 = [
                    'SELECT product_id, product_name, suppliers.supplier_name, categories.category_name, price, quantity,',
                    'unit_in_order, discount, images, products.description',
                    'FROM products JOIN suppliers ON products.supplier_id = suppliers.supplier_id',
                    'JOIN categories ON products.category_id = categories.category_id',
                    'WHERE product_name LIKE "%"?"%" AND product_id > ? and suppliers.supplier_name = ?',
                    'ORDER BY product_id ASC'
                ].join(' ')
                try {
                    const index = result[result.length - 1]?.productID
                    const [rows] = await pool.query(queryString1, [text, index, brand])
                    rows.every((product) => {
                        const productID = product['product_id']
                        const productName = product['product_name']
                        const supplier = product['supplier_name']
                        const category = product['category_name']
                        const price = product['price']
                        const quantity = product['quantity']
                        const unitInOrder = product['unit_in_order']
                        const discount = product['discount']
                        const images = product['images']
                        const description = product['description']
                        const newproduct = new Product(productID, productName, supplier, category, price, quantity, unitInOrder, discount, images, description)
                        products.push(newproduct)
                        result.push(newproduct)
                        if (result.length >= 41) return false
                        return true
                    })
                } catch (error) {
                    console.log('\x1b[31m%s\x1b[0m', error.message)
                }
            }
        }
    }
    return result
}

module.exports = {
    initializeProduct,
    findProduct,
    products,
}