const express = require('express')
const { body } = require('express-validator')
const User = require('../models/user')
const authController = require('../controllers/auth')

const router = express.Router();

router.put('/signup', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req } ) => {
      return User.findOne({ where: { email: value }}).then(userDoc => {
        if (userDoc) {
          return Promise.reject('Email already exists.')
        }
      })
    })
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 6 })
], authController.signUp)

router.post('/login', authController.login)

module.exports = router;