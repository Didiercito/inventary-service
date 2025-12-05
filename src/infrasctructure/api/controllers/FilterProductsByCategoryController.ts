import { Request, Response } from "express";
import { FilterProductsByCategoryUseCase } from "../../../application/use-cases/FilterProductsByCategoryUseCase";

export class FilterProductsByCategoryController {
  constructor(private readonly useCase: FilterProductsByCategoryUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const categoryId = Number(req.params.categoryId);

      if (!Number.isInteger(categoryId) || categoryId <= 0) {
        return res.status(400).json({
          success: false,
          message: "categoryId inválido",
        });
      }

      const data = await this.useCase.execute(categoryId);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}