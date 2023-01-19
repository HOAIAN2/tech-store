const userRoute = require('./user')
const authRoute = require('./auth')

function routes(app) {
    app.use('/api/user', userRoute)
    app.use('/api/auth', authRoute)
}

module.exports = routes