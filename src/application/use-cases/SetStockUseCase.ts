import { IInventoryRepository } from "../../domain/interfaces/IInventoryRepository";

export class SetStockUseCase {
  constructor(private readonly inventoryRepo: IInventoryRepository) {}

  async execute(
    kitchenId: number,
    productId: number,
    quantity: number,
    userId: number
  ) {
    return this.inventoryRepo.setStock(
      kitchenId,
      productId,
      quantity,
      userId
    );
  }
}