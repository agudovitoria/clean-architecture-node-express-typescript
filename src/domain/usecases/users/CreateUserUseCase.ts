import { inject, injectable } from 'tsyringe';
import { Logger } from 'winston';
import UserMapper from '../../../application/mapper/UserMapper';
import UserEntity from '../../entity/UserEntity';
import Repository from '../../interfaces/Repository';
import UseCase from '../../interfaces/UseCase';
import User from '../../User';

@injectable()
class CreateUserUseCase implements UseCase<User> {
  private toDomain(userEntity: UserEntity): User {
    return this.userMapper.entityToDomain(userEntity);
  }

  constructor(
    @inject('UserRepository') private userRepository: Repository<UserEntity>,
    @inject('UserMapper') private userMapper: UserMapper,
    @inject('Logger') private logger: Logger
  ) {}

  async execute(user: User): Promise<User> {
    this.logger.debug(`Executing CreateUserUseCase for ${JSON.stringify(user)}`);
    const userEntityToCreate: UserEntity = this.userMapper.domainToEntity(user);
    const userEntityCreated: UserEntity = await this.userRepository.create(userEntityToCreate);

    return this.toDomain(userEntityCreated);
  }
}

export default CreateUserUseCase;
