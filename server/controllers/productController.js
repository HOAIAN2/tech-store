const { refreshTokens, products, categories, suppliers, findProduct, findUser, createProduct } = require('../cache')
const Product = require("../models/product")
const { readAccessToken } = require("./authController")
const fs = require('fs')
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
    else return res.sendStatus(404)
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
    let indexToStart = parseInt(req.query.nextindex)
    if (!text) return res.json([])
    if (text === "") return res.json([])
    if (!options.includes(option)) return res.sendStatus(400)
    if (sortBy && !sortBys.includes(sortBy)) return res.sendStatus(400)
    if (sortMode && !sortModes.includes(sortMode)) return res.sendStatus(400)
    if (!indexToStart) indexToStart = 0

    const result = await findProduct(text, option, brand, indexToStart)
    if (result) {
        // /api/products/search?name=...&option=less , co nhieu tra nhieu
        if (option === 'less') {
            return res.json(result.data.map((product) => { return product.ignoreProps('unitInOrder', 'quantity', 'description', 'supplier', 'category') }))
        }
        // /api/products/search?name=...&option=more , tra 40 product ngau nhien
        // /api/products/search?name=...&option=more&brand=... , lay product theo brand
        if (option === 'more') {
            const rs = { indexNext: false }
            if (result.data.length >= 41) {
                result.data.pop()
                rs.indexNext = result.index
            }
            // /api/products/search?name=...&option=more&brand=...&sortBy=price/hot&sortMode=asc/desc
            if (sortBy === 'price') {
                const resultsort = handleSort(result.data, sortMode, sortBy)
                const data = resultsort.map((product) => { return product.ignoreProps('unitInOrder', 'quantity') })
                rs.data = data
                return res.json(rs)
            }
            if (sortBy === 'hot') {
                const resultsort = handleSort(result.data, sortMode, sortBy)
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

    function handleSort(data, sortMode, sortBy) {
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
    let files = req.files.files
    if (!files) return res.sendStatus(400)
    if (!Array.isArray(files)) files = [files]
    const data = {
        productName: req.body.productName,
        supplierID: req.body.supplierID,
        categoryID: req.body.categoryID,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        images: ''
    }
    const validDataType = Object.keys(data).every(key => {
        const numberFields = ['price', 'quantity', 'supplierID', 'categoryID']
        if (numberFields.includes(key)) {
            return checkNumber(data[key])
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
    if (user.role != 'admin') return res.sendStatus(401)
    else {
        try {
            const checkfile = files.every((file) => {
                const checkSize = file.size <= limitSize
                const checkType = acceptFormats.includes(file.mimetype)
                if (!checkSize || !checkType) return false
                return true
            })
            if (!checkfile) return res.sendStatus(400)
            const fileTemp = []
            files.forEach((file, index) => {
                let fileName = `${Date.now()}-${newData.productName}-${index}.${file.mimetype.split('/')[1]}`
                let newpath = path.join('./static/images/products', fileName)
                file.mv(newpath)
                fileTemp.push(fileName)
            })
            newData.images = fileTemp.join(',')
            const newProduct = await createProduct(newData)
            if (!newProduct) {
                fileTemp.forEach((item) => {
                    fs.unlinkSync(`./static/images/products/${item}`, (error) => { if (error) { console.log('\x1b[31m%s\x1b[0m', error) } })
                })
                return res.status(500).json({ message: 'error' })
            }
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
// [GET hot-product]
async function getHotProducts(req, res) {
    let errorMessages = productErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = productErrors.vi
    const limit = parseInt(req.query.limit)
    if (!limit) return res.status(400).json({ message: errorMessages.invalidQuery })
    return res.json(products.slice(0, limit).map(product => {
        return product.ignoreProps('unitInOrder', 'quantity', 'description', 'supplier', 'category')
    }))
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
function checkNumber(number) {
    let i = 0
    for (i; i < number.length; i++) {
        if (isNaN(parseInt(number[i]))) return false
    }
    return true
}
module.exports = {
    index,
    getProductByID,
    searchProduct,
    getSuppliersCategories,
    addProduct,
    getHotProducts,
}