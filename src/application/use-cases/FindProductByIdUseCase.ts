import { IProductRepository } from "../../domain/interfaces/IProductRepository";

export class FindProductByIdUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(kitchenId: number, productId: number) {
    return this.productRepo.findById(kitchenId, productId);
  }
}