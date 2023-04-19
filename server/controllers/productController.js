const { products, categories, suppliers, findProduct, findUser, createProduct, getAVGrate } = require('../cache')
const Product = require("../models/product")
const { readAccessToken } = require("./authController")
const fs = require('fs')
const path = require("path")
const productErrors = require('./productErrors.json')
const { time } = require('console')
const { getNumberRate } = require("../cache")
const supplierErorrs = require("./supplierErrors.json")
const { executionAsyncResource } = require('async_hooks')

// [GET home]
function index(req, res) {
    const groupProduct = {}
    categories.forEach(category => {
        groupProduct[category.categoryName] = []
    })
    Object.keys(groupProduct).forEach(group => {
        const temp = []
        products.every((product) => {
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
    const product = products.find(product => {
        return product.productID === productID
    })
    if (product) return res.json(product.ignoreProps('unitInOrder', 'quantity'))
    else return res.sendStatus(404)
}
// [GET search]
async function searchProduct(req, res) {
    const name = req.query.name?.trim()
    if (!name) return res.sendStatus(400)
    if (name === "") return res.sendStatus(400)
    const result = products.filter(product => {
        return product.productName.includes(name)
    }).slice(0, 5)
    return res.json(result)
}
// [GET search-more]
async function searchProductMore(req, res) {
    // fetch(http://localhost:4000/api/products/search-more?brand=dell&brand=asus&address=ph%C3%BA%20y%C3%AAn&address=kh%C3%A1nh%20h%C3%B2a&sortby=price&sortmode=desc&index=0&star=5)
    const sortBys = ['price', 'hot', 'top-sell']
    const sortModes = ['asc', 'desc']
    const brands = suppliers.map(supplier => supplier.supplierName.toUpperCase())
    let data = {
        name: req.query.name,
        brand: req.query.brand ? Array.isArray(req.query.brand) ? req.query.brand.map(item => item.toUpperCase()) : [req.query.brand.toUpperCase()] : [],
        address: req.query.address ? Array.isArray(req.query.address) ? req.query.address : [req.query.address] : [],
        star: req.query.star,
        sortBy: req.query.sortby,
        sortMode: req.query.sortmode ? req.query.sortmode : 'desc',
        indexToStart: checkNumber(req.query.index) ? parseInt(req.query.index) : 0
    }
    console.log(data)

    if (!isValidProps("brand", data.brand)) return res.status(400).json(productErrors.en.invalidQuery)
    if (!isValidProps("address", data.address)) return res.status(400).json(productErrors.en.invalidQuery)
    if (data.star && !checkNumber(data.star)) return res.status(400).json(productErrors.en.invalidQuery)
    if (data.sortBy && !sortBys.includes(data.sortBy)) return res.status(400).json(productErrors.en.invalidQuery)
    if (data.sortMode && !sortModes.includes(data.sortMode)) return res.status(400).json(productErrors.en.invalidQuery)
    // if (data.indexToStart && !checkNumber(data.indexToStart)) data.indexToStart = 0
    const result = { data: [], index: parseInt(data.indexToStart) }

    while (result.index < products.length && result.data.length != 40) {
        // console.log(Math.random())
        const a = handleSort(result.index, (40 - result.data.length))
        result.data = result.data.concat(a.product)
        result.index = a.indexToStart
    }

    if (data.sortBy) {
        switch (data.sortBy) {
            case "price":
                if (data.sortMode === 'desc') {
                    result.data = result.data.sort((a, b) => {
                        return a.price - b.price
                    })
                } else {
                    result.data = result.data.sort((a, b) => {
                        return b.price - a.price
                    })
                }
                break;
            case "hot":
                if (data.sortMode === 'desc') {
                    result.data = result.data.sort((a, b) => {
                        return a.unitInOrder - b.unitInOrder
                    })
                } else {
                    result.data = result.data.sort((a, b) => {
                        return b.unitInOrder - a.unitInOrder
                    })
                }
                break;
            default:
                break;
        }
    }

    return res.json(result)

    function handleSort(index = 0, numberItemFound = 40) {
        let rs = []
        let indexToStart = products.length;
        if (data.brand.length != 0) {
            for (index; index < products.length; index++) {
                if (rs.length >= numberItemFound) break;
                if (data.brand.includes(products[index].supplier.toUpperCase())) {
                    rs.push(products[index]);
                }
            }
            indexToStart = index
        }
        if (data.address != 0) {
            if (rs.length != 0) {
                const b = rs.map((item) => {
                    for (let index = 0; index < suppliers.length; index++) {
                        if (item.supplierID === suppliers[index].supplierId && !isValidAddress(suppliers[index].address)) {
                            return item
                        }
                    }
                })
                rs = b.filter(item => item)
            } else {
                for (index; index < products.length; index++) {
                    if (rs.length >= numberItemFound) break;
                    for (let index1 = 0; index1 < suppliers.length; index1++) {
                        if (suppliers[index1].supplierId === products[index].supplierID) {
                            if (!isValidAddress(suppliers[index1].address)) {
                                rs.push(products[index])
                                break;
                            }
                        }
                    }
                    indexToStart = index
                }
            }
        }
        // sort theo star
        return { product: rs, indexToStart: indexToStart }
    }

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


    // if (data.address && !supplierErorrs.address.includes(data.address?.toUpperCase())) return res.status(400).json(productErrors.en.invalidQuery)
    // if (data.brand && !brands.includes(data.brand?.toUpperCase())) return res.status(400).json(productErrors.en.invalidQuery)
    // if (data.sortBy && !sortBys.includes(data.sortBy)) return res.status(400).json(productErrors.en.invalidQuery)
    // if (data.sortMode && !sortModes.includes(data.sortMode)) return res.status(400).json(productErrors.en.invalidQuery)
    // const checkstar = checkNumber(data.star)
    // if (!checkstar || parseInt(data.star) > 5 || parseInt(data.star) < 1) return res.status(400).json(productErrors.en.invalidQuery)

    // const rs = []

    // lay 40 san pham theo brand
    // products.every((item) => {
    //     if (item.supplier.toUpperCase() === data.brand.toUpperCase()) {
    //         rs.push(item)
    //         return true
    //     }
    //     if (rs.length >= 40) return false
    //     return true
    // })
    //lay san pham theo address tu rs
    // const a = []
    // rs.map((item, index) => {
    //     suppliers.every((item1) => {
    //         if (item1.supplierId === item.supplierID && item1.address.toUpperCase().includes(data.address.toUpperCase())) {
    //             a.push(item)
    //             return false
    //         }
    //         return true
    //     })
    // })
    // console.log(a)

    // Object.keys(data).map((key, index) => {
    //     if (data[key]) {
    //         //lay 40 san pham theo brand
    //         if (index === 0) {
    //             products.every((item) => {
    //                 if (item.supplier.toUpperCase() === data[key].toUpperCase()) {
    //                     rs.push(item)
    //                     return true
    //                 }
    //                 if (rs.length >= 40) return false
    //                 return true
    //             })
    //         }
    //         // lay san pham theo address tu rs
    //         else {
    //             const a = []
    //             rs.map((item, index) => {
    //                 suppliers.every((item1) => {
    //                     if (item1.supplierId === item.supplierID && item1.address.toUpperCase().includes(data.address.toUpperCase())) {
    //                         a.push(item)
    //                         return false
    //                     }
    //                     return true
    //                 })
    //             })
    //             console.log(a)
    //         }
    //     }
    // })
    // console.log(rs.length)
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