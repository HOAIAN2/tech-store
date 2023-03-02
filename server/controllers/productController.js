const { products, categories, suppliers, findProduct } = require('../cache')
const productErrors = require('./productErrors.json')

// [GET home]
function index(req, res) {
    const groupProduct = {}
    categories.forEach(category => {
        groupProduct[category.categoryName] = []
    })
    Object.keys(groupProduct).forEach(group => {
        const temp = products.filter(product => product.category === group)
        groupProduct[group] = [...temp]
    })
    Object.keys(groupProduct).forEach(group => {
        groupProduct[group] = groupProduct[group].map(product => {
            return product.ignoreProps('unitInOrder', 'quantity')
        })
    })
    return groupProduct
}
//[GET product]
function getProductByID(req, res) {
    let errorMessages = productErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = productErrors.vi
    const productID = parseInt(req.query.id)
    if (!productID) return res.status(400).json({ message: errorMessages.invalidQuery })
    const product = products.find(product => {
        return product.productID === productID
    })
    if (product) return res.json(product.ignoreProps('unitInOrder', 'quantity'))
    else return res.status(404)
}


async function searchProduct(req, res) {
    const options = ['get5item', 'get40item']
    const text = req.query.name?.trim()
    const option = req.query.option?.trim()
    if (text === "") return res.json([])
    if (!options.includes(option)) return res.sendStatus(400)
    if (option === 'get5item') {
        const result = await findProduct(text,option)
        return res.json(result.map(product => product.ignoreProps('unitInOrder', 'quantity')))
    }
    else {
        const result = await findProduct(text, option)
        return res.json(result.map(product => product.ignoreProps('unitInOrder', 'quantity')))
    }
}

async function getSuppliersCategories(req, res) {
    const data = {
        categories: categories.map(category => category.categoryName),
        suppliers: suppliers.map(supplier => supplier.supplierName)
    }
    res.json(data)
}

module.exports = {
    index,
    getProductByID,
    searchProduct,
    getSuppliersCategories
}