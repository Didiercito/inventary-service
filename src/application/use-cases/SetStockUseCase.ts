import { IInventoryRepository } from "../../domain/interfaces/IInventoryRepository";

export class SetStockUseCase {
  constructor(private readonly inventoryRepo: IInventoryRepository) {}

  async execute(
    kitchenId: number,
    productId: number,
    newQuantity: number,
    userId: number
  ) {
    if (!Number.isInteger(kitchenId) || kitchenId <= 0) {
      throw {
        success: false,
        message: "kitchenId inválido",
      };
    }

    if (!Number.isInteger(productId) || productId <= 0) {
      throw {
        success: false,
        message: "productId inválido",
      };
    }

    if (!Number.isFinite(newQuantity) || newQuantity < 0) {
      throw {
        success: false,
        message: "newQuantity inválido",
        detail: "Debe ser >= 0",
      };
    }

    if (!Number.isInteger(userId) || userId <= 0) {
      throw {
        success: false,
        message: "userId inválido",
      };
    }

    const exists = await this.inventoryRepo.exists(kitchenId, productId);

    if (!exists) {
      throw {
        success: false,
        message: "Producto no existe en inventario",
      };
    }

    return await this.inventoryRepo.setStock(
      kitchenId,
      productId,
      newQuantity,
      userId
    );
  }
}