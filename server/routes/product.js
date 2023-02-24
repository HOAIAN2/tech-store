const express = require('express')
const router = express.Router()
const { productController } = require('../controllers')

router.get('/', productController.index)
router.get('/product', productController.getProductByID)

module.exports = router