const express = require('express')
const router = express.Router()
const { authController } = require('../controllers')
const formidable = require("formidable");
const fs = require('fs')

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/change-password', authController.authenticateToken, authController.changePassword)
router.post('/register', authController.register)
router.post('/refresh', authController.reCreateToken)
router.post('/upload', (req, res, next) => {
    console.log(req.body)
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(123)
            next(err);
            return;
        }
        console.log(files)
        res.send(files);
    });
});

module.exports = router