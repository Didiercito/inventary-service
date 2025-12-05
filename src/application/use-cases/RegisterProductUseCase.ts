import { IProductRepository } from "../../domain/interfaces/IProductRepository";
import { Product } from "../../domain/entities/Product";
import { validateInput } from "../../domain/validators/validators";

export class RegisterProductUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(input: any) {
    const product = await validateInput(Product, input);

    if (!product.categoryId || product.categoryId <= 0) {
      throw {
        success: false,
        message: "categoryId inválido",
        detail: "Debe ser un entero mayor a 0",
        received: product.categoryId,
      };
    }

    if (product.id) {
      throw {
        success: false,
        message: "No debes enviar ID al registrar producto nuevo",
      };
    }

    return await this.productRepo.register(product);
  }
}
