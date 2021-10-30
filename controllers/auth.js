const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../models/index");
const { User, RefreshToken } = db
const config = require("../config/auth.config.js");

exports.signUp = async (req, res, next) => {
  const errors =  validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed !')
    error.statusCode = 422
    error.message = errors.errors[0].msg
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
      const error = new Error("Email and password don't match!")
      error.statusCode = 404
      next(error)
      return
    }
    const token = jwt.sign(
      { email: loadedUser.email, userId: loadedUser.id }, config.secret, 
      { expiresIn: config.jwtExpiration }
    )

    let refreshToken = await RefreshToken.createToken(user);

    res.status(200).json({message: 'Successfully signed in', token: token, refreshToken: refreshToken, userId: loadedUser.id})
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error)
  }
}

exports.refreshToken = async (req, res, next) => {
  const { refreshToken: requestToken } = req.body
  console.log(req.body)
  if (requestToken == null) {
    const error = new Error('Refresh Token is required!')
    error.statusCode = 403
    next(error)
    return 
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } })

    if (!refreshToken) {
      const error = new Error('Refresh token not found!')
      error.statusCode = 403
      next(error)
      return
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });
      const error = new Error('Refresh token was expired. Please login')
      error.statusCode = 403
      next(error)
      return
    }
    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error)
  }
}