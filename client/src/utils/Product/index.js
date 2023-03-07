import request from '../api-config'

async function searchProduct(text, option) {
    try {
        const product = await request.get('/products/search', {
            params: {
                name: text,
                option: option
            }
        })
        return product.data
    } catch (error) {
        return []
    }
}

export {
    searchProduct
}