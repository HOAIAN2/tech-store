import request from '../api-config'


async function getaddressforsidbar() {
    try {
        const rs = await request.get('/supplier/getaddress')
        return rs.data
    } catch (error) {
        return []
    }
}

async function getbrand() {
    try {
        const rs = await request.get("/supplier/getbrand")
        return rs.data
    } catch (error) {
        return []
    }
}

export {
    getaddressforsidbar,
    getbrand,
}