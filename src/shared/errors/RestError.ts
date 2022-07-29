class RestError extends Error {
  code = 500;

  constructor(code = 500, message = '') {
    super(`Error ${code}: ${message} not found`);
  }
}

export default RestError;
