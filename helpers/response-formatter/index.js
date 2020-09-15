const methods = require('./methods');
const { ResponseError, errorHandler } = require('./error');

/**
 * Express middleware for enhance response with stuff of response formatter.
 * @returns {Function} An express middleware for enhance an express response object.
 * @public
 */
const responseFormatter = () => (req, res, next) => {
  res.withStatus = _generateFormatters(res);
  next();
}

/**
 * Function to generate formatter object.
 * @param {Object} res An express response object.
 * @returns {Object} Formatter object that contain response formatter functions.
 * @private
 */
const _generateFormatters = res => {
  const formatter = { code: {}};
  let responseBody = {};

  methods.map(method   => {
    if (method.isSuccess) {
      const fn = (notice, result, meta = {}, metaOutsideData = true) => {
        responseBody = _generateSuccessResponse({ notice, result, meta, metaOutsideData, code: method.code });
        res.status(method.code).json(responseBody);
      }
      formatter[method.name] = fn;
      formatter.code[method.code] = fn;
    } else {
      const fn = (notice) => {
        responseBody = _generateErrorResponse({ notice, code: method.code });
        res.status(method.code).json(responseBody);
      }
      formatter[method.name] = fn;
      formatter.code[method.code] = fn;
    }
  })

  return formatter;
}

/**
 * Function to generate a success response format.
 * @param {Object} response Response input.
 * @param {String} response.notice Short message to notify the client.
 * @param {*} response.result Result field.
 * @param {*} response.meta Meta field.
 * @param {Boolean} response.metaOutsideData Whether the meta field will be put outside or inside data.
 * @param {Number} response.code HTTP status code.
 * @returns {Object} Formatted response.
 * @private
 */
const _generateSuccessResponse = ({ notice, result, meta, metaOutsideData, code }) => {
  if (Object.keys(meta).length) {
    if (metaOutsideData) {
      return {
        success: true,
        data: result,
        meta,
        message: notice,
        code,
      }
    }

    return {
      success: true,
      data: Object.assign(result, { meta }),
      message: notice,
      code,
    }
  }

  return {
    success: true,
    data: result,
    message: notice,
    code,
  };
};

/**
 * Function to generate an errors response format.
 * @param {Object} response Response input.
 * @param {String} response.notice Error message to notify the client.
 * @param {Number} response.code HTTP status code.
 * @returns {Object} Formatted response.
 * @private
 */
const _generateErrorResponse = ({ notice, code }) => ({
  success: false,
  data: null,
  message: notice,
  code,
})

module.exports = {
  responseFormatter,
  ResponseError,
  errorHandler,
}
