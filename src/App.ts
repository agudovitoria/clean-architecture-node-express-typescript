import 'reflect-metadata';
import dotenv from 'dotenv';
import { container } from 'tsyringe';
import {
  createLogger,
  format,
  Logger,
  LoggerOptions,
  transports,
} from 'winston';

import path from 'path';
import App from './application/App';
import DefaultRoute from './application/routes/DefaultRoute';
import MongoDBConnection from './infrastructure/repository/mongodb/MongoDBConnection';
import UserMapper, { UserModelMapper } from './application/mapper/UserMapper';
import UserModel, { UserEntityModel } from './infrastructure/repository/mongodb/model/UserModel';
import UserRepository, { UserEntityRepository } from './infrastructure/repository/mongodb/UserRepository';
import UserService, { UserModelService } from './application/service/UserService';
import UserController, { UserModelController } from './infrastructure/rest/controllers/UserController';
import UserRoute from './application/routes/UserRoute';
import StatusRoute from './application/routes/StatusRoute';
import RetrieveUsersUseCase from './application/usecases/users/RetrieveUsersUseCase';
import CreateUserUseCase from './application/usecases/users/CreateUserUseCase';

const configPath = path.join(__dirname, process.env.NODE_ENV ? `../.env.${process.env.NODE_ENV}` : '.env');

dotenv.config({ path: configPath });

const environmentMode: string = process.env.NODE_ENV || 'production';
// eslint-disable-next-line no-console
console.info(`Started on ${environmentMode} mode`);
const isProd = environmentMode === 'production';

const loggerOptions: LoggerOptions = {
  level: isProd ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({
      format: 'DD/MM/YY HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: isProd
    ? []
    : [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
        )
      })
    ]
};

// Logging DI resolutions
container.registerInstance<Logger>('Logger', createLogger(loggerOptions));

// Configuration DI resolutions
container.registerInstance<string>('DbConnection', process.env.MONGO_DB_CONNECTION || '');

// Generic DI resolutions
container.registerSingleton<StatusRoute>('StatusRoute', StatusRoute);
container.registerSingleton<DefaultRoute>('DefaultRoute', DefaultRoute);

// User domain DI resolutions
container.registerSingleton<UserModelMapper>('UserMapper', UserMapper);
container.registerInstance<UserEntityModel>('UserModel', UserModel);
container.registerSingleton<UserEntityRepository>('UserRepository', UserRepository);
container.registerSingleton<CreateUserUseCase>('CreateUserUseCase', CreateUserUseCase);
container.registerSingleton<RetrieveUsersUseCase>('RetrieveUsersUseCase', RetrieveUsersUseCase);
container.registerSingleton<UserModelService>('UserService', UserService);
container.registerSingleton<UserModelController>('UserController', UserController);
container.registerSingleton<UserRoute>('UserRoute', UserRoute);

// Database DI resolutions
container.registerSingleton<MongoDBConnection>('MongoDBConnection', MongoDBConnection);

// Connect to database
container.resolve<MongoDBConnection>(MongoDBConnection);

const app = container.resolve<App>(App);

export default app;
