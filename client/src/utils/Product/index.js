import request from '../api-config'

async function searchProduct(text, option, sortBy, sortMode) {
    try {
        const products = await request.get('/products/search', {
            params: {
                name: text,
                option: option,
                sortBy: sortBy,
                sortMode: sortMode
            }
        })
        return products.data
    } catch (error) {
        return []
    }
}
async function getProductByID(id) {
    try {
        const product = await request.get('/products/product', {
            params: {
                id: id
            }
        })
        return product.data
    } catch (error) {
        const notFoundCodes = [404, 400] //replace because id only accept number
        if (notFoundCodes.includes(error.response.status)) throw new Error('404')
    }
}
async function getHotProducts(limit = 10) {
    try {
        const products = await request.get('/products/hot', {
            params: {
                limit: limit
            }
        })
        return products.data
    } catch (error) {
        throw new Error(error.response.data.message)

    }
}
async function getCategories() {
    try {
        const result = await request.get('/category')
        return result.data
    } catch (error) {
        throw new Error(error)
    }
}
async function getHomeProduct() {
    try {
        const rs = await request.get('/products')
        return rs
    } catch (error) {
        throw new Error(error)
    }
}

async function getAVGrate(productID) {
    try {
        const rs = await request.get('/products/total-ratings', {
            params: {
                productID: productID
            }
        })
        return rs.data
    } catch (error) {
        return 0
    }
}

async function getNumberRate(productID) {
    try {
        const rs = await request.get("/products/rating-count", {
            params: {
                productID: productID,
            }
        })
        return rs.data
    } catch (error) {
        return 0
    }
}

async function getSoldQuantity(productID) {
    try {
        const rs = await request.get("/order/sold-quantity", {
            params: {
                productID: productID
            }
        })
        return rs.data
    } catch (error) {
        return 0
    }
}

export {
    searchProduct,
    getProductByID,
    getHotProducts,
    getCategories,
    getHomeProduct,
    getSoldQuantity,
    getAVGrate,
    getNumberRate
}