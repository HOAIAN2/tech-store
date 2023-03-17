const userRoute = require('./user')
const authRoute = require('./auth')
const productRoute = require('./product')
const orderRoute = require('./order')

function routes(app) {
    app.use('/api/user', userRoute)
    app.use('/api/auth', authRoute)
    app.use('/api/products', productRoute)
    app.use('/api/order', orderRoute)
}

module.exports = routes