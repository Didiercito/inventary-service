import { IProductRepository } from "../../domain/interfaces/IProductRepository";
import { IInventoryRepository } from "../../domain/interfaces/IInventoryRepository";
import { Product } from "../../domain/entities/Product";
import { InventoryItem } from "../../domain/entities/InventoryItem";

export class RegisterProductUseCase {
  constructor(
    private readonly productRepo: IProductRepository,
    private readonly inventoryRepo: IInventoryRepository
  ) {}

  async execute(
    kitchenId: number,
    userId: number,
    product: Product
  ) {
    if (!Number.isInteger(userId) || userId <= 0) {
      throw {
        success: false,
        message: "userId inválido",
      };
    }

    const exists = await this.productRepo.existsByName(
      kitchenId,
      product.name
    );

    if (exists) {
      throw {
        success: false,
        message: "El producto ya existe en esta cocina",
      };
    }

    const savedProduct = await this.productRepo.register(product);

    const inventoryItem = new InventoryItem({
      kitchenId,
      productId: savedProduct.id!,
      quantity: 0,
      updatedBy: userId,
    });

    const inventory = await this.inventoryRepo.create(inventoryItem);

    return {
      success: true,
      message: "Producto registrado y agregado al inventario",
      product: savedProduct,
      inventory,
    };
  }
}