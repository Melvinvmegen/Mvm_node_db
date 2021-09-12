const User = require('../models/user')
const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signUp = (req, res, next) => {
  const errors =  validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed !')
    error.statusCode = 422
    error.data = errors.array
    throw error
  }
  const password = req.body.password
  bcrypt.hash(password, 12)
    .then(hashedPassword => {
      User.create({
        email: req.body.email,
        password: hashedPassword
      })
        .then(user => res.status(201).json({message: 'User successfully created!', user: user}))
    })
    .catch(error => console.log(error))
}

exports.login = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  let loadedUser;
  User.findOne({ where: { email: email }})
  .then(user => {
    if (!user) {
      const error = new Error('A user with this email could not be found !')
      error.statusCode = 404
      throw error
    }
    loadedUser = user
    return bcrypt.compare(password, user.password)
  })
  .then(isEqual => {
    if (!isEqual) {
      const error = new Error('Wrong Password!')
      error.statusCode = 404
      throw error
    }
    const token = jwt.sign(
      { email: loadedUser.email, userId: loadedUser.id }, 'secret', 
      { expiresIn: '7d' }
    )
      res.status(200).json({message: 'Successfully signed in', token: token, userId: loadedUser.id})
  })
  .catch(error => console.log(error))

}