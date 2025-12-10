import { Request, Response } from "express";
import { DeleteCategoryUseCase } from "../../../application/use-cases/DeleteCategoryUseCase";

export class DeleteCategoryController {
  constructor(
    private readonly useCase: DeleteCategoryUseCase
  ) {}

  async execute(req: Request, res: Response) {
    try {
      const categoryId = Number(req.params.id);

      if (!Number.isInteger(categoryId) || categoryId <= 0) {
        return res.status(400).json({
          success: false,
          message: "categoryId inválido",
        });
      }

      const result = await this.useCase.execute(categoryId);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message ?? "Error al eliminar categoría",
      });
    }
  }
}