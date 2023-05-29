const express = require('express')
const router = express.Router()
const { commentController } = require('../controllers')
const { authenticateToken } = require('../controllers/authController')

router.post('/:id', authenticateToken, commentController.addComment)
router.delete('/', authenticateToken, commentController.removeComment)
router.get('/', commentController.getComments)

module.exports = router