const { Supplier } = require('../models')
const { pool } = require('./database')

const suppliers = []

async function initializeSupplier() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing supplires data...')
    try {
        const queryString = [
            'SELECT supplier_id, supplier_name, address, email, phone_number',
            'FROM suppliers'
        ].join(' ')
        const [rows] = await pool.query(queryString)
        rows.forEach(row => {
            const supplierID = row['supplier_id']
            const supplierName = row['supplier_name']
            const address = row['address']
            const email = row['email']
            const phoneNumber = row['phone_number']
            const supplier = new Supplier(supplierID, supplierName, address, email, phoneNumber)
            suppliers.push(supplier)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize suppliers data: ${error.message}`)
        throw new Error(`Fail to initialize suppliers data: ${error.message}`)
    }
}


module.exports = {
    initializeSupplier,
    suppliers
}