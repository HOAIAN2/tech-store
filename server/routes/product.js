const express = require('express')
const router = express.Router()
const { productController } = require('../controllers')
const { authController } = require('../controllers')

router.get('/product', productController.getProductByID)
router.get('/search', productController.searchProduct)
router.get('/suppliers-categories', productController.getSuppliersCategories)
router.post('/add-product', productController.addProduct)

module.exports = router