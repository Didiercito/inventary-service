import { Request, Response } from "express";
import { CreateCategoryUseCase } from "../../../application/use-cases/CreateCategoryUseCase";
import { validateInput } from "../../../domain/validators/validators";
import { Category } from "../../../domain/entities/Category";

export class CreateCategoryController {
  constructor(
    private readonly useCase: CreateCategoryUseCase
  ) {}

  async execute(req: Request, res: Response) {
    try {
      const category = await validateInput(Category, req.body);

      const result = await this.useCase.execute(category);

      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message ?? "Error al crear categoría",
        errors: error.errors,
      });
    }
  }
}