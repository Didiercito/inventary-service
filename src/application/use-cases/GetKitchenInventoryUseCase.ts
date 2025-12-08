import { IInventoryQueryRepository } from "../../domain/interfaces/IInventoryQueryRepository";

export class GetKitchenInventoryUseCase {
  constructor(
    private readonly inventoryQueryRepo: IInventoryQueryRepository
  ) {}

  async execute(kitchenId: number) {
    return {
      success: true,
      items: await this.inventoryQueryRepo.findKitchenInventory(kitchenId)
    };
  }
}