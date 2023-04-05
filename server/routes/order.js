const express = require("express")
const router = express.Router()
const { orderController, authController } = require("../controllers")

router.post('/create-order', authController.authenticateToken, orderController.createOrder)
router.post('/add-product', authController.authenticateToken, orderController.addProduct)
router.post('/update-product', authController.authenticateToken, orderController.updateProduct)
router.post('/remove-product', authController.authenticateToken, orderController.removeProduct)
router.post('/make-payment', authController.authenticateToken, orderController.makePayment)
router.get('/', authController.authenticateToken, orderController.getOrder)

module.exports = router