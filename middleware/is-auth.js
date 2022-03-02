const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.path == '/login' || req.path == '/signup') return next();
  const token = req.headers.authorization
  if (!token) {
    const error = new Error('Not authenticated')
    error.statusCode = 401
    return next(error);
  } 
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET)
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