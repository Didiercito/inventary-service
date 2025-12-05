import { Product } from "../../domain/entities/Product";
import { IProductRepository } from "../../domain/interfaces/IProductRepository";
import { validateInstance } from "../../domain/validators/validators";

export class CreateProductUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(product: Product): Promise<Product> {
    await validateInstance(product);

    const exists = await this.productRepo.existsByName(product.name);

    if (exists) {
      throw {
        success: false,
        message: `Ya existe un producto con el nombre '${product.name}'`,
      };
    }

    const saved = await this.productRepo.register(product);

    return saved;
  }
}
