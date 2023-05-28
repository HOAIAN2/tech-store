const Cache = require('js-simple-cache')
const { Voucher } = require('../models')
const { pool } = require('./database')

const vouchers = new Cache('voucherID', 100000)

async function initializeVoucher() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing vouchers data...')
    try {
        const queryString = [
            'SELECT voucher_id, voucher_name, voucher_discount, expiry_date, description FROM vouchers'
        ].join(' ')
        const [rows] = await pool.query(queryString)
        rows.forEach(row => {
            const voucherID = row['voucher_id']
            const voucherName = row['voucher_name']
            const voucherDiscount = row['voucher_discount']
            const expiryDate = row['expiry_date']
            const description = row['description']
            const voucher = new Voucher(voucherID, voucherName, voucherDiscount, expiryDate, description)
            vouchers.set(voucher)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize vouchers data: ${error.message}`)
        throw new Error(`Line16 user.js: Fail to initialize vouchers data: ${error.message}`)
    }
}

module.exports = {
    initializeVoucher,
    vouchers
}