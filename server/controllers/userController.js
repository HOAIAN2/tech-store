const { users } = require('../cache')

function index(req, res) {
    res.json(users[0].ignoreProps('hashedPassword'))
}

module.exports = {
    index
}