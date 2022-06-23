import { inject, injectable } from 'tsyringe';
import UserDTO from '../../../domain/dto/UserDTO';
import User from '../../../domain/User';
import ParameterNotFoundError from '../../../shared/errors/ParameterNotFoundError';

@injectable()
class UserController implements UserController {
  constructor(
    @inject('UserService') private userService: UserService,
    @inject('UserMapper') private userMapper: UserMapper
  ) {}

  async getAll(): Promise<UserDTO[]> {
    const retrievedUsers: User[] = await this.userService.retrieve();

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
    const user: User = this.userMapper.dtoToDomain(userDto);

    const createdUser: User = await this.userService.create(user);

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

  async delete(id: string): Promise<boolean> {
    if (!id) {
      throw new ParameterNotFoundError('id');
    }

    return this.userService.delete(id);
  }
}

export default UserController;
