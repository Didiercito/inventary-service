import { IInventoryRepository } from "../../domain/interfaces/IInventoryRepository";

export class RemoveStockUseCase {
  constructor(private readonly inventoryRepo: IInventoryRepository) {}

  async execute(
    kitchenId: number,
    productId: number,
    amount: number,
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

    if (!Number.isFinite(amount) || amount <= 0) {
      throw {
        success: false,
        message: "amount inválido",
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
        message: "Producto no existe en el inventario de esta cocina",
      };
    }

    return await this.inventoryRepo.removeStock(
      kitchenId,
      productId,
      amount,
      userId
    );
  }
}