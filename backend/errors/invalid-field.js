const BaseError = require('./base-error');
const {StatusCodes} = require('http-status-codes');

class InvalidField extends BaseError {
  constructor(message, field) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.field = field;
  }
}

module.exports = InvalidField;