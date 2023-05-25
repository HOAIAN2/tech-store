const express = require('express')
const router = express.Router()
const { productController } = require('../controllers')
const { authController } = require('../controllers')

router.get('/product', productController.getProductByID)
router.get('/search', productController.searchProduct)
router.get('/search-more', productController.searchProductMore)
router.post('/add-product', authController.authenticateToken, productController.addProduct)
router.get('/hot', productController.getHotProducts)
router.get('/suggest', productController.suggest)
router.get('/', productController.index)
module.exports = router