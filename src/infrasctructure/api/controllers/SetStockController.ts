import { Request, Response } from "express";
import { SetStockUseCase } from "../../../application/use-cases/SetStockUseCase";

export class SetStockController {
  constructor(private readonly useCase: SetStockUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const kitchenId = Number(req.params.kitchenId);
      const productId = Number(req.params.productId);
      const quantity = Number(req.body.quantity);
      const userId = req.user?.userId;

      if (!Number.isInteger(kitchenId) || kitchenId <= 0) {
        return res.status(400).json({ success: false, message: "kitchenId inválido" });
      }

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({ success: false, message: "productId inválido" });
      }

      if (!Number.isFinite(quantity) || quantity < 0) {
        return res.status(400).json({ success: false, message: "quantity inválido" });
      }

      if (!Number.isInteger(userId)) {
        return res.status(401).json({ success: false, message: "Usuario no autenticado" });
      }

      const uid = userId as number;

      const result = await this.useCase.execute(kitchenId, productId, quantity, uid);

      return res.status(200).json({
        success: true,
        message: "Stock asignado correctamente",
        data: result,
      });

    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}