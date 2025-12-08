import { IProductRepository } from "../../domain/interfaces/IProductRepository";
import { Product } from "../../domain/entities/Product";

export class UpdateProductUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(input: Partial<Product> & { id: number; kitchenId: number }) {
    const exists = await this.productRepo.exists(
      input.kitchenId,
      input.id
    );

    if (!exists) {
      throw {
        success: false,
        message: "Producto no encontrado",
      };
    }

    return await this.productRepo.update(input as Product);
  }
}