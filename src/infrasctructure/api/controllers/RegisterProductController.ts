import { Request, Response } from "express";
import { validateInput } from "../../../domain/validators/validators";
import { Product } from "../../../domain/entities/Product";
import { RegisterProductUseCase } from "../../../application/use-cases/RegisterProductUseCase";

export class RegisterProductController {
  constructor(private readonly useCase: RegisterProductUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const data = await validateInput(Product, req.body);

      const result = await this.useCase.execute(data);

      return res.status(201).json({
        success: true,
        message: "Producto registrado correctamente",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}