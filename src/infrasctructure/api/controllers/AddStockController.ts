import { Request, Response } from "express";
import { AddStockUseCase } from "../../../application/use-cases/AddStockUseCase";

export class AddStockController {
  constructor(private readonly useCase: AddStockUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const kitchenId = Number(req.params.kitchenId);
      const productId = Number(req.params.productId);
      const amount = Number(req.body.amount);
      const userId = req.user?.userId;

      if (!Number.isInteger(kitchenId) || kitchenId <= 0) {
        return res.status(400).json({ success: false, message: "kitchenId inválido" });
      }

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({ success: false, message: "productId inválido" });
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({ success: false, message: "amount inválido" });
      }

      if (!Number.isInteger(userId)) {
        return res.status(401).json({ success: false, message: "Usuario no autenticado" });
      }

      const uid = userId as number;

      const result = await this.useCase.execute(kitchenId, productId, amount, uid);

      return res.status(200).json({
        success: true,
        message: "Stock agregado correctamente",
        data: result,
      });

    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}