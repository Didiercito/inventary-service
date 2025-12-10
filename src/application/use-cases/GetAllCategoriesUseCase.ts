import { ICategoryRepository } from "../../domain/interfaces/ICategoryRepository";

export class GetAllCategoriesUseCase {
  constructor(
    private readonly categoryRepo: ICategoryRepository
  ) {}

  async execute() {
    const categories = await this.categoryRepo.findAll();

    return {
      success: true,
      data: categories,
    };
  }
}