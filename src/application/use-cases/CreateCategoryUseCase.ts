import { ICategoryRepository } from "../../domain/interfaces/ICategoryRepository";
import { Category } from "../../domain/entities/Category";
import { validateInstance } from "../../domain/validators/validators";

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepo: ICategoryRepository
  ) {}

  async execute(input: Category) {
    await validateInstance(input);

    const created = await this.categoryRepo.register(input);

    return {
      success: true,
      message: "Categoría creada correctamente",
      data: created,
    };
  }
}