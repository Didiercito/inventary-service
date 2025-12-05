import * as dotenv from "dotenv";

dotenv.config();

function required(name: string, value?: string): string {
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "",
  port: Number(process.env.PORT || 3007),

  db: {
    host: required("DB_HOST", process.env.DB_HOST),
    port: Number(required("DB_PORT", process.env.DB_PORT)),
    username: required("DB_USERNAME", process.env.DB_USERNAME),
    password: required("DB_PASSWORD", process.env.DB_PASSWORD),
    database: required("DB_DATABASE", process.env.DB_DATABASE),
  },

  rabbitmq: {
    url: required("RABBITMQ_URL", process.env.RABBITMQ_URL),
    exchange: required("RABBITMQ_EXCHANGE", process.env.RABBITMQ_EXCHANGE),
    exchangeType:
      process.env.RABBITMQ_EXCHANGE_TYPE || "",
  },
};
