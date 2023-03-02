const express = require('express')
const router = express.Router()
const { productController } = require('../controllers')

router.get('/product', productController.getProductByID)
router.get("/search",productController.searchProduct)
router.get("/suppliers-categories", productController.getSuppliers_categories)

module.exports = router