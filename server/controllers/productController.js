const { products, categories, suppliers, findProduct, findUser, createProduct, getAVGrate } = require('../cache')
const Product = require("../models/product")
const { readAccessToken } = require("./authController")
const fs = require('fs')
const path = require("path")
const productErrors = require('./productErrors.json')
const supplierErorrs = require("./supplierErrors.json")

// [GET home]
function index(req, res) {
    const groupProduct = {}
    categories.forEach(category => {
        groupProduct[category.categoryName] = []
    })
    Object.keys(groupProduct).forEach(group => {
        const temp = []
        products.products.every((product) => {
            if (product.category === group && temp.length < 12) {
                temp.push(product)
                return true
            }
            if (temp.length >= 12) {
                return false
            }
            return true
        })
        groupProduct[group] = [...temp]
    })
    Object.keys(groupProduct).forEach(group => {
        groupProduct[group] = groupProduct[group].map(product => {
            return product.ignoreProps('unitInOrder', 'quantity')
        })
    })
    // return groupProduct
    const rs = [
        { 'title': 'Laptop Nổi Bật', 'products': groupProduct['Laptop'] },
        { 'title': 'Điện Thoại Nổi Bật', 'products': groupProduct['Phone'] },
        { 'title': 'Màn Hình Nổi Bật', 'products': groupProduct['Screen'] }
    ]
    res.json(rs)
}
//[GET product]
function getProductByID(req, res) {
    let errorMessages = productErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = productErrors.vi
    const productID = parseInt(req.query.id)
    if (!productID) return res.status(400).json({ message: errorMessages.invalidQuery })
    const product = products.products.find(product => {
        return product.productID === productID
    })
    if (product) return res.json(product.ignoreProps('unitInOrder', 'quantity'))
    else return res.sendStatus(404)
}
// [GET suggest]
function suggest(req, res) {
    const id = req.query.id?.trim()
    if (!id) return res.sendStatus(400)
    if (id === "") return res.sendStatus(400)
    if (!checkNumber(id)) return res.sendStatus(400)
    const product = products.products.find(item => item.productID === parseInt(id))
    if (!product) return res.sendStatus(404)
}
// [GET search]
async function searchProduct(req, res) {
    const name = req.query.name?.trim()
    if (!name) return res.sendStatus(400)
    if (name === "") return res.sendStatus(400)
    const result = products.products.filter(product => {
        return product.productName.includes(name)
    }).slice(0, 5).map(product => product.ignoreProps('unitInOrder', 'quantity'))
    // console.log(result)
    return res.json(result)
}
// [GET search-more]
async function searchProductMore(req, res) {
    // http://localhost:4000/api/products/search-more?name=d&brand=dell&brand=asus&address=ph%C3%BA%20y%C3%AAn&address=kh%C3%A1nh%20h%C3%B2a&sortby=price&sortmode=desc&index=0&star=5
    const sortBys = ['productssortPriceASC', 'productssortPriceDESC', 'productssorthot', 'productssortNew']
    const sortModes = ['asc', 'desc']
    const brands = suppliers.map(supplier => supplier.supplierName.toUpperCase())
    let data = {
        name: req.query.name,
        brand: req.query.brand ? Array.isArray(req.query.brand) ? req.query.brand.map(item => item.toUpperCase()) : [req.query.brand.toUpperCase()] : [],
        address: req.query.address ? Array.isArray(req.query.address) ? req.query.address : [req.query.address] : [],
        star: req.query.star ? Array.isArray(req.query.star) ? req.query.star : [...req.query.star] : [],
        sortBy: req.query.sortby ? sortBys.includes(req.query.sortby) ? req.query.sortby : 'products' : 'products',
        // sortMode: req.query.sortmode ? req.query.sortmode : 'desc',
        indexToStart: checkNumber(req.query.index) ? parseInt(req.query.index) + 1 : 0,
    }

    if (!isValidProps("brand", data.brand)) return res.status(400).json(productErrors.en.invalidQuery)
    if (!isValidProps("address", data.address)) return res.status(400).json(productErrors.en.invalidQuery)
    if (data.star && !checkNumber(data.star)) return res.status(400).json(productErrors.en.invalidQuery)
    if (data.sortMode && !sortModes.includes(data.sortMode)) return res.status(400).json(productErrors.en.invalidQuery)
    if (!data.name) return res.status(400).json(productErrors.en.invalidQuery)
    // const result = { data: [], index: parseInt(data.indexToStart) }
    const result = { data: [], index: 0 }

    // while (result.index < products.length && result.data.length != 40) {
    //     const a = handleSort(result.index, (40 - result.data.length))
    //     result.data = result.data.concat(a.product)
    //     result.index = a.indexToStart
    // }

    // if (data.sortBy) {
    //     switch (data.sortBy) {
    //         case "price":
    //             if (data.sortMode === 'desc') {
    //                 result.data = result.data.sort((a, b) => {
    //                     return a.price - b.price
    //                 })
    //             } else {
    //                 result.data = result.data.sort((a, b) => {
    //                     return b.price - a.price
    //                 })
    //             }
    //             break;
    //         case "hot":
    //             if (data.sortMode === 'desc') {
    //                 result.data = result.data.sort((a, b) => {
    //                     return a.unitInOrder - b.unitInOrder
    //                 })
    //             } else {
    //                 result.data = result.data.sort((a, b) => {
    //                     return b.unitInOrder - a.unitInOrder
    //                 })
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // result.index >= products.length ? result.index = false : ""
    // return res.json({ products: result.data.map(product => product.ignoreProps('unitInOrder', 'quantity')), index: result.index })

    // function handleSort(index = 0, numberItemFound = 40) {
    //     let rs = []
    //     let indexToStart = products.length;

    //     for (index; index < products.length; index++) {
    //         if (rs.length >= numberItemFound) break;
    //         if (products[index].productName.toUpperCase().includes(data.name.toUpperCase())) {
    //             rs.push(products[index])
    //         }
    //     }
    //     indexToStart = index

    //     if (data.brand.length != 0) {
    //         if (rs.length != 0) {
    //             const a = rs.map((item, index) => {
    //                 if (data.brand.includes(item.supplier.toUpperCase())) {
    //                     return item
    //                 }
    //             })
    //             rs = a.filter(item => item)
    //         }
    //     }
    //     if (data.address.length != 0) {
    //         if (rs.length != 0) {
    //             const b = rs.map((item) => {
    //                 for (let index = 0; index < suppliers.length; index++) {
    //                     if (item.supplierID === suppliers[index].supplierId && !isValidAddress(suppliers[index].address)) {
    //                         return item
    //                     }
    //                 }
    //             })
    //             rs = b.filter(item => item)
    //         }
    //     }
    //     if (data.star.length != 0) {
    //         if (rs.length != 0) {
    //             const c = rs.map((item) => {
    //                 if (data.star.includes(Math.floor(item.rating).toString())) {
    //                     return item
    //                 }
    //             })
    //             rs = c.filter(item => item)
    //         }
    //     }
    //     return { product: rs, indexToStart: indexToStart }
    // }

    // console.log(products.products[0])

    // while (result.length < 40) {
    for (let i = data.indexToStart; i < products[`${data.sortBy}`].length; i++) {
        if (result.data.length >= 40) break;
        if (products[`${data.sortBy}`][i].productName.toUpperCase().includes(data.name.toUpperCase())) {
            let check = true
            if (data.brand.length != 0) {
                if (!data.brand.includes(products[`${data.sortBy}`][i].supplier.toUpperCase())) {
                    check = false
                }
            }
            if (data.address.length != 0) {
                const a = suppliers.every((item) => {
                    if (products[`${data.sortBy}`][i].supplierID === item.supplierId && !isValidAddress(item.address)) {
                        return false
                    }
                    return true
                })
                if (a) check = false
            }
            if (data.star.length != 0) {
                if (!data.star.includes(Math.floor(products[`${data.sortBy}`][i].rating).toString())) {
                    check = false
                }
            }
            if (check) {
                result.data.push(products[`${data.sortBy}`][i])
            }
        }
        result.index = i
    }
    // }
    if (result.data.length < 40 || result.index >= products.products.length - 1) {
        result.index = false
    }
    res.json(result)

    function isValidAddress(addr) {
        return data.address.every((item4, index) => {
            if (addr.toUpperCase().includes(item4.toUpperCase().trim())) {
                return false
            }
            return true
        })
    }
    function isValidProps(typecheck, arr) {
        if (!Array.isArray(arr)) return false
        if (typecheck === 'brand') {
            return arr.every((item) => {
                if (!brands.includes(item.toUpperCase())) return false
                return true
            })
        } else if (typecheck === 'address') {
            return arr.every((item) => {
                if (!supplierErorrs.address.includes(item.toUpperCase().trim())) return false
                return true
            })
        }
    }
    // console.log(req.query)
    // res.json(productssort.productssortPriceDESC)
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

//[GET hot]
async function getHotProducts(req, res) {
    let errorMessages = productErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = productErrors.vi
    const limit = parseInt(req.query.limit)
    if (!limit) return res.status(400).json({ message: errorMessages.invalidQuery })
    return res.json(products.products.slice(0, limit).map(product => {
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
    if (!number) return false
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
    // getSuppliersCategories,
    addProduct,
    getHotProducts,
    searchProductMore,
}