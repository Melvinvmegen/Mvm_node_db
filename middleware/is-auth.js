const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    const error = new Error('Not authenticated')
    error.statusCode = 401
    throw error;
  }
  const token = req.headers.authorization
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret')
  } catch (error) {
    error.statusCode = 500
    throw error
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated')
    error.statusCode = 401
    throw error;
  }
  req.userId = decodedToken.userId
  next()
}