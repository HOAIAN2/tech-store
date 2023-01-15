const userRoute = require('./user')

function routes(app) {
    app.use('/api/user', userRoute)
}

module.exports = routes