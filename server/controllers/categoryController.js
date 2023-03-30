const { getcategory } = require('../cache')

async function getcategories(req, res) {
    const rs = await getcategory()
    if (rs) {
        res.json(rs)
    }
    res.status(500)
}


module.exports = {
    getcategories,
}