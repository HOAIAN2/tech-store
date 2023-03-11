const { refreshTokens, products, categories, suppliers, findProduct, findUser, createProduct } = require('../cache')
const Product = require("../models/product")
const { readAccessToken } = require("./authController")
const path = require("path")
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
// [POST addProduct]
async function addProduct(req, res) {
    let errorMessages = productErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = productErrors.vi
    const acceptFormats = ['image/png', 'image/jpg', 'image/jpeg']
    const limitSize = 500 * 1024
    const files = req.files
    if (!files) return res.sendStatus(400)
    // if (!req.files.file) return res.json(401)
    const data = {
        productName: req.body['product_name'],
        supplierID: req.body['supplier_id'],
        categoryID: req.body['category_id'],
        price: req.body['price'],
        quantity: req.body['quantity'],
        description: req.body['description'],
        images: ''
    }
    const validDataType = Object.keys(data).every(key => {
        const numberFields = ['price', 'quantity', 'supplierID', 'categoryID']
        if (numberFields.includes(key)) {
            return typeof parseInt(data[key]) === 'number' // nó parse '5h' ra 5 nên cần dùng cách khác
        }
        else {
            return typeof data[key] === 'string'
        }
    })
    if (!validDataType) return res.status(400).json({ message: errorMessages.invalidDataType })
    // const newData = formatData(data) // format với đổi '' thành undefined
    const newData = formatData(data) // handle 1 đống dấu cách
    const token = req.headers['authorization'].split(' ')[1]
    const tokenData = readAccessToken(token)
    const user = await findUser(tokenData.username)
    if (!user.role === 'admin') return res.sendStatus(401)
    else {
        try {
            const checkfile = Object.keys(files).every((file) => {
                const checkSize = files[file].size <= limitSize
                const checkType = acceptFormats.includes(files[file].mimetype)
                if (!checkSize || !checkType) return false
                return true
            })
            if (!checkfile) return res.sendStatus(400)
            const fileTemp = []
            Object.keys(files).forEach((file, index) => {
                let fileName = `${Date.now()}-${newData.productName}-${index}.${files[file].mimetype.split('/')[1]}`
                let newpath = path.join('./static/images/products', fileName)
                files[file].mv(newpath)
                fileTemp.push(fileName)
            })
            newData.images = fileTemp.join(',')
            const newProduct = await createProduct(newData)
            return res.json(newProduct)
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            return res.status(500).json({ message: 'error' })
        }
    }
}
// [GET supplier and category]
async function getSuppliersCategories(req, res) {
    const data = {
        categories: categories.map(category => category.categoryName),
        suppliers: suppliers.map(supplier => supplier.supplierName)
    }
    res.json(data)
}
// Middlewares, etc
function formatData(data = {}) {
    const newData = { ...data }
    for (const prop in newData) {
        const numberFields = ['price', 'quantity', 'supplierID', 'categoryID']
        if (prop === 'images') continue
        if (numberFields.includes(prop)) {
            newData[prop] = parseInt(newData[prop])
            continue
        }
        if (newData[prop]?.trim().length === 0) {
            newData[prop] = undefined
        }
        else {
            newData[prop] = newData[prop]?.trim()
        }
    }
    return newData
}
module.exports = {
    index,
    getProductByID,
    searchProduct,
    getSuppliersCategories,
    addProduct,
}