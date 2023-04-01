const BaseError = require('./base-error');
const {StatusCodes} = require('http-status-codes');

class Unauthenticated extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;