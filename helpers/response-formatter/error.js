const methods = require('./methods');

class ResponseError extends Error {
  constructor(statusCode, notice = null, message = null) {
    super();

    const method = methods.find(({ code }) => code == statusCode);

    this.statusCode = statusCode;
    this.notice = notice !== null ? notice : method.message;
    this.message = message !== null ? message : `Request failed with status code ${statusCode}`;
  }
};

const errorHandler = (err, req, res, next) => {
  // Skip this handler if response header is already sent
  if (res.headersSent) {
    return next(err);
  };

  // Validation error
  if (err.name === 'ValidationError') {
    const message = err.message.replace(/^\w+ validation failed: \w+: Error, /, '');

    return res.status(422).json({
      // notice: 'Request validation failed',
      // error: message.charAt(0).toUpperCase() + message.slice(1),
      success: false,
      data: null,
      message: message.charAt(0).toUpperCase() + message.slice(1),
      code: 422,
    });
  }

  return res.status(err.statusCode || 500).json({
    // notice: err.notice || 'Error occured',
    // error: err.message,
    // stack: err.stack,
    success: false,
    data: null,
    message: err.message,
    code: err.statusCode || 500,
  });
};

module.exports = {
  ResponseError,
  errorHandler,
};
