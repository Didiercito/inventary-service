import { ICategoryRepository } from "../../domain/interfaces/ICategoryRepository";

export class DeleteCategoryUseCase {
  constructor(
    private readonly categoryRepo: ICategoryRepository
  ) {}

  async execute(categoryId: number) {
    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      throw {
        success: false,
        message: "categoryId inválido",
      };
    }

    const exists = await this.categoryRepo.findById(categoryId);

    if (!exists) {
      throw {
        success: false,
        message: "Categoría no encontrada",
      };
    }

    await this.categoryRepo.delete(categoryId);

    return {
      success: true,
      message: "Categoría eliminada correctamente",
    };
  }
}