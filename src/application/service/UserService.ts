import { inject, injectable } from 'tsyringe';
import { Logger } from 'winston';
import UserEntity from '../../domain/entity/UserEntity';
import Repository from '../../domain/interfaces/Repository';
import User from '../../domain/User';
import Service from '../../domain/interfaces/Service';
import UserMapper from '../mapper/UserMapper';

export type UserModelService = Service<User>;
@injectable()
class UserService implements UserModelService {
  constructor(
    @inject('UserRepository') private userRepository: Repository<UserEntity>,
    @inject('UserMapper') private userMapper: UserMapper,
    @inject('Logger') private logger: Logger
  ) {}

  async retrieve(): Promise<User[]> {
    this.logger.debug('UserService :: Retrieving users');
    const usersRetrieved: UserEntity[] = await this.userRepository.retrieve();
    this.logger.debug('UserService :: Retrieved users', usersRetrieved);

    return usersRetrieved.map((u: UserEntity) => this.userMapper.entityToDomain(u));
  }

  async findById(id: string): Promise<User> {
    const userRetrieved: UserEntity = await this.userRepository.findById(id);

    return this.userMapper.entityToDomain(userRetrieved);
  }

  async create(user: User): Promise<User> {
    const userEntity: UserEntity = this.userMapper.domainToEntity(user);

    const persistedUser: UserEntity = await this.userRepository.create(userEntity);

    return this.userMapper.entityToDomain(persistedUser);
  }

  async update(id: string, user: User): Promise<User> {
    const userEntity: UserEntity = this.userMapper.domainToEntity(user);
    const updatedUserEntity: UserEntity = await this.userRepository.update(id, userEntity);

    return this.userMapper.entityToDomain(updatedUserEntity);
  }

  async delete(id: string): Promise<User> {
    const deletedUserEntity: UserEntity = await this.userRepository.delete(id);

    return this.userMapper.entityToDomain(deletedUserEntity);
  }
}

export default UserService;
