class RestError extends Error {
  code:number = 500;

  constructor(code: number = 500, message: string = '') {
    super(`Error ${code}: ${message} not found`);
  }
}

export default RestError;
