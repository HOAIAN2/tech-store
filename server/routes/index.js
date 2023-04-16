const userRoute = require('./user')
const authRoute = require('./auth')
const productRoute = require('./product')
const orderRoute = require('./order')
const categories = require('./category')
const supplier = require('./supplier')
const comment = require('./comment')

function routes(app) {
    app.use('/api/user', userRoute)
    app.use('/api/auth', authRoute)
    app.use('/api/products', productRoute)
    app.use('/api/order', orderRoute)
    app.use('/api/category', categories)
    app.use('/api/supplier', supplier)
    app.use('/api/comment', comment)
}

module.exports = routes