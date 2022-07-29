import { inject, injectable } from 'tsyringe';
import { Logger } from 'winston';
import UserMapper from '../../mapper/UserMapper';
import UserEntity from '../../../domain/entity/UserEntity';
import Repository from '../../../domain/interfaces/Repository';
import UseCase from '../../../domain/interfaces/UseCase';
import User from '../../../domain/User';

@injectable()
class RetrieveUsersUseCase implements UseCase<User> {
  private toDomain(userEntities: Array<UserEntity>): Array<User> {
    return userEntities.map((u: UserEntity) => this.userMapper.entityToDomain(u));
  }

  constructor(
    @inject('UserRepository') private userRepository: Repository<UserEntity>,
    @inject('UserMapper') private userMapper: UserMapper,
    @inject('Logger') private logger: Logger
  ) {}

  async execute(): Promise<Array<User>> {
    this.logger.debug('Executing RetrieveUsersUseCase...');
    const usersRetrieved: Array<UserEntity> = await this.userRepository.retrieve();

    return this.toDomain(usersRetrieved);
  }
}

export default RetrieveUsersUseCase;
