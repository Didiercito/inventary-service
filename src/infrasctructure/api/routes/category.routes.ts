import { Router } from "express";
import { buildDependencies } from "../dependencies/dependencies";
import { AppDataSource } from "../../../config/database";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();
const deps = buildDependencies(AppDataSource);
const { controllers } = deps;

router.get(
  "/",
  (req, res) =>
    controllers.getCategoriesController.execute(req, res)
);

router.post(
  "/",
  authenticate,
  (req, res) =>
    controllers.createCategoryController.execute(req, res)
);

router.put(
  "/:id",
  authenticate,
  (req, res) =>
    controllers.updateCategoryController.execute(req, res)
);

router.delete(
  "/:id",
  authenticate,
  (req, res) =>
    controllers.deleteCategoryController.execute(req, res)
);

export default router;