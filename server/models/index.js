const User = require('./user')
const Category = require('./category')
const Supplier = require('./supplier')
const Product = require('./product')
const Order = require('./order')
const Voucher = require('./voucher')
const Comment = require('./comment')
const { Cache, OrderCache } = require('./cache')

module.exports = {
    User: User,
    Category: Category,
    Supplier: Supplier,
    Product: Product,
    Order: Order,
    Voucher: Voucher,
    Comment: Comment,
    Cache: Cache,
    OrderCache: OrderCache
}