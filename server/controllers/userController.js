const { users } = require('../cache')
const { readAccessToken } = require('./authController')

function index(req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const data = readAccessToken(token)
    const user = users.find(user => {
        return user.username === data.username
    })
    if (user) return res.json(user.ignoreProps('hashedPassword', 'role'))
    else return res.sendStatus(404)
}

module.exports = {
    index
}