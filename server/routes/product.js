const express = require('express')
const router = express.Router()
const { productController } = require('../controllers')
const { authController } = require('../controllers')

router.get('/product', productController.getProductByID)
router.get('/search', productController.searchProduct)
router.get('/suppliers-categories', productController.getSuppliersCategories)
router.post('/add-product', authController.authenticateToken, productController.addProduct)
router.get('/get10producthot', productController.get10producthot)

module.exports = router