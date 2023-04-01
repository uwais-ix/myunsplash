const {StatusCodes} = require('http-status-codes');
const {InvalidField, Unauthenticated} = require('../errors/error-types');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../model/User');

const setLoginCookie = (res, email) => {
  res.cookie('token', jwt.sign({email}, process.env.JWT_SECRET), {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'none',
  });
};

const login = async (req, res) => {
  const {email, password} = req.body;

  if (!email) {
    throw new InvalidField('Email is required', 'email');
  }
  if (!password) {
    throw new InvalidField('Password is required', 'password');
  }

  const user = await User.findOne({email});
  if (!user) {
    throw new InvalidField('Email is not registered', 'email');
  }

  if (await user.comparePassword(password)) {
    console.log('success');
    setLoginCookie(res, email);
    return res.status(StatusCodes.OK).json({msg: 'Logged in'});
  }

  res.cookie('token', '', {maxAge: 0});
  throw new Unauthenticated('Invalid credentials');
};

const signup = async (req, res) => {
  const {email, password, requirePassword} = req.body;

  if (!email) {
    throw new InvalidField('Email is required', 'email');
  }
  if (!password) {
    throw new InvalidField('Password is required', 'password');
  }

  const user = await User.findOne({email});
  if (user) {
    throw new InvalidField('Email is already registered', 'email');
  }

  await User.create({
    email,
    password: await bcrypt.hash(password, bcrypt.genSaltSync(10)),
    requirePassword,
  });

  setLoginCookie(res, email);
  return res.status(StatusCodes.OK).json({msg: 'User created'});
};

const getSettings = (req, res) => {
  const user = req.user;

  const settings = user.userSettings;
  res.status(StatusCodes.OK).json({settings});
};

const updateSettings = (req, res) => {
  const {requirePassword, wallHaven} = req.body;
  const user = req.user;

  if (requirePassword !== undefined) {
    user.userSettings.setRequirePassword(requirePassword);
  }

  if (wallHaven !== undefined) {
    user.userSettings.setWallhaven(wallHaven);
  }

  if (requirePassword === undefined && wallHaven === undefined) {
    res.status(StatusCodes.BAD_REQUEST).json({msg: 'No settings to update'});
  }

  user.save();
  res
    .status(StatusCodes.OK)
    .json({msg: 'Settings updated', settings: user.userSettings});
};

const isUserAuthenticated = async (req, res) => {
  res.status(StatusCodes.OK).json({msg: 'User is authenticated'});
};

module.exports = {
  login,
  signup,
  getSettings,
  updateSettings,
  isUserAuthenticated,
};
