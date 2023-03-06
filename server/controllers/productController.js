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
    const options = ['less', 'more']
    const sortBys = ['price', 'hot', 'top-sell']
    const sortModes = ['asc', 'desc']
    const text = req.query.name?.trim()
    const option = req.query.option?.trim()
    const sortBy = req.query.sortBy?.trim()
    const sortMode = req.query.sortMode?.trim()
    const brand = req.query.brand?.trim()
    const page = parseInt(req.query.page)
    if (text === "") return res.json([])
    if (!options.includes(option)) return res.sendStatus(400)

    const result = await findProduct(text, option, brand)
    if (result) {
        // /api/products/search?name=...&option=less , co nhieu tra nhieu
        if (option === 'less') {
            return res.json(result.map((product) => { return product.ignoreProps('unitInOrder', 'quantity') }))
        }
        // /api/products/search?name=...&option=more , tra 40 product ngau nhien
        // /api/products/search?name=...&option=more&brand=... , lay product theo brand
        if (option === 'more') {
            // /api/products/search?name=...&option=more&brand=...&sortBy=price/hot&sortMode=asc/desc
            if (sortBy === 'price') {
                const resultsort = handlesort(result, sortMode, sortBy)
                return res.json(resultsort.map((product) => { return product.ignoreProps('unitInOrder', 'quantity') }))
            }
            if (sortBy === 'hot') {
                const resultsort = handlesort(result, sortMode, sortBy)
                return res.json(resultsort.map((product) => { return product.ignoreProps('unitInOrder', 'quantity') }))
            }
            // sort theo top sell lam gio hang xong roi lam
            return res.json(result.map((product) => { return product.ignoreProps('unitInOrder', 'quantity') }))
        }
    }

    function handlesort(data, sortMode, sortBy) {
        if (sortMode === 'asc') {
            const resultsortasc = data.sort((product1, product2) => {
                if (sortBy === 'price') return product1.price - product2.price
                if (sortBy === 'hot') return product1.unitInOrder - product2.unitInOrder
            })
            return resultsortasc
        }
        if (sortMode === 'desc') {
            const resultsortdesc = data.sort((product1, product2) => {
                if (sortBy === 'price') return product2.price - product1.price
                if (sortBy === 'hot') return product2.unitInOrder - product1.unitInOrder
            })
            return resultsortdesc
        }
        return []
    }
    return res.json([])
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