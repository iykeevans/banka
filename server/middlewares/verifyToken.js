const jwt = require('jsonwebtoken');
const { findUser } = require('../models/Users');

// middleware function to check token
// TODO: WRITE TESTS OR THIS
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.SECRET);
    const result = findUser({ email: decoded.email });
    if (!result) {
      res.status(403).json({
        statusCode: 403,
        error: 'Access is restricted',
      });
    } else {
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
