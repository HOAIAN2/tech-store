const { users } = require('../cache')

function index(req, res) {
    res.json(users.map(user=>{
        return user.ignoreProps('hashedPassword')
    }))
}

module.exports = {
    index
}