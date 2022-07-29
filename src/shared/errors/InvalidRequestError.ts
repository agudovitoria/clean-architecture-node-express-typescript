import RestError from './RestError';

class InvalidRequestError extends RestError {
  constructor(objectName = '') {
    const code = 400;
    const message = `Invalid request for ${objectName}`;

    super(code, message);
  }
}

export default InvalidRequestError;
