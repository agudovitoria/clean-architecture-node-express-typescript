import { StatusCodes } from 'http-status-codes';
import RestError from './RestError';

class ParameterNotFoundError extends RestError {
  constructor(parameterName = '') {
    const code = StatusCodes.NOT_FOUND;
    const message = `Parameter ${parameterName} not found`;

    super(code, message);
  }
}

export default ParameterNotFoundError;
