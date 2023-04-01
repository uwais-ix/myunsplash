const {StatusCodes} = require('http-status-codes');
const {InvalidRoute} = require('../errors/error-types');

// no match (invalid route)
const routeError = (req, res, next) => {
  throw new InvalidRoute('Invalid route');
};

// all error handled here
const errorHandler = (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Internal Server Error',
    field: err.field || undefined,
  };

  // handle mongoose errors
  // .. .. .. .. .. .. .. .. .. .. .. ..
  // duplicate unique field
  if (err?.code === 11000) {
    error.statusCode = StatusCodes.CONFLICT;
    error.field = Object.keys(err.keyValue)[0];
    error.message = `${error?.field} already exists`;
  }

  // mongoose cast error (mongoose coerce failed)
  if (err?.name === 'CastError') {
    error.statusCode = StatusCodes.BAD_REQUEST;
    error.message = 'Invalid ID';
  }

  // validation error
  if (err?.name === 'ValidationError') {
    error.statusCode = StatusCodes.BAD_REQUEST;
    error.field = Object.keys(err.errors)[0];
    error.message = err.errors[error?.field].message;
  }

  return res
    .status(error.statusCode)
    .json({msg: error.message, field: error?.field});
};

module.exports = {
  routeError,
  errorHandler,
};
