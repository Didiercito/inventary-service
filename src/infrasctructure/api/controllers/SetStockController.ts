import { Request, Response } from "express";
import { SetStockUseCase } from "../../../application/use-cases/SetStockUseCase";

export class SetStockController {
  constructor(private readonly useCase: SetStockUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const kitchenId = Number(req.params.kitchenId);
      const productId = Number(req.params.productId);
      const quantity = Number(req.body.quantity);
      const userId = (req as any).user?.userId;

      if (!kitchenId || !productId || quantity < 0) {
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
        quantity,
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