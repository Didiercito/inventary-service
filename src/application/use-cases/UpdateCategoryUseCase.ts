import { ICategoryRepository } from "../../domain/interfaces/ICategoryRepository";
import { Category } from "../../domain/entities/Category";
import { validateInstance } from "../../domain/validators/validators";

export class UpdateCategoryUseCase {
  constructor(
    private readonly categoryRepo: ICategoryRepository
  ) {}

  async execute(categoryId: number, input: Partial<Category>) {
    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      throw {
        success: false,
        message: "categoryId inválido",
      };
    }

    const existing = await this.categoryRepo.findById(categoryId);

    if (!existing) {
      throw {
        success: false,
        message: "Categoría no encontrada",
      };
    }

    const updated = new Category({
      ...existing,
      ...input,
      id: categoryId,
    });

    await validateInstance(updated);

    const saved = await this.categoryRepo.update(updated);

    return {
      success: true,
      message: "Categoría actualizada correctamente",
      data: saved,
    };
  }
}