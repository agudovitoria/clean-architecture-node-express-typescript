import { Router, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import Route from '../../../domain/interfaces/Route';
import Controller from '../../../domain/interfaces/Controller';
import RestError from '../../../shared/errors/RestError';
import UserDTO from '../../../domain/dto/UserDTO';

@injectable()
class UserRoute implements Route {
  private router: Router = Router();

  getRouter(): Router {
    return this.router;
  }

  constructor(@inject('UserController') private userController: Controller<UserDTO>) {
    this.router.get('/', async (request: Request, response: Response): Promise<void> => {
      try {
        const result: Array<UserDTO> = await this.userController.getAll();
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
