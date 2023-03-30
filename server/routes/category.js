const express = require("express")
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getcategories)



module.exports = router