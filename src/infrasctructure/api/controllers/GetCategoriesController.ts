import { Request, Response } from "express";
import { GetAllCategoriesUseCase } from "../../../application/use-cases/GetAllCategoriesUseCase";

export class GetCategoriesController {
  constructor(
    private readonly useCase: GetAllCategoriesUseCase
  ) {}

  async execute(_req: Request, res: Response) {
    try {
      const result = await this.useCase.execute();
      return res.status(200).json(result);
    } catch {
      return res.status(500).json({
        success: false,
        message: "Error al obtener categorías",
      });
    }
  }
}