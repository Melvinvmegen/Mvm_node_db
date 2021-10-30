const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    const error = new Error('Not authenticated')
    error.statusCode = 401
    return next(error);
  } 
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.secret)
  } catch (error) {
    error.statusCode = 401
    return next(error)
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated')
    error.statusCode = 401
    return next(error);
  }

  req.userId = decodedToken.userId
  next()
}