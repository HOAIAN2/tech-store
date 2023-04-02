const { readAccessToken } = require("../controllers/authController")
const { orders, getOrder, addOrder, addOrderDetail, updateOrderDetail } = require("../cache")
const orderErrors = require("./orderErrors.json")

// [POST create-order]
async function createOrder(req, res) {
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
}
// [POST add-product]
async function addProduct(req, res) {
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    //
}
// [POST update-product]
async function updateProduct(req, res) {
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    //
}
// [POST remove-product]
async function removeProduct(req, res) {
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    //
}
// [POST make-payment]
async function makePayment(req, res) {
    let errorMessages = orderErrors.en
    const language = req.headers["accept-language"]
    if (language === 'vi') errorMessages = orderErrors.vi
    const token = req.headers['authorization'].split(' ')[1]
    const user = readAccessToken(token)
    //
}

// middleware,..
function formatdata(data) {
    const rs = data;
    const a = Object.keys(rs).every((item) => {
        if (rs[item]) {
            if (item === 'productID' || item === 'price', item === 'productQuantity') {
                return parseInt(rs.item) != NaN ? true : false;
            }
            return true
        }
        return false;
    })
    return a
}


module.exports = {
    createOrder,
    addProduct,
    updateProduct,
    removeProduct,
    makePayment
}