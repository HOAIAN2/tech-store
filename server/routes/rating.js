const express = require('express')
const router = express.Router()
const { ratingController } = require('../controllers')
const { authController } = require('../controllers')

router.get('/', authController.authenticateToken, ratingController.getRating)
router.post('/', authController.authenticateToken, ratingController.addRating)
router.put('/', authController.authenticateToken, ratingController.editRating)

module.exports = router