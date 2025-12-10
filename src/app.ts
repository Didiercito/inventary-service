import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { AppDataSource } from "./config/database";

import inventoryRoutes from "./infrasctructure/api/routes/inventary.routes";
import categoryRoutes from "./infrasctructure/api/routes/category.routes";
import unitRoutes from "./infrasctructure/api/routes/unit.routes";

const app = express();

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    service: "Inventary-Service",
    status: "OK",
    timestamp: new Date(),
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Inventary DB Connected!");

    app.use("/api/v1/inventory", inventoryRoutes);

    app.use("/api/v1/inventory/categories", categoryRoutes);

    app.use("/api/v1/inventory/units", unitRoutes);

    console.log("Inventory, Category & Unit Routes Loaded Successfully");
  })
  .catch((error) => {
    console.error("Cannot connect to DB", error);
  });

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("Unexpected Error:", err);

  return res.status(err.status || 500).json({
    success: false,
    message: "Error interno en Inventary-Service",
    error: err.message || "unknown",
  });
});

export default app;