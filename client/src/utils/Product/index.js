import request from '../api-config'

async function searchProduct(text, option) {
    try {
        const products = await request.get('/products/search', {
            params: {
                name: text,
                option: option
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
        console.log(product)
        return product.data
    } catch (error) {
        if (error.response.status === 404) throw new Error('404')
    }
}

export {
    searchProduct,
    getProductByID
}