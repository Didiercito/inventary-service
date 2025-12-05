import { IInventoryRepository } from "../../domain/interfaces/IInventoryRepository";

export class FilterInventoryByStockUseCase {
  constructor(private readonly inventoryRepo: IInventoryRepository) {}

  async execute(
    kitchenId: number,
    mode: "greater" | "less",
    quantity: number
  ) {
    if (!Number.isInteger(kitchenId) || kitchenId <= 0) {
      throw {
        success: false,
        message: "kitchenId inválido",
      };
    }

    if (!["greater", "less"].includes(mode)) {
      throw {
        success: false,
        message: "mode inválido",
        detail: "Debe ser 'greater' o 'less'",
        received: mode,
      };
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw {
        success: false,
        message: "Cantidad inválida",
        detail: "quantity debe ser > 0",
      };
    }

    return await this.inventoryRepo.filterByStock(
      kitchenId,
      mode,
      quantity
    );
  }
}