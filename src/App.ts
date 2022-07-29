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

const configPath = path.join(__dirname, process.env.NODE_ENV ? `../.env.${process.env.NODE_ENV}` : '.env');

dotenv.config({ path: configPath });

const environmentMode: string = process.env.NODE_ENV || 'production';
// eslint-disable-next-line no-console
console.info(`Started on ${environmentMode} mode`);
const isDev: boolean = environmentMode === 'development';

const loggerOptions: LoggerOptions = {
  level: isDev ? 'debug' : 'info',
  format: format.json(),
  transports: [new transports.Console()],
};

// Logging DI resolutions
container.registerInstance<Logger>('Logger', createLogger(loggerOptions));

// Configuration DI resolutions
container.registerInstance<string>('DbConnection', process.env.MONGO_DB_CONNECTION || '');

// Generic DI resolutions
container.registerSingleton<DefaultRoute>('DefaultRoute', DefaultRoute);

// User domain DI resolutions
container.registerSingleton<UserModelMapper>('UserMapper', UserMapper);
container.registerInstance<UserEntityModel>('UserModel', UserModel);
container.registerSingleton<UserEntityRepository>('UserRepository', UserRepository);
container.registerSingleton<UserModelService>('UserService', UserService);
container.registerSingleton<UserModelController>('UserController', UserController);
container.registerSingleton<UserRoute>('UserRoute', UserRoute);

// Database DI resolutions
container.registerSingleton<MongoDBConnection>('MongoDBConnection', MongoDBConnection);

// Connect to database
container.resolve<MongoDBConnection>(MongoDBConnection);

const app = container.resolve<App>(App);

export default app;
