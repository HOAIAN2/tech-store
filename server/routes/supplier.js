const express = require("express")
const router = express.Router()
const supplierController = require("../controllers/supplierController")

router.get("/address", supplierController.getAddress)
router.get("/brand", supplierController.getBrand)

module.exports = router