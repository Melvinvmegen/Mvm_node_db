const express = require('express')
const { body } = require('express-validator')
const db = require("../models/index");
const { User } = db
const authController = require('../controllers/auth')

const router = express.Router();

router.put('/signup', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 8 })
], authController.signUp)

router.post('/login', authController.login)

router.post("/refreshtoken", authController.refreshToken)

module.exports = router;