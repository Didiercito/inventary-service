import { DataSource } from "typeorm";
import { ProductSchema } from "../../../database/schemas/ProductSchema";
import { InventoryItemSchema } from "../../../database/schemas/InventoryItemSchema";
import { KitchenMembershipSchema } from "../../../database/schemas/KitchenMembershipSchema";
import { CategorySchema } from "../../../database/schemas/CategorySchema";

import { ProductAdapter } from "../../adapters/ProductAdapter";
import { InventoryAdapter } from "../../adapters/InventoryAdapter";
import { CategoryAdapter } from "../../adapters/CategoryAdapter";
import { KitchenMembershipInventoryRepo } from "../../../database/repositories/KitchenMembershipInventoryRepo";

import { RegisterProductUseCase } from "../../../application/use-cases/RegisterProductUseCase";
import { UpdateProductUseCase } from "../../../application/use-cases/UpdateProductUseCase";
import { DeleteProductUseCase } from "../../../application/use-cases/DeleteProductUseCase";
import { FindProductByIdUseCase } from "../../../application/use-cases/FindProductByIdUseCase";
import { FilterProductsByCategoryUseCase } from "../../../application/use-cases/FilterProductsByCategoryUseCase";

import { AddStockUseCase } from "../../../application/use-cases/AddStockUseCase";
import { RemoveStockUseCase } from "../../../application/use-cases/RemoveStockUseCase";
import { SetStockUseCase } from "../../../application/use-cases/SetStockUseCase";
import { FilterInventoryByStockUseCase } from "../../../application/use-cases/FilterInventoryByStockUseCase";
import { GetKitchenInventoryUseCase } from "../../../application/use-cases/GetKitchenInventoryUseCase";

import { CreateCategoryUseCase } from "../../../application/use-cases/CreateCategoryUseCase";
import { GetAllCategoriesUseCase } from "../../../application/use-cases/GetAllCategoriesUseCase";
import { UpdateCategoryUseCase } from "../../../application/use-cases/UpdateCategoryUseCase";
import { DeleteCategoryUseCase } from "../../../application/use-cases/DeleteCategoryUseCase";

import { GetUnitsUseCase } from "../../../application/use-cases/GetUnitsUseCase";

import { RegisterProductController } from "../controllers/RegisterProductController";
import { UpdateProductController } from "../controllers/UpdateProductController";
import { DeleteProductController } from "../controllers/DeleteProductController";
import { FindProductByIdController } from "../controllers/FindProductByIdController";
import { FilterProductsByCategoryController } from "../controllers/FilterProductsByCategoryController";

import { AddStockController } from "../controllers/AddStockController";
import { RemoveStockController } from "../controllers/RemoveStockController";
import { SetStockController } from "../controllers/SetStockController";
import { FilterInventoryByStockController } from "../controllers/FilterInventoryByStockController";
import { GetKitchenInventoryController } from "../controllers/GetKitchenInventoryController";

import { CreateCategoryController } from "../controllers/CreateCategoryController";
import { GetCategoriesController } from "../controllers/GetCategoriesController";
import { UpdateCategoryController } from "../controllers/UpdateCategoryController";
import { DeleteCategoryController } from "../controllers/DeleteCategoryController";
import { GetUnitsController } from "../controllers/GetUnitsController";

export function buildDependencies(db: DataSource) {

  const productOrmRepo = db.getRepository(ProductSchema);
  const inventoryOrmRepo = db.getRepository(InventoryItemSchema);
  const membershipOrmRepo = db.getRepository(KitchenMembershipSchema);
  const categoryOrmRepo = db.getRepository(CategorySchema);

  const productRepo = new ProductAdapter(productOrmRepo);
  const inventoryRepo = new InventoryAdapter(inventoryOrmRepo);
  const membershipRepo = new KitchenMembershipInventoryRepo(membershipOrmRepo);
  const categoryRepo = new CategoryAdapter(categoryOrmRepo);

  const registerProductUseCase =
    new RegisterProductUseCase(productRepo, inventoryRepo);

  const updateProductUseCase =
    new UpdateProductUseCase(productRepo);

  const deleteProductUseCase =
    new DeleteProductUseCase(productRepo, inventoryRepo);

  const findProductByIdUseCase =
    new FindProductByIdUseCase(productRepo);

  const filterProductsByCategoryUseCase =
    new FilterProductsByCategoryUseCase(productRepo);

  const addStockUseCase =
    new AddStockUseCase(inventoryRepo);

  const removeStockUseCase =
    new RemoveStockUseCase(inventoryRepo);

  const setStockUseCase =
    new SetStockUseCase(inventoryRepo);

  const filterInventoryByStockUseCase =
    new FilterInventoryByStockUseCase(inventoryRepo);

  const getKitchenInventoryUseCase =
    new GetKitchenInventoryUseCase(inventoryRepo);

  const createCategoryUseCase =
    new CreateCategoryUseCase(categoryRepo);

  const getAllCategoriesUseCase =
    new GetAllCategoriesUseCase(categoryRepo);

  const updateCategoryUseCase =
    new UpdateCategoryUseCase(categoryRepo);

  const deleteCategoryUseCase =
    new DeleteCategoryUseCase(categoryRepo);

  const getUnitsUseCase =
    new GetUnitsUseCase();

  const registerProductController =
    new RegisterProductController(registerProductUseCase);

  const updateProductController =
    new UpdateProductController(updateProductUseCase);

  const deleteProductController =
    new DeleteProductController(deleteProductUseCase);

  const findProductByIdController =
    new FindProductByIdController(findProductByIdUseCase);

  const filterProductsByCategoryController =
    new FilterProductsByCategoryController(filterProductsByCategoryUseCase);

  const addStockController =
    new AddStockController(addStockUseCase);

  const removeStockController =
    new RemoveStockController(removeStockUseCase);

  const setStockController =
    new SetStockController(setStockUseCase);

  const filterInventoryByStockController =
    new FilterInventoryByStockController(filterInventoryByStockUseCase);

  const getKitchenInventoryController =
    new GetKitchenInventoryController(getKitchenInventoryUseCase);

  const createCategoryController =
    new CreateCategoryController(createCategoryUseCase);

  const getCategoriesController =
    new GetCategoriesController(getAllCategoriesUseCase);

  const updateCategoryController =
    new UpdateCategoryController(updateCategoryUseCase);

  const deleteCategoryController =
    new DeleteCategoryController(deleteCategoryUseCase);

  const getUnitsController =
    new GetUnitsController(getUnitsUseCase);

  return {
    repos: {
      productRepo,
      inventoryRepo,
      membershipRepo,
      categoryRepo,
    },
    controllers: {
      registerProductController,
      updateProductController,
      deleteProductController,
      findProductByIdController,
      filterProductsByCategoryController,

      addStockController,
      removeStockController,
      setStockController,
      filterInventoryByStockController,
      getKitchenInventoryController,

      createCategoryController,
      getCategoriesController,
      updateCategoryController,
      deleteCategoryController,
      getUnitsController,
    },
  };
}