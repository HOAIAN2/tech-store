const { getaddress, getbrand } = require("../cache")
const supplierErrors = require("./supplierErrors.json")


async function getAddress(req, res) {
    let rs = await getaddress()
    rs = rs.map((item) => {
        if (item.address.toUpperCase().includes("HÀ NỘI")) {
            return "Hà Nội"
        }
        if (item.address.toUpperCase().includes("HỒ CHÍ MINH")) {
            return "TP. Hồ Chí Minh"
        }
        let a = item.address.toUpperCase().split("THÀNH").join('').split("PHỐ").join('').split(',')
        a = a.map((item) => {
            if (supplierErrors.address.includes(item.trim())) {
                return `${item.trim()[0]}${item.trim().toLowerCase().slice(1)}`
            }
        })
        return a.toString().split(',').join('')
    })
    return res.json(rs.filter(item => item))
}

async function getBrand(req, res) {
    const rs = await getbrand()
    res.json(rs.map(item => item.supplier_name))
}



module.exports = {
    getAddress,
    getBrand
}