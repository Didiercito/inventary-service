import { Request, Response } from "express";
import { validateInput } from "../../../domain/validators/validators";
import { Product } from "../../../domain/entities/Product";
import { UpdateProductUseCase } from "../../../application/use-cases/UpdateProductUseCase";

export class UpdateProductController {
  constructor(private readonly useCase: UpdateProductUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const productId = Number(req.params.id);
      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
          success: false,
          message: "Id inválido",
        });
      }

      const data = await validateInput(Product, req.body);
      data.id = productId;

      const result = await this.useCase.execute(data);

      return res.status(200).json({
        success: true,
        message: "Producto actualizado correctamente",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}