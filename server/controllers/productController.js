const { products, categories, suppliers , findProduce} = require('../cache')
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


async function searchProduct(req,res) {
    const text = req.query.name.trim()
    if(text == "") return res.json([])
    const product = await findProduce(text)
    res.json(product)
}

module.exports = {
    index,
    getProductByID,
    searchProduct
}