import { Request, Response } from "express";
import { FilterInventoryByStockUseCase } from "../../../application/use-cases/FilterInventoryByStockUseCase";

export class FilterInventoryByStockController {
  constructor(private readonly useCase: FilterInventoryByStockUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const kitchenId = Number(req.params.kitchenId);
      const mode = (req.query.mode || "greater") as "greater" | "less";
      const quantity = Number(req.query.quantity);

      if (!Number.isInteger(kitchenId) || kitchenId <= 0) {
        return res.status(400).json({ success: false, message: "kitchenId inválido" });
      }

      if (!["greater", "less"].includes(mode)) {
        return res.status(400).json({
          success: false,
          message: "mode inválido",
          detail: "Debe ser 'greater' o 'less'",
          received: mode,
        });
      }

      if (!Number.isFinite(quantity) || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "quantity inválido",
          detail: "Debe ser > 0",
          received: quantity,
        });
      }

      const result = await this.useCase.execute(kitchenId, mode, quantity);

      return res.status(200).json({
        success: true,
        data: result,
      });

    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}