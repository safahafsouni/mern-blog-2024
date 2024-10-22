const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select('-password');
      next();
    } catch (error) {
      let err = new Error('Not authorized, Token failed');
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error('Not authorized, No token');
    error.statusCode = 401;
    next(error);
  }
};

const adminGuard = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    let error = new Error('Not authorized as an admin');
    error.statusCode = 401;
    next(error);
  }
};

module.exports = {
  authGuard,
  adminGuard,
};
