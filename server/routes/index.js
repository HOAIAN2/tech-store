const userRoute = require('./user')
const authRoute = require('./auth')
const productRoute = require('./product')

function routes(app) {
    app.use('/api/user', userRoute)
    app.use('/api/auth', authRoute)
    app.use('/api/products', productRoute)
}

module.exports = routes