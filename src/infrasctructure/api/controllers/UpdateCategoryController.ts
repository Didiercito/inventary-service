import { Request, Response } from "express";
import { UpdateCategoryUseCase } from "../../../application/use-cases/UpdateCategoryUseCase";

export class UpdateCategoryController {
  constructor(
    private readonly useCase: UpdateCategoryUseCase
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

      const result = await this.useCase.execute(categoryId, req.body);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message ?? "Error al actualizar categoría",
      });
    }
  }
}