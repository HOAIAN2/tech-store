const { users, findUser } = require('../cache')
const { readAccessToken } = require('./authController')

async function index(req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const data = readAccessToken(token)
    const user = await findUser(data.username)
    if (user) return res.json(user.ignoreProps('hashedPassword', 'role'))
    else return res.sendStatus(404)
}

module.exports = {
    index
}