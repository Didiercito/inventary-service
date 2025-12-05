import { Router } from "express";
import { verifyKitchenPermission } from "../../../middleware/verifyKitchenPermission";
import { buildDependencies } from "../dependencies/dependencies";
import { AppDataSource } from "../../../config/database";

const router = Router();
const deps = buildDependencies(AppDataSource);

const { controllers, repos } = deps;

router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Autenticación requerida",
    });
  }
  next();
});

router.post(
  "/kitchens/:kitchenId/inventory/:productId/add",
  verifyKitchenPermission(repos.membershipRepo, ["Admin_cocina"]),
  (req, res) => controllers.addStockController.execute(req, res)
);

router.post(
  "/kitchens/:kitchenId/inventory/:productId/remove",
  verifyKitchenPermission(repos.membershipRepo, ["Admin_cocina"]),
  (req, res) => controllers.removeStockController.execute(req, res)
);

router.post(
  "/kitchens/:kitchenId/inventory/:productId/set",
  verifyKitchenPermission(repos.membershipRepo, ["Admin_cocina"]),
  (req, res) => controllers.setStockController.execute(req, res)
);

router.get(
  "/kitchens/:kitchenId/inventory/stock-filter",
  verifyKitchenPermission(repos.membershipRepo, ["Admin_cocina"]),
  (req, res) => controllers.filterInventoryByStockController.execute(req, res)
);

router.post(
  "/kitchens/:kitchenId/products",
  verifyKitchenPermission(repos.membershipRepo, ["Admin_cocina"]),
  (req, res) => controllers.createProductController.execute(req, res)
);

router.put(
  "/kitchens/:kitchenId/products/:productId",
  verifyKitchenPermission(repos.membershipRepo, ["Admin_cocina"]),
  (req, res) => controllers.updateProductController.execute(req, res)
);

router.delete(
  "/kitchens/:kitchenId/products/:productId",
  verifyKitchenPermission(repos.membershipRepo, ["Admin_cocina"]),
  (req, res) => controllers.deleteProductController.execute(req, res)
);

router.get(
  "/kitchens/:kitchenId/products/:productId",
  verifyKitchenPermission(repos.membershipRepo, ["Admin_cocina"]),
  (req, res) => controllers.findProductByIdController.execute(req, res)
);

router.get(
  "/kitchens/:kitchenId/products/category/:categoryId",
  verifyKitchenPermission(repos.membershipRepo, ["Admin_cocina"]),
  (req, res) => controllers.filterProductsByCategoryController.execute(req, res)
);

export default router;