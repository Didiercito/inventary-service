import { InventoryItem } from "../../domain/entities/InventoryItem";
import { IInventoryRepository } from "../../domain/interfaces/IInventoryRepository";

export class AddStockUseCase {
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
        detail: "Debe ser entero mayor a 0",
        received: kitchenId,
      };
    }

    if (!Number.isInteger(productId) || productId <= 0) {
      throw {
        success: false,
        message: "productId inválido",
        detail: "Debe ser entero mayor a 0",
        received: productId,
      };
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      throw {
        success: false,
        message: "Cantidad inválida",
        detail: "amount debe ser mayor a 0",
        received: amount,
      };
    }

    if (!Number.isInteger(userId) || userId <= 0) {
      throw {
        success: false,
        message: "userId inválido",
        detail: "Debe ser entero mayor a 0",
        received: userId,
      };
    }

    const exists = await this.inventoryRepo.exists(kitchenId, productId);

    if (!exists) {
      const newItem = new InventoryItem({
        kitchenId,
        productId,
        quantity: amount,
        updatedBy: userId,
      });

      return await this.inventoryRepo.create(newItem);
    }

    return await this.inventoryRepo.addStock(kitchenId, productId, amount, userId);
  }
}