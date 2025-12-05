import { IProductRepository } from "../../domain/interfaces/IProductRepository";

export class FilterProductsByCategoryUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(categoryId: number) {
    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      throw {
        success: false,
        message: "categoryId inválido",
        detail: "Debe ser entero mayor a 0",
        received: categoryId,
      };
    }

    return await this.productRepo.filterByCategory(categoryId);
  }
}