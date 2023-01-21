const { users } = require('../cache')

function index(req, res) {
    res.json(users)
}

module.exports = {
    index
}