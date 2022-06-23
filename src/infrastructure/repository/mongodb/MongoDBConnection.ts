import { Connection, createConnection } from 'mongoose';
import { inject, injectable } from 'tsyringe';
import { Logger } from 'winston';

@injectable()
class MongoDBConnection {
  private connection: Connection | null = null;

  private async connect(connectionString: string) {
    this.connection = await createConnection(connectionString).asPromise();

    if (this.connection?.readyState !== 1) {
      throw new Error('Cannot connect to Mongo Database');
    }
  }

  constructor(
  @inject('DbConnection') connectionString: string,
    @inject('Logger') logger: Logger
  ) {
    this.connect(connectionString)
      .then(() => { logger.info('Connected successfully to server'); })
      .catch((msg: string) => { logger.error(msg); });
  }
}

export default MongoDBConnection;
