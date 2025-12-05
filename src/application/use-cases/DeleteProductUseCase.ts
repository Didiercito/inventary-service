import { IProductRepository } from "../../domain/interfaces/IProductRepository";

export class DeleteProductUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(productId: number) {
    if (!Number.isInteger(productId) || productId <= 0) {
      throw {
        success: false,
        message: "productId inválido",
        detail: "Debe ser entero mayor a 0",
        received: productId,
      };
    }

    const exists = await this.productRepo.exists(productId);
    if (!exists) {
      throw {
        success: false,
        message: "Producto no encontrado",
        received: productId,
      };
    }

    await this.productRepo.delete(productId);
    return { success: true };
  }
}