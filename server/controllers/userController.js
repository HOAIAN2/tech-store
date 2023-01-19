const { User } = require('../models')

function index(req, res) {
    const user = new User(1, 'hoaian_admin', 'Hoài Ân', 'Lê', '$2a$10$kFM0WGYP4jN52ZJw1bafPeK/kF0RVN30iKyteLxC/vnGjqEP83DI6')
    res.json(user)
}

module.exports = {
    index
}