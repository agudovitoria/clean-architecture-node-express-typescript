import { StatusCodes } from 'http-status-codes';

class RestError extends Error {
  code = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(code = StatusCodes.INTERNAL_SERVER_ERROR, message = '') {
    super(`Error ${code}: ${message} not found`);
  }
}

export default RestError;
