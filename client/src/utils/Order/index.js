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

export {
    getOrder
}