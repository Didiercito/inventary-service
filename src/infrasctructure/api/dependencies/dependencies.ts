import { DataSource } from "typeorm";

import { ProductSchema } from "../../../database/schemas/ProductSchema";
import { InventoryItemSchema } from "../../../database/schemas/InventoryItemSchema";
import { KitchenMembershipSchema } from "../../../database/schemas/KitchenMembershipSchema";

import { ProductAdapter } from "../../adapters/ProductAdapter";
import { InventoryAdapter } from "../../adapters/InventoryAdapter";
import { KitchenMembershipInventoryRepo } from "../../../database/repositories/KitchenMembershipInventoryRepo";

import { RegisterProductUseCase } from "../../../application/use-cases/RegisterProductUseCase";
import { CreateProductUseCase } from "../../../application/use-cases/CreateProductUseCase";
import { UpdateProductUseCase } from "../../../application/use-cases/UpdateProductUseCase";
import { DeleteProductUseCase } from "../../../application/use-cases/DeleteProductUseCase";
import { FindProductByIdUseCase } from "../../../application/use-cases/FindProductByIdUseCase";
import { FilterProductsByCategoryUseCase } from "../../../application/use-cases/FilterProductsByCategoryUseCase";

import { AddStockUseCase } from "../../../application/use-cases/AddStockUseCase";
import { RemoveStockUseCase } from "../../../application/use-cases/RemoveStockUseCase";
import { SetStockUseCase } from "../../../application/use-cases/SetStockUseCase";
import { FilterInventoryByStockUseCase } from "../../../application/use-cases/FilterInventoryByStockUseCase";

import { CreateProductController } from "../controllers/CreateProductController";
import { UpdateProductController } from "../controllers/UpdateProductController";
import { DeleteProductController } from "../controllers/DeleteProductController";
import { FindProductByIdController } from "../controllers/FindProductByIdController";
import { FilterProductsByCategoryController } from "../controllers/FilterProductsByCategoryController";

import { AddStockController } from "../controllers/AddStockController";
import { RemoveStockController } from "../controllers/RemoveStockController";
import { SetStockController } from "../controllers/SetStockController";
import { FilterInventoryByStockController } from "../controllers/FilterInventoryByStockController";


export function buildDependencies(db: DataSource) {

  const productOrmRepo = db.getRepository(ProductSchema);
  const inventoryOrmRepo = db.getRepository(InventoryItemSchema);
  const membershipOrmRepo = db.getRepository(KitchenMembershipSchema);

  const productRepo = new ProductAdapter(productOrmRepo);
  const inventoryRepo = new InventoryAdapter(inventoryOrmRepo);
  const membershipRepo = new KitchenMembershipInventoryRepo(membershipOrmRepo);

  const registerProductUseCase = new RegisterProductUseCase(productRepo);
  const createProductUseCase = new CreateProductUseCase(productRepo);
  const updateProductUseCase = new UpdateProductUseCase(productRepo);
  const deleteProductUseCase = new DeleteProductUseCase(productRepo);
  const findProductByIdUseCase = new FindProductByIdUseCase(productRepo);
  const filterProductsByCategoryUseCase =
    new FilterProductsByCategoryUseCase(productRepo);

  const addStockUseCase = new AddStockUseCase(inventoryRepo);
  const removeStockUseCase = new RemoveStockUseCase(inventoryRepo);
  const setStockUseCase = new SetStockUseCase(inventoryRepo);
  const filterInventoryByStockUseCase =
    new FilterInventoryByStockUseCase(inventoryRepo);

  const createProductController = new CreateProductController(createProductUseCase);
  const updateProductController = new UpdateProductController(updateProductUseCase);
  const deleteProductController = new DeleteProductController(deleteProductUseCase);
  const findProductByIdController = new FindProductByIdController(findProductByIdUseCase);
  const filterProductsByCategoryController =
    new FilterProductsByCategoryController(filterProductsByCategoryUseCase);

  const addStockController = new AddStockController(addStockUseCase);
  const removeStockController = new RemoveStockController(removeStockUseCase);
  const setStockController = new SetStockController(setStockUseCase);
  const filterInventoryByStockController =
    new FilterInventoryByStockController(filterInventoryByStockUseCase);


  return {
    repos: {
      productRepo,
      inventoryRepo,
      membershipRepo,
    },

    useCases: {
      registerProductUseCase,
      createProductUseCase,
      updateProductUseCase,
      deleteProductUseCase,
      findProductByIdUseCase,
      filterProductsByCategoryUseCase,

      addStockUseCase,
      removeStockUseCase,
      setStockUseCase,
      filterInventoryByStockUseCase,
    },

    controllers: {
      createProductController,
      updateProductController,
      deleteProductController,
      findProductByIdController,
      filterProductsByCategoryController,

      addStockController,
      removeStockController,
      setStockController,
      filterInventoryByStockController,
    },
  };
}
