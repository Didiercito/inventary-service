import { IProductRepository } from "../../domain/interfaces/IProductRepository";

export class FilterProductsByCategoryUseCase {
  constructor(
    private readonly productRepo: IProductRepository
  ) {}

  async execute(kitchenId: number, categoryId: number) {
    const products = await this.productRepo.filterByCategory(
      kitchenId,
      categoryId
    );

    return products.map(p => ({
      id: p.id!,
      name: p.name,
      categoryId: p.categoryId,
      unit: p.unit,             
      perishable: p.perishable,
      shelfLifeDays: p.shelfLifeDays ?? null,
    }));
  }
}