import { Request, Response } from "express";
import { validateInput } from "../../../domain/validators/validators";
import { Product } from "../../../domain/entities/Product";
import { RegisterProductUseCase } from "../../../application/use-cases/RegisterProductUseCase";

export class RegisterProductController {
  constructor(private readonly useCase: RegisterProductUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const kitchenId = Number(req.params.kitchenId);
      const user = req.user;

      if (!Number.isInteger(kitchenId) || kitchenId <= 0) {
        return res.status(400).json({
          success: false,
          message: "kitchenId inválido",
        });
      }

      if (!user || !Number.isInteger(user.userId)) {
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
      }

      const product = await validateInput(Product, {
        ...req.body,
        kitchenId,
      });

      const result = await this.useCase.execute(
        kitchenId,
        user.userId, // ✅ TypeScript feliz
        product
      );

      return res.status(201).json(result);

    } catch (error: any) {
      if (Array.isArray(error)) {
        return res.status(400).json({
          success: false,
          message: "Validación fallida para Product",
          errors: error.map(e => ({
            property: e.property,
            constraints: e.constraints,
          })),
        });
      }

      return res.status(400).json({
        success: false,
        message: error.message ?? "Error al registrar producto",
      });
    }
  }
}