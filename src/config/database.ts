import { DataSource } from "typeorm";
import { env } from "./env";

import { ProductSchema } from "../database/schemas/ProductSchema";
import { CategorySchema } from "../database/schemas/CategorySchema";
import { InventoryItemSchema } from "../database/schemas/InventoryItemSchema";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  logging: env.nodeEnv !== "production",
  entities: [ProductSchema, CategorySchema, InventoryItemSchema],
});