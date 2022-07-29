import 'reflect-metadata';
import { urlencoded, json } from 'body-parser';
import express, { Express } from 'express';
import { inject, injectable } from 'tsyringe';
import { Logger } from 'winston';
import listEndpoints, { Endpoint } from 'express-list-endpoints';
import mongoose from 'mongoose';
import Route from '../domain/interfaces/Route';

@injectable()
class App {
  private app: Express = express();

  private port = process.env.PORT || '8080';

  constructor(
    @inject('StatusRoute') private statusRoute: Route,
    @inject('UserRoute') private userRoute: Route,
    @inject('DefaultRoute') private defaultRoute: Route,
    @inject('Logger') private logger: Logger,
  ) {
    if (!this.defaultRoute) {
      throw new Error('App :: Cannot access to DefaultRoute');
    }

    if (!this.userRoute) {
      throw new Error('App :: Cannot access to UserRoute');
    }

    // TODO: Set mongoose debug output
    mongoose.set('debug', (collectionName, method, query, doc) => {
      logger.debug(`${collectionName}.${method}`, JSON.stringify(query), doc);
    });

    this.app.use(urlencoded({ extended: false }));
    this.app.use(json());

    this.app.use('/api/status', this.statusRoute.getRouter());
    this.app.use('/api/user', this.userRoute.getRouter());
    this.app.use('*', this.defaultRoute.getRouter());

    this.app.listen(this.port, (): void => {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const endpoints: Endpoint[] = listEndpoints(this.app);
      this.logger.debug(`⚡️[server]: Server is running at http://localhost:${this.port}`);
      this.logger.debug('Endpoints:');
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      endpoints.forEach(({ path, methods }: Endpoint) => this.logger.debug(`\t[${methods.join(',')}] => ${path}`));
    });
  }
}

export default App;
