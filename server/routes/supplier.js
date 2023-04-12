const express = require("express")
const router = express.Router()
const supplierController = require("../controllers/supplierController")

router.get("/getaddress", supplierController.getAddress)
router.get("/getbrand", supplierController.getBrand)

module.exports = router