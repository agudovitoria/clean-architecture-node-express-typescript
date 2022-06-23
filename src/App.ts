import 'reflect-metadata';
import { urlencoded, json } from 'body-parser';
import express, { Express } from 'express';
import { inject, injectable } from 'tsyringe';
import { Logger } from 'winston';
import Route from './domain/interfaces/Route';

@injectable()
class App {
  private app: Express = express();

  private port = process.env.PORT || '8080';

  constructor(
  @inject('UserRoute') userRoute: Route,
    @inject('DefaultRoute') defaultRoute: Route,
    @inject('Logger') logger: Logger,
  ) {
    if (!defaultRoute) {
      throw new Error('App :: Cannot access to DefaultRoute');
    }

    if (!userRoute) {
      throw new Error('App :: Cannot access to UserRoute');
    }

    this.app.use(urlencoded({ extended: false }));
    this.app.use(json());

    this.app.use('/api/user', userRoute.getRouter());
    this.app.use('*', defaultRoute.getRouter());

    this.app.listen(this.port, () => {
      logger?.info(`⚡️[server]: Server is running at http://localhost:${this.port}`);
    });
  }
}

export default App;
