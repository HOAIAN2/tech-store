import request from '../api-config'

async function getOrder() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) return []
    try {
        const res = await request.get('/order', {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            },
            params: {
                type: 'all',
            }
        })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}
async function createOrder(productID, quantity) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) return {}
    try {
        await request.post('/order/create-order', {}, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        })
        const res = await addProduct(productID, quantity)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}
async function addProduct(productID, quantity) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) return {}
    try {
        const res = await request.post('/order/add-product', {
            productID: productID,
            quantity: quantity
        }, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            },
        })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}
async function updateProduct(productID, quantity) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) return {}
    try {
        const res = await request.post('/order/update-product', {
            productID: productID,
            quantity: quantity
        }, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            },
        })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}
async function removeProduct(productID) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) return {}
    try {
        const res = await request.post('/order/remove-product', {
            productID: productID
        }, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            },
        })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}
export {
    getOrder,
    createOrder,
    addProduct,
    updateProduct,
    removeProduct
}