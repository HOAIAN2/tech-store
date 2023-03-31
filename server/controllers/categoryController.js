const { categories } = require('../cache')

async function getCategories(req, res) {
    res.json(categories.filter(category => {
        return category.icon !== null
    }))
}


module.exports = {
    getCategories,
}