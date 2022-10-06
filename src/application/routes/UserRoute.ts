import { StatusCodes } from 'http-status-codes';
import { Router, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { Logger } from 'winston';
import Route from '../../domain/interfaces/Route';
import RestError from '../../shared/errors/RestError';
import UserDTO from '../../domain/dto/UserDTO';
import { UserModelController } from '../../infrastructure/rest/controllers/UserController';

@injectable()
class UserRoute implements Route {
  private router: Router = Router();

  getRouter(): Router {
    return this.router;
  }

  constructor(
    @inject('UserController') private userController: UserModelController,
    @inject('Logger') private logger: Logger
  ) {
    this.router.get('/', async (_request: Request, response: Response): Promise<void> => {
      try {
        this.logger.debug('UserRoute :: Retrieving users');
        const result: Array<UserDTO> = await this.userController.getAll();
        this.logger.debug('UserRoute :: Retrieved users', result);
        response.status(StatusCodes.OK).json({ result });
      } catch (e) {
        const { code = StatusCodes.INTERNAL_SERVER_ERROR, message } = (e as RestError);

        response
          .status(code)
          .json({ message });
      }
    });

    this.router.put('/', async (request: Request, response: Response): Promise<void> => {
      try {
        const userDto: UserDTO = request.body as UserDTO;
        this.logger.debug('UserRoute :: Creating user', userDto);
        const result: UserDTO = await this.userController.create(userDto);
        this.logger.debug('UserRoute :: Created user', result);
        response.status(200).json({ result });
      } catch (e) {
        const { code = 500, message } = (e as RestError);
        response
          .status(code)
          .json({ message });
      }
    });

    this.router.get('/:id', async (request: Request, response: Response): Promise<void> => {
      try {
        const result: UserDTO = await this.userController.getById(request?.params?.id);

        response.status(200).json({ result });
      } catch (e) {
        const { code = 500, message } = (e as RestError);
        response
          .status(code)
          .json({ message });
      }
    });
  }
}

export default UserRoute;
