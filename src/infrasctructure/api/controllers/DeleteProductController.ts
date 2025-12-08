import { Request, Response } from "express";
import { DeleteProductUseCase } from "../../../application/use-cases/DeleteProductUseCase";

export class DeleteProductController {
  constructor(private readonly useCase: DeleteProductUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const kitchenId = Number(req.params.kitchenId);
      const productId = Number(req.params.productId);

      if (!kitchenId || !productId) {
        return res.status(400).json({
          success: false,
          message: "Parámetros inválidos",
        });
      }

      await this.useCase.execute(kitchenId, productId);

      return res.status(200).json({
        success: true,
        message: "Producto eliminado correctamente",
      });
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}
