const express = require('express')
const router = express.Router()
const { productController } = require('../controllers')

router.get('/home', productController.home)

module.exports = router