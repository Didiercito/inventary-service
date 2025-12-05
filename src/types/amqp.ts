import { Channel, Connection, Replies, Options, ConsumeMessage } from "amqplib";

export interface IRabbitConfig {
  url: string;
  exchange: string;
  exchangeType: ExchangeType;
}

export interface IRabbitConnection {
  connection: Connection;
  channel: Channel;
}

export type ExchangeType =
  | "direct"
  | "topic"
  | "fanout"
  | "headers";

export interface IPublishOptions extends Options.Publish {}

export interface IConsumeOptions extends Options.Consume {}

export interface IAssertQueueReply extends Replies.AssertQueue {}

export interface IRabbitMessage extends ConsumeMessage {
  content: Buffer;
}

export interface IBaseEvent {
  timestamp: string;
  originService: string;
  action: string;
  payload: unknown;
}