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
export {
    searchProduct,
    getProductByID,
    getHotProducts
}