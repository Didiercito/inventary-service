import { env } from "./env";
import { connect } from "amqplib";
import {
  IRabbitConfig,
  IRabbitConnection,
  IPublishOptions,
  ExchangeType,
} from "../types/amqp";

export class RabbitMQ {
  private static config: IRabbitConfig = {
    url: env.rabbitmq.url,
    exchange: env.rabbitmq.exchange,
    exchangeType: env.rabbitmq.exchangeType as ExchangeType,
  };

  private static connection: IRabbitConnection | null = null;

  static async init(): Promise<void> {
    const connection = await connect(this.config.url);
    const channel = await connection.createChannel();

    await channel.assertExchange(
      this.config.exchange,
      this.config.exchangeType,
      { durable: true }
    );

    this.connection = { connection, channel };

    console.log(
      `🐇 RabbitMQ conectado -> exchange: '${this.config.exchange}' | type: '${this.config.exchangeType}'`
    );
  }

  private static getChannel() {
    if (!this.connection?.channel) {
      throw new Error(
        "RabbitMQ no inicializado. Llama a RabbitMQ.init() antes."
      );
    }
    return this.connection.channel;
  }

  static async publish<T>(
    routingKey: string,
    payload: T,
    options?: IPublishOptions
  ): Promise<void> {
    const channel = this.getChannel();

    channel.publish(
      this.config.exchange,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true, ...options }
    );
  }
}