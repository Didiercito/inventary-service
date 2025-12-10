import { Router } from "express";
import { buildDependencies } from "../dependencies/dependencies";
import { AppDataSource } from "../../../config/database";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();
const deps = buildDependencies(AppDataSource);
const { controllers } = deps;

router.get(
  "/kitchens/:kitchenId/items",
  (req, res) =>
    controllers.getKitchenInventoryController.execute(req, res)
);

router.post(
  "/kitchens/:kitchenId/products/register",
  authenticate, 
  (req, res) =>
    controllers.registerProductController.execute(req, res)
);

router.post(
  "/kitchens/:kitchenId/items/:productId/add",
  authenticate,
  (req, res) =>
    controllers.addStockController.execute(req, res)
);

router.post(
  "/kitchens/:kitchenId/items/:productId/remove",
  authenticate,
  (req, res) =>
    controllers.removeStockController.execute(req, res)
);

router.post(
  "/kitchens/:kitchenId/items/:productId/set",
  authenticate,
  (req, res) =>
    controllers.setStockController.execute(req, res)
);

router.put(
  "/kitchens/:kitchenId/products/:productId",
  authenticate,
  (req, res) =>
    controllers.updateProductController.execute(req, res)
);

router.delete(
  "/kitchens/:kitchenId/products/:productId",
  authenticate,
  (req, res) =>
    controllers.deleteProductController.execute(req, res)
);

router.get(
  "/kitchens/:kitchenId/products/:productId",
  authenticate,
  (req, res) =>
    controllers.findProductByIdController.execute(req, res)
);

router.get(
  "/kitchens/:kitchenId/products/category/:categoryId",
  authenticate,
  (req, res) =>
    controllers.filterProductsByCategoryController.execute(req, res)
);

export default router;