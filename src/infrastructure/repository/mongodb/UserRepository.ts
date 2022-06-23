import { DeleteResult } from 'mongodb';
import { Model, ModifyResult } from 'mongoose';
import { inject, injectable } from 'tsyringe';
import { Logger } from 'winston';
import Repository from '../../../domain/interfaces/Repository';
import UserEntity from '../../../domain/entity/UserEntity';

@injectable()
class UserRepository implements Repository<UserEntity> {
  constructor(
    @inject('UserModel') private userModel: Model<UserEntity>,
    @inject('Logger') private logger: Logger
  ) {}

  async retrieve(): Promise<UserEntity[]> {
    try {
      const usersFound: UserEntity[] = await this.userModel.find().exec();
      this.logger.debug({ usersFound });
      return usersFound;
    } catch (e) {
      this.logger.error((e as Error)?.message);
      return [];
    }
  }

  async findById(id: string): Promise<UserEntity> {
    const userFound: UserEntity | null = await this.userModel.findById(id).exec();
    this.logger.debug({ userFound });
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

    return this.userModel.create(entity);
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

    const updateResult: ModifyResult<UserEntity> | null = await this
      .userModel
      .findOneAndUpdate({ _id: id }, entity);
    const updatedObject: UserEntity | null | undefined = updateResult?.value;

    if (!updatedObject) {
      throw new Error(`Cannot update document with id: ${id}`);
    }

    return updatedObject;
  }

  async delete(id: string): Promise<boolean> {
    if (!id) {
      // TODO: Make domain error
      throw new Error('Cannot update model without identifier');
    }

    const deletedResult: DeleteResult = await this.userModel.deleteOne({ _id: id });

    return deletedResult?.deletedCount === 1 || false;
  }
}

export default UserRepository;
