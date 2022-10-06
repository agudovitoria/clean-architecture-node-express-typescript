import 'reflect-metadata';
import { container } from 'tsyringe';
import { Logger } from 'winston';

import UserMapper, { UserModelMapper } from '../../../../src/application/mapper/UserMapper';
import UserService from '../../../../src/application/service/UserService';
import CreateUserUseCase from '../../../../src/domain/usecases/users/CreateUserUseCase';
import RetrieveUsersUseCase from '../../../../src/domain/usecases/users/RetrieveUsersUseCase';
import UserController from '../../../../src/infrastructure/rest/controllers/UserController';

jest.mock('../../../../src/application/mapper/UserMapper');
jest.mock('../../../../src/application/service/UserService');
jest.mock('../../../../src/application/usecases/users/CreateUserUseCase');
jest.mock('../../../../src/application/usecases/users/RetrieveUsersUseCase', () => jest.fn().mockImplementation(() => ({
  execute: () => Promise.resolve([])
})));

describe('UserController', (): void => {
  const logger: Logger = console as unknown as Logger;

  beforeEach(() => {
    container.clearInstances();
    container.register<UserModelMapper>('UserMapper', { useClass: UserMapper });
    container.register<UserService>('UserService', { useClass: UserService });
    container.register<RetrieveUsersUseCase>('RetrieveUsersUseCase', { useClass: RetrieveUsersUseCase });
    container.register<CreateUserUseCase>('CreateUserUseCase', { useClass: CreateUserUseCase });
    container.register<UserController>('UserController', { useClass: UserController });
    container.registerInstance<Logger>('Logger', logger);
  });

  it('should create a UserController instance', (): void => {
    const userController = container.resolve<UserController>(UserController);
    expect(userController).toBeTruthy();
  });

  it('should get all users from database', async (): Promise<void> => {
    const userController = container.resolve<UserController>(UserController);
    expect(await userController.getAll()).toEqual([]);
  });
});
