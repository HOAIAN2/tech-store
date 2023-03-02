const express = require('express')
const router = express.Router()
const { authController } = require('../controllers')

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/change-password', authController.authenticateToken, authController.changePassword)
router.post('/register', authController.register)
router.post('/refresh', authController.reCreateToken)
router.post("/upload", authController.authenticateToken, authController.uploadImage)
router.get("/suppliers-categories", authController.getSuppliers_categories)

module.exports = router