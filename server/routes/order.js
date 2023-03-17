const express = require("express")
const rounter = express.Router()
const { orderController, authController } = require("../controllers")

rounter.post("/createorder", authController.authenticateToken, orderController.createOrder)


module.exports = rounter