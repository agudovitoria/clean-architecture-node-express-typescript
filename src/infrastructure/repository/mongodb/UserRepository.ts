import { inject, injectable } from 'tsyringe';
import { Logger } from 'winston';
import Repository from '../../../domain/interfaces/Repository';
import UserEntity from '../../../domain/entity/UserEntity';
import Users from './model/UserModel';

export interface UserEntityRepository extends Repository<UserEntity> {}
@injectable()
class UserRepository implements UserEntityRepository {
  constructor(
    @inject('Logger') private logger: Logger
  ) {}

  async retrieve(): Promise<UserEntity[]> {
    try {
      this.logger.debug('UserRepository :: Retrieving users');
      return await Users.find({}).exec();
    } catch (e) {
      this.logger.error((e as Error)?.message);
      return [];
    }
  }

  async findById(id: string): Promise<UserEntity> {
    const userFound: UserEntity | null = await Users.findById(id).exec();

    if (!userFound) {
      throw new Error(`Cannot find user with id ${id}`);
    }

    return userFound;
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    if (!entity) {
      // TODO: Make domain error
      throw new Error('Cannot create undefined model');
    }

    this.logger.debug(`Persisting user: ${JSON.stringify(entity)}`);

    return new Users(entity).save();
  }

  async update(id: string, entity: UserEntity): Promise<UserEntity> {
    if (!id) {
      // TODO: Make domain error
      throw new Error('Cannot update model without identifier');
    }

    if (!entity) {
      // TODO: Make domain error
      throw new Error('Cannot create undefined entity');
    }

    const updateResult: UserEntity | null = await Users
      .findOneAndUpdate({ _id: id }, entity).exec();

    if (!updateResult) {
      throw new Error(`Cannot update document with id: ${id}`);
    }

    return updateResult;
  }

  async delete(id: string): Promise<UserEntity> {
    if (!id) {
      // TODO: Make domain error
      throw new Error('Cannot update model without identifier');
    }

    const deletedResult: UserEntity | null = await Users.findByIdAndDelete(id).exec();

    if (!deletedResult) {
      throw new Error(`Cannot delete document with id: ${id}`);
    }

    return deletedResult;
  }
}

export default UserRepository;
