import RestError from './RestError';

class ParameterNotFoundError extends RestError {
  constructor(parameterName: string = '') {
    const code = 404;
    const message = `Parameter ${parameterName} not found`;
    
    super(code, message);
  }
}

export default ParameterNotFoundError;
