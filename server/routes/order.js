const express = require("express")
const rounter = express.Router()
const { orderController, authController } = require("../controllers")

rounter.post('/create-order', authController.authenticateToken, orderController.createOrder)
rounter.post('/add-product', authController.authenticateToken, orderController.addProduct)
rounter.post('/update-product', authController.authenticateToken, orderController.updateProduct)
rounter.post('/remove-product', authController.authenticateToken, orderController.removeProduct)

module.exports = rounter