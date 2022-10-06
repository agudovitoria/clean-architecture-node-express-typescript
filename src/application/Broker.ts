import { Message } from 'amqplib';
import {
  AckOrNack,
  BrokerAsPromised,
  BrokerConfig,
  PublicationSession,
  SubscriberSessionAsPromised,
  withDefaultConfig
} from 'rascal';
import { inject } from 'tsyringe';
import { Logger } from 'winston';

type OnReceiveCallback = (message: Message, content: QueueEventBody) => void;
interface QueueEventBody {
  id: string;
  message: string;
  timestamp: Date;
}

class Broker {
  private broker: BrokerAsPromised | undefined;

  constructor(
    @inject('logger') private logger: Logger,
    @inject('queueConfig') config: BrokerConfig
  ) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async (): Promise<void> => {
      try {
        this.broker = await BrokerAsPromised.create(withDefaultConfig(config));
        this.broker.on('error', this.logger.error);
      } catch (err: unknown) {
        this.logger.error(err);
      }
    })();
  }

  async produce(topic: string, message: string): Promise<PublicationSession> {
    if (!this.broker) {
      throw new Error('Broker not defined');
    }

    const publication: PublicationSession = await this.broker.publish(topic, message);
    publication.on('error', this.logger.error);

    return publication;
  }

  async subscribe(
    topic: string,
    onReceive: OnReceiveCallback
  ): Promise<SubscriberSessionAsPromised> {
    if (!this.broker) {
      throw new Error('Broker not defined');
    }

    const subscription: SubscriberSessionAsPromised = await this.broker.subscribe(topic);
    subscription
      .on('message', (
        message: Message,
        content: QueueEventBody,
        ackOrNack: AckOrNack
      ) => {
        this.logger.log('Received message', { message, content });
        onReceive(message, content);
        ackOrNack();
      })
      .on('error', this.logger.error);

    return subscription;
  }
}

export default Broker;
