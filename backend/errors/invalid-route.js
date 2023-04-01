const BaseError = require('./base-error');
const {StatusCodes} = require('http-status-codes');

class InvalidRoute extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = InvalidRoute;
