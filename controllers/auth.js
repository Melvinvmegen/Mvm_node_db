const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../models/index");
const User = db.User;

exports.signUp = async (req, res, next) => {
  const errors =  validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed !')
    error.statusCode = 422
    error.data = errors.array
    next(error)
    return
  }
  const email = req.body.email
  const password = req.body.password

  try {
    let user = await User.findOne({ where: { email: email }})
    if (user) {
      const error = new Error('A user with this email already exists !')
      error.statusCode = 422
      next(error)
      return
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    user = await User.create({ email: req.body.email, password: hashedPassword }) 
    res.status(201).json({message: 'User successfully created!', user: user})
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error)
  }
}

exports.login = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  let loadedUser;
  try {
    const user = await User.findOne({ where: { email: email }})
    if (!user) {
      const error = new Error('A user with this email could not be found !')
      error.statusCode = 404
      next(error)
      return
    }
    loadedUser = user
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      const error = new Error('Wrong Password!')
      error.statusCode = 404
      next(error)
      return
    }
    const token = jwt.sign(
      { email: loadedUser.email, userId: loadedUser.id }, 'secret', 
      { expiresIn: '7d' }
    )
    res.status(200).json({message: 'Successfully signed in', token: token, userId: loadedUser.id})
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error)
  }
}