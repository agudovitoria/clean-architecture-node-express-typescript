import { StatusCodes } from 'http-status-codes';
import RestError from './RestError';

class InvalidRequestError extends RestError {
  constructor(objectName = '') {
    const code = StatusCodes.BAD_REQUEST;
    const message = `Invalid request for ${objectName}`;

    super(code, message);
  }
}

export default InvalidRequestError;
