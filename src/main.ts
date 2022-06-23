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
import App from './App';
import DefaultRoute from './infrastructure/rest/routes/DefaultRoute';
import MongoDBConnection from './infrastructure/repository/mongodb/MongoDBConnection';
import UserController from './infrastructure/rest/controllers/UserController';
import UserMapper from './application/mapper/UserMapper';
import UserModel from './infrastructure/repository/mongodb/model/UserModel';
import UserRepository from './infrastructure/repository/mongodb/UserRepository';
import UserService from './application/service/UserService';
import UserRoute from './infrastructure/rest/routes/UserRoute';

const configPath = path.join(__dirname, process.env.NODE_ENV ? `../.env.${process.env.NODE_ENV}` : '.env');

dotenv.config({ path: configPath });

const loggerOptions: LoggerOptions = {
  level: 'info',
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
container.registerSingleton<UserMapper>('UserMapper', UserMapper);
container.registerInstance<UserEntityModel>('UserModel', UserModel);
container.registerSingleton<UserRepository>('UserRepository', UserRepository);
container.registerSingleton<UserService>('UserService', UserService);
container.registerSingleton<UserController>('UserController', UserController);
container.registerSingleton<UserRoute>('UserRoute', UserRoute);

// Database DI resolutions
container.registerSingleton<MongoDBConnection>('MongoDBConnection', MongoDBConnection);

// Connect to database
container.resolve<MongoDBConnection>(MongoDBConnection);

const app = container.resolve<App>(App);

export default app;
