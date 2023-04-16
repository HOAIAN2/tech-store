const express = require('express')
const router = express.Router()
const { commentController } = require('../controllers')

router.get('/', commentController.getComments)

module.exports = router