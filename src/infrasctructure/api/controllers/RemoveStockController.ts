import { Request, Response } from "express";
import { RemoveStockUseCase } from "../../../application/use-cases/RemoveStockUseCase";

export class RemoveStockController {
  constructor(private readonly useCase: RemoveStockUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const kitchenId = Number(req.params.kitchenId);
      const productId = Number(req.params.productId);
      const amount = Number(req.body.amount);
      const userId = (req as any).user?.userId;

      if (!kitchenId || !productId || !amount) {
        return res.status(400).json({
          success: false,
          message: "Parámetros inválidos",
        });
      }

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
      }

      const result = await this.useCase.execute(
        kitchenId,
        productId,
        amount,
        userId
      );

      return res.status(200).json({
        success: true,
        data: result,
      });

    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}