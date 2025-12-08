import { Request, Response } from "express";
import { UpdateProductUseCase } from "../../../application/use-cases/UpdateProductUseCase";

export class UpdateProductController {
  constructor(private readonly useCase: UpdateProductUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const kitchenId = Number(req.params.kitchenId);
      const productId = Number(req.params.productId);

      if (!Number.isInteger(kitchenId) || kitchenId <= 0) {
        return res.status(400).json({
          success: false,
          message: "kitchenId inválido",
        });
      }

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
          success: false,
          message: "productId inválido",
        });
      }

      const data = {
        ...req.body,
        id: productId,
        kitchenId,
      };

      const result = await this.useCase.execute(data);

      return res.status(200).json({
        success: true,
        message: "Producto actualizado correctamente",
        data: result,
      });

    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}
