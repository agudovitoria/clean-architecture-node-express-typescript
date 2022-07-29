import { Request, Response, Router } from 'express';
import { inject, injectable } from 'tsyringe';
import { Logger } from 'winston';
import Route from '../../domain/interfaces/Route';

@injectable()
class StatusRoute implements Route {
  private router: Router = Router();

  getRouter(): Router {
    return this.router;
  }

  constructor(
    @inject('Logger') private logger: Logger
  ) {
    this.router.get('/', (_request: Request, response: Response): void => {
      logger.debug('Sending application status ok!');
      response.status(200).send();
    });
  }
}

export default StatusRoute;
