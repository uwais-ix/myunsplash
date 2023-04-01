const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
const User = require('../model/User');

const Unauthenticated = require('../errors/unauthenticated');

const authenticated = async (req, res, next) => {
  if (!req.cookies.token) {
    throw new Unauthenticated('Please login to access this resource');
  }

  const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  if (!decoded || !decoded.email) {
    throw new Unauthenticated('You are not authenticated');
  }

  const email = decoded.email;
  const user = await User.findOne({email});

  if (!user) {
    throw new Error('User not found');
  }

  req.user = user;

  next();
};
module.exports = authenticated;
