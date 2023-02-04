const express = require('express')
const router = express.Router()
const { authController } = require('../controllers')

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/register', authController.register)
router.post('/refresh', authController.reCreateToken)

module.exports = router