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
        const res = await request.post('/order/create-order', {
            productID: productID,
            quantity: quantity
        }, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}
async function addProduct(orderID, productID, quantity) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) return {}
    try {
        const res = await request.post('/order/add-product', {
            orderID: orderID,
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
async function removeProduct(orderID, productID) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) return {}
    try {
        const res = await request.post('/order/remove-product', {
            orderID: orderID,
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
async function payOrder(orderID) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) return {}
    try {
        const res = await request.post('/order/make-payment', {
            orderID: orderID,
            paymentMethod: 2
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
    removeProduct,
    payOrder
}