import { Connection, connect } from 'mongoose';
import { inject, singleton } from 'tsyringe';
import { Logger } from 'winston';

@singleton()
class MongoDBConnection {
  private connection: Connection | null = null;

  private async connect(connectionString: string) {
    try {
      await connect(connectionString);
    } catch (e) {
      this.logger.error(e);
      throw new Error('Cannot connect to Mongo Database');
    }
  }

  constructor(
  @inject('DbConnection') connectionString: string,
    @inject('Logger') private logger: Logger
  ) {
    logger.debug(`Connecting database on: ${connectionString}`);
    this.connect(connectionString)
      .then(() => { this.logger.debug('MongoDBConnection :: Connected successfully to database'); })
      .catch((msg: string) => { this.logger.error('MongoDBConnection :: Connection to database failed', msg); });
  }
}

export default MongoDBConnection;
