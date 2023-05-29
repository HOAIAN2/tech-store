import request from '../api-config'

async function searchProduct(text) {
    try {
        const products = await request.get('/products/search', {
            params: {
                name: text
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


async function getProductSearchPage(name, brand, address, star, sortby, index = 0) {
    try {
        const rs = await request.get('/products/search-more', {
            params: {
                name: name,
                brand: brand,
                address: address,
                star: star,
                sortby: sortby,
                index: index
            }
        })
        return rs.data
    } catch (error) {
        return []
    }
}
async function getSuggest(id) {
    try {
        const rs = await request.get('/products/suggest', {
            params: {
                id: id
            }
        })
        return rs.data
    } catch (error) {
        return []
    }
}

// async function getProductSort(data) {
//     try {
//         const rs = await request.get('/products/search-more', {
//             params: {
//                 brand: data.brand ? data.brand : [],
//                 address: data.address ? data.address : []
//             }
//         })
//     } catch (error) {
//         return []
//     }
// }

export {
    searchProduct,
    getProductByID,
    getHotProducts,
    getCategories,
    getHomeProduct,
    getProductSearchPage,
    getSuggest
    // getProductSort
}