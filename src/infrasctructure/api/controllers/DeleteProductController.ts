import { Request, Response } from "express";
import { DeleteProductUseCase } from "../../../application/use-cases/DeleteProductUseCase";

export class DeleteProductController {
  constructor(private readonly useCase: DeleteProductUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const productId = Number(req.params.id);

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
          success: false,
          message: "Id inválido",
        });
      }

      await this.useCase.execute(productId);

      return res.status(200).json({
        success: true,
        message: "Producto eliminado correctamente",
      });
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}