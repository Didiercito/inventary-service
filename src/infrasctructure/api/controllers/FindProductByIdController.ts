import { Request, Response } from "express";
import { FindProductByIdUseCase } from "../../../application/use-cases/FindProductByIdUseCase";

export class FindProductByIdController {
  constructor(private readonly useCase: FindProductByIdUseCase) {}

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

      const product = await this.useCase.execute(
        kitchenId,
        productId
      );

      return res.status(200).json({
        success: true,
        data: product,
      });

    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}