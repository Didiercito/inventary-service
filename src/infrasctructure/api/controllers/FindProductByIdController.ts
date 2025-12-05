import { Request, Response } from "express";
import { FindProductByIdUseCase } from "../../../application/use-cases/FindProductByIdUseCase";

export class FindProductByIdController {
  constructor(private readonly useCase: FindProductByIdUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const productId = Number(req.params.id);

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
          success: false,
          message: "Id inválido",
        });
      }

      const product = await this.useCase.execute(productId);

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}
