const userController = require('./userController')
const authController = require('./authController')
const productController = require('./productController')
const orderController = require("./orderController")
const commentController = require('./commentController')
const ratingController = require('./ratingController')

module.exports = {
    userController,
    authController,
    productController,
    orderController,
    commentController,
    ratingController
}