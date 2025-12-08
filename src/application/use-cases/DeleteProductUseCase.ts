import { IProductRepository } from "../../domain/interfaces/IProductRepository";
import { IInventoryRepository } from "../../domain/interfaces/IInventoryRepository";

export class DeleteProductUseCase {
  constructor(
    private readonly productRepo: IProductRepository,
    private readonly inventoryRepo: IInventoryRepository
  ) {}

  async execute(kitchenId: number, productId: number) {
    await this.inventoryRepo.delete(kitchenId, productId);
    await this.productRepo.delete(kitchenId, productId);

    return {
      success: true,
      message: "Producto eliminado correctamente",
    };
  }
}