import { inject, injectable } from 'tsyringe';
import UserEntity from '../../domain/entity/UserEntity';
import Repository from '../../domain/interfaces/Repository';
import User from '../../domain/User';
import Service from '../../domain/interfaces/Service';

@injectable()
class UserService implements Service<User> {
  constructor(
    @inject('UserRepository') private userRepository: Repository<UserEntity>,
    @inject('UserMapper') private userMapper: UserMapper,
  ) {}

  async retrieve(): Promise<User[]> {
    const usersRetrieved: UserEntity[] = await this.userRepository.retrieve();

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

  async delete(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}

export default UserService;
