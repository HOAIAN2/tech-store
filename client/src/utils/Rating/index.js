import request from "../api-config";

async function getRating(productID) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) throw new Error('No Token')
    try {
        const res = await request.get(`/rating/${productID}`, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}

async function postRating(productID, rate) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) throw new Error('No Token')
    try {
        const res = await request.post('rating', {
            productID: productID,
            rate: rate
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

export {
    getRating
}