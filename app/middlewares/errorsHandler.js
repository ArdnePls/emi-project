const errors = {
  DEFAULT_ERROR: 'default_error',
  BAD_REQUEST: 'bad_request'
};

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DEFAULT_ERROR]: 500,
  [errors.BAD_REQUEST]: 400
};

const internalError = (message, internalCode) => ({
  message,
  internalCode
});

const handle = (error, req, res, next) => {
  if (error.internalCode) {
    res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  } else {
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  return res.send({ message: error.message, internal_code: error.internalCode });
};

const defaultError = message => internalError(message, errors.DEFAULT_ERROR);

const badRequest = message => internalError(message, errors.BAD_REQUEST);

module.exports = { handle, defaultError, badRequest }