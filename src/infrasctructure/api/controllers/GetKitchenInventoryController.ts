import { Request, Response } from "express";
import { GetKitchenInventoryUseCase } from "../../../application/use-cases/GetKitchenInventoryUseCase";

export class GetKitchenInventoryController {
  constructor(
    private readonly useCase: GetKitchenInventoryUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const kitchenId = Number(req.params.kitchenId);

    if (!Number.isInteger(kitchenId) || kitchenId <= 0) {
      return res.status(400).json({
        success: false,
        message: "kitchenId inválido"
      });
    }

    const result = await this.useCase.execute(kitchenId);
    return res.status(200).json(result);
  }
}
