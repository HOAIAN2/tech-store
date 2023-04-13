import request from '../api-config'


async function getAddress() {
    try {
        const rs = await request.get('/supplier/address')
        return rs.data
    } catch (error) {
        return []
    }
}

async function getBrands() {
    try {
        const rs = await request.get("/supplier/brand")
        return rs.data
    } catch (error) {
        return []
    }
}

export {
    getAddress,
    getBrands,
}