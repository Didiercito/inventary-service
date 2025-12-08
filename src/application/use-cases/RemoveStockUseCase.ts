import { IInventoryRepository } from "../../domain/interfaces/IInventoryRepository";

export class RemoveStockUseCase {
  constructor(private readonly inventoryRepo: IInventoryRepository) {}

  async execute(
    kitchenId: number,
    productId: number,
    amount: number,
    userId: number
  ) {
    return this.inventoryRepo.removeStock(
      kitchenId,
      productId,
      amount,
      userId
    );
  }
}
