const { categories } = require('../cache')

async function getCategories(req, res) {
    res.json(categories)
}


module.exports = {
    getCategories,
}