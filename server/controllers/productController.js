const { refreshTokens, products, categories, suppliers, findProduct, findUser } = require('../cache')
const { readAccessToken } = require("./authController")
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
// [GET search]
async function searchProduct(req, res) {
    const options = ['less', 'more']
    const sortBys = ['price', 'hot', 'top-sell']
    const sortModes = ['asc', 'desc']
    const text = req.query.name?.trim()
    const option = req.query.option?.trim()
    const sortBy = req.query.sortBy?.trim()
    const sortMode = req.query.sortMode?.trim()
    const brand = req.query.brand?.trim()
    let indextostart = parseInt(req.query.nextindex)
    const page = parseInt(req.query.page)
    if (!text) return res.json([])
    if (text === "") return res.json([])
    if (!options.includes(option)) return res.sendStatus(400)
    if (!indextostart) indextostart = 0

    const result = await findProduct(text, option, brand, indextostart)
    if (result) {
        // /api/products/search?name=...&option=less , co nhieu tra nhieu
        if (option === 'less') {
            return res.json(result.data.map((product) => { return product.ignoreProps('unitInOrder', 'quantity', 'description', 'discount', 'supplier', 'category') }))
        }
        // /api/products/search?name=...&option=more , tra 40 product ngau nhien
        // /api/products/search?name=...&option=more&brand=... , lay product theo brand
        if (option === 'more') {
            const rs = { indexnext: false }
            if (result.data.length >= 41) {
                result.data.pop()
                rs.indexnext = result.index
            }
            // /api/products/search?name=...&option=more&brand=...&sortBy=price/hot&sortMode=asc/desc
            if (sortBy === 'price') {
                const resultsort = handlesort(result.data, sortMode, sortBy)
                const data = resultsort.map((product) => { return product.ignoreProps('unitInOrder', 'quantity') })
                rs.data = data
                return res.json(rs)
            }
            if (sortBy === 'hot') {
                const resultsort = handlesort(result.data, sortMode, sortBy)
                const data = resultsort.map((product) => { return product.ignoreProps('unitInOrder', 'quantity') })
                rs.data = data
                return res.json(rs)
            }
            // sort theo top sell lam gio hang xong roi lam
            // return res.json(result.map((product) => { return product.ignoreProps('unitInOrder', 'quantity') }))
            const data = result.data.map((product) => { return product.ignoreProps('unitInOrder', 'quantity') })
            rs.data = data
            return res.json(rs)
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

async function addProduct(req, res) {
    if (!req.body.product_name || !req.body.product_name?.trim() || req.body.product_name?.trim() === '') return res.status(400).json({ errorMessages: "value of name product invalid" })
    if (!req.body.supplier || !req.body.supplier?.trim() || req.body.supplier?.trim() === '') return res.status(400).json({ errorMessages: "value of supplier invalid" })
    if (!req.body.category || !req.body.category?.trim() || req.body.category?.trim() === '') return res.status(400).json({ errorMessages: "value of category invalid" })
    if (!req.body.price || !req.body.price?.trim() || req.body.price?.trim() === '') return res.status(400).json({ errorMessages: "value of price invalid" })
    if (!req.body.quantity || !req.body.quantity?.trim() || req.body.quantity?.trim() === '') return res.status(400).json({ errorMessages: "value of quantity invalid" })
    if (!req.body.images) return res.status(400).json({ errorMessages: "value of images not null" })
    if (!req.body.description || !req.body.description?.trim() || req.body.description?.trim() === '') return res.status(400).json({ errorMessages: "value of description invalid" })

    const refreshToken = req.body.refreshToken
    const index = refreshTokens.indexOf(refreshToken)
    if (index === -1) return res.status(401).json({ errorMessages: "you are the intruder" })

    const token = req.headers['authorization'].split(' ')[1]
    const tokenData = readAccessToken(token)
    const userAdmin = findUser(tokenData.username)
    if (!user) return res.status(401).json({ errorMessages: "you are the intruder" })
    if (userAdmin.rule === 1) {
        // handle add product
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
    getSuppliersCategories,
    addProduct,
}