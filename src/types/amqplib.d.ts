export {};

declare module "amqplib" {
  export interface Connection {
    createChannel(): Promise<Channel>;
    close(): Promise<void>;
  }

  export interface Channel {
    assertExchange(
      exchange: string,
      type: string,
      options?: { durable: boolean }
    ): Promise<any>;

    publish(
      exchange: string,
      routingKey: string,
      content: Buffer,
      options?: Record<string, any>
    ): boolean;

    consume(
      queue: string,
      cb: (msg: any) => void,
      options?: Record<string, any>
    ): Promise<any>;

    ack(message: any): void;

    nack(
      message: any,
      allUpTo?: boolean,
      requeue?: boolean
    ): void;

    assertQueue(
      queue: string,
      options?: Record<string, any>
    ): Promise<any>;

    bindQueue(
      queue: string,
      exchange: string,
      pattern: string
    ): Promise<any>;
  }

  export function connect(url: string): Promise<Connection>;
}