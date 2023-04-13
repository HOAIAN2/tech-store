const { suppliers } = require("../cache")
const supplierErrors = require("./supplierErrors.json")


function getAddress(req, res) {
    let result = new Set()
    suppliers.forEach(supplier => {
        result.add(supplier.address)
    })
    console.log(result)
    result = Array.from(result).map((item) => {
        if (item.toUpperCase().includes("HÀ NỘI")) {
            return "Hà Nội"
        }
        if (item.toUpperCase().includes("HỒ CHÍ MINH")) {
            return "TP. Hồ Chí Minh"
        }
        let a = item.toUpperCase().split("THÀNH").join('').split("PHỐ").join('').split(',')
        a = a.map((item) => {
            if (supplierErrors.address.includes(item.trim())) {
                return `${item.trim()[0]}${item.trim().toLowerCase().slice(1)}`
            }
        })
        return a.toString().split(',').join('')
    })
    console.log(result)
    return res.json(result)
}

async function getBrand(req, res) {
    return res.json(suppliers.map(supplier => supplier.supplierName))
}



module.exports = {
    getAddress,
    getBrand
}