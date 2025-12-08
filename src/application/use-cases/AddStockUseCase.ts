import { IInventoryRepository } from "../../domain/interfaces/IInventoryRepository";

export class AddStockUseCase {
  constructor(private readonly inventoryRepo: IInventoryRepository) {}

  async execute(
    kitchenId: number,
    productId: number,
    amount: number,
    userId: number
  ) {
    return this.inventoryRepo.addStock(
      kitchenId,
      productId,
      amount,
      userId
    );
  }
}