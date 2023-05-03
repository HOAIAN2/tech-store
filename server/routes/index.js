const userRoute = require('./user')
const authRoute = require('./auth')
const productRoute = require('./product')
const orderRoute = require('./order')
const categoriesRoute = require('./category')
const supplierRoute = require('./supplier')
const commentRoute = require('./comment')
const ratingRoute = require('./rating')

function routes(app) {
    app.use('/api/user', userRoute)
    app.use('/api/auth', authRoute)
    app.use('/api/products', productRoute)
    app.use('/api/order', orderRoute)
    app.use('/api/category', categoriesRoute)
    app.use('/api/supplier', supplierRoute)
    app.use('/api/comment', commentRoute)
    app.use('/api/rating', ratingRoute)
}

module.exports = routes