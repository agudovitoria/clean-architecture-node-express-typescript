import { Request, Response, Router } from 'express';
import { injectable } from 'tsyringe';
import Route from '../../domain/interfaces/Route';

@injectable()
class DefaultRoute implements Route {
  private router: Router = Router();

  getRouter(): Router {
    return this.router;
  }

  constructor() {
    this.router.get('*', (_request: Request, response: Response): void => {
      response.status(404).json('Resource not found');
    });
  }
}

export default DefaultRoute;
