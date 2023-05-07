const { orders, selectRating, insertRating, updateRating } = require('../cache')

// [GET index]
async function getRating(req, res) {
    //
}

// [POST index]
async function addRating(req, res) {
    //
}
// [PUT index]
async function editRating(req, res) {
    //
}

// Midleware,...
function didUserBought(userID, productID) {
    const userOrders = orders.filter(order => (order.userID === userID && order.paid === true))
    return userOrders.some(order => {
        return order.products.find(product => product.productID === productID) !== null
    })
}
module.exports = {
    getRating,
    addRating,
    editRating
}