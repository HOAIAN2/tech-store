const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')
const { authController } = require('../controllers')

router.get('/', authController.authenticateToken, userController.index)

module.exports = router