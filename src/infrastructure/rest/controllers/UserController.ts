import { inject, injectable } from 'tsyringe';
import { Logger } from 'winston';
import RetrieveUsersUseCase from '../../../application/usecases/users/RetrieveUsersUseCase';
import UserService from '../../../application/service/UserService';
import Controller from '../../../domain/interfaces/Controller';
import UserDTO from '../../../domain/dto/UserDTO';
import User from '../../../domain/User';
import ParameterNotFoundError from '../../../shared/errors/ParameterNotFoundError';
import { UserModelMapper } from '../../../application/mapper/UserMapper';
import CreateUserUseCase from '../../../application/usecases/users/CreateUserUseCase';

export type UserModelController = Controller<UserDTO>;

@injectable()
class UserController implements UserModelController {
  constructor(
    @inject('UserService') private userService: UserService,
    @inject('RetrieveUsersUseCase') private retrieveUsersUseCase: RetrieveUsersUseCase,
    @inject('CreateUserUseCase') private createUserUseCase: CreateUserUseCase,
    @inject('UserMapper') private userMapper: UserModelMapper,
    @inject('Logger') private logger: Logger
  ) {}

  async getAll(): Promise<UserDTO[]> {
    this.logger.debug('UserController :: Retrieving all users');
    const retrievedUsers: Array<User> = await this.retrieveUsersUseCase.execute();
    this.logger.debug('UserController :: Retrieved users', retrievedUsers);
    return retrievedUsers.map((u: User) => this.userMapper.domainToDto(u));
  }

  async getById(id: string): Promise<UserDTO> {
    if (!id) {
      throw new ParameterNotFoundError('id');
    }

    const retrievedUser: User = await this.userService.findById(id);

    return this.userMapper.domainToDto(retrievedUser);
  }

  async create(userDto: UserDTO): Promise<UserDTO> {
    if (!userDto) {
      throw new ParameterNotFoundError('userDto');
    }

    // try {
    //   this.userMapper.validateDto(userDto);
    // } catch (e) {
    //   this.logger.error((e as Error)?.message);
    //   throw new InvalidRequestError('user');
    // }

    const user: User = this.userMapper.dtoToDomain(userDto);

    const createdUser: User = await this.createUserUseCase.execute(user);

    return this.userMapper.domainToDto(createdUser);
  }

  async update(id: string, userDto: UserDTO): Promise<UserDTO> {
    if (!id) {
      throw new ParameterNotFoundError('id');
    }

    if (!userDto) {
      throw new ParameterNotFoundError('user');
    }

    const user = this.userMapper.dtoToDomain(userDto);

    const updatedUser: User = await this.userService.update(id, user);

    return this.userMapper.domainToDto(updatedUser);
  }

  async delete(id: string): Promise<UserDTO> {
    if (!id) {
      throw new ParameterNotFoundError('id');
    }

    const deletedUser: User = await this.userService.delete(id);

    return this.userMapper.domainToDto(deletedUser);
  }
}

export default UserController;
