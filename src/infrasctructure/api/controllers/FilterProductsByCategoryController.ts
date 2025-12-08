import { Request, Response } from "express";
import { FilterProductsByCategoryUseCase } from
  "../../../application/use-cases/FilterProductsByCategoryUseCase";

export class FilterProductsByCategoryController {
  constructor(private readonly useCase: FilterProductsByCategoryUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const kitchenId = Number(req.params.kitchenId);
      const categoryId = Number(req.params.categoryId);

      if (!Number.isInteger(kitchenId) || kitchenId <= 0) {
        return res.status(400).json({
          success: false,
          message: "kitchenId inválido",
        });
      }

      if (!Number.isInteger(categoryId) || categoryId <= 0) {
        return res.status(400).json({
          success: false,
          message: "categoryId inválido",
        });
      }

      const data = await this.useCase.execute(kitchenId, categoryId);

      return res.status(200).json({
        success: true,
        data,
      });

    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Error al filtrar productos por categoría",
      });
    }
  }
}