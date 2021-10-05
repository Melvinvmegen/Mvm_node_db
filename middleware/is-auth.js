const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    const error = new Error('Not authenticated')
    error.statusCode = 401
    next(error);
  }
  const token = req.headers.authorization
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret')
  } catch (error) {
    error.statusCode = 500
    next(error)
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated')
    error.statusCode = 401
    next(error);
  }
  req.userId = decodedToken.userId
  next()
}