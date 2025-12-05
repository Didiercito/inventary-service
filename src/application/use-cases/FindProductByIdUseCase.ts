import { Product } from "../../domain/entities/Product";
import { IProductRepository } from "../../domain/interfaces/IProductRepository";

export class FindProductByIdUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(productId: number): Promise<Product> {
    if (!Number.isInteger(productId) || productId <= 0) {
      throw {
        success: false,
        message: "productId inválido",
        detail: "Debe ser un entero mayor que cero",
      };
    }

    const product = await this.productRepo.findById(productId);

    if (!product) {
      throw {
        success: false,
        message: "Producto no encontrado",
        productId,
      };
    }

    return product;
  }
}
