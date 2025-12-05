import { AppDataSource } from "./database";
import { RabbitMQ } from "./rabbitmq";

export async function initConfig() {
  console.log("⚙ Inicializando configuración...");

  await AppDataSource.initialize();
  console.log("🟢 Base de datos conectada correctamente");

  await RabbitMQ.init();
  console.log("🟢 RabbitMQ conectado correctamente");
}
