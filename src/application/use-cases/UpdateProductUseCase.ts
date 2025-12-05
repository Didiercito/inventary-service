import { IProductRepository } from "../../domain/interfaces/IProductRepository";
import { Product } from "../../domain/entities/Product";
import { validateInput } from "../../domain/validators/validators";

export class UpdateProductUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(input: any) {
    const product = await validateInput(Product, input);

    if (!product.id || product.id <= 0) {
      throw {
        success: false,
        message: "ID inválido",
        detail: "id debe ser entero mayor a 0",
        received: product.id,
      };
    }

    const exists = await this.productRepo.exists(product.id);
    if (!exists) {
      throw {
        success: false,
        message: "Producto no encontrado",
        received: product.id,
      };
    }

    return await this.productRepo.update(product);
  }
}