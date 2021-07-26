const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../configs/config');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Not Allowed'
    })
  }
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Invalid Token!'
    })
  }
  const accessToken = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(accessToken, accessTokenSecret);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: 'Access token is not found'
      })
    }
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.log("error: ", error.message);
    res.status(403).json({
      success: false,
      message: 'Forbidden'
    })
  }
}

module.exports = verifyToken;