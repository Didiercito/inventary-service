import { Request, Response } from "express";
import { GetUnitsUseCase } from "../../../application/use-cases/GetUnitsUseCase";

export class GetUnitsController {
  constructor(private readonly useCase: GetUnitsUseCase) {}

  async execute(_req: Request, res: Response) {
    try {
      const units = this.useCase.execute();

      return res.status(200).json({
        success: true,
        units
      });

    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener unidades permitidas",
      });
    }
  }
}