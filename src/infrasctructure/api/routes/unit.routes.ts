import { Router } from "express";
import { buildDependencies } from "../dependencies/dependencies";
import { AppDataSource } from "../../../config/database";

const router = Router();
const deps = buildDependencies(AppDataSource);
const { controllers } = deps;

router.get(
  "/units",
  (req, res) =>
    controllers.getUnitsController.execute(req, res)
);

export default router;