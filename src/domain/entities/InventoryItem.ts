import {
  IsInt,
  IsOptional,
  Min
} from "class-validator";

export class InventoryItem {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  @Min(1)
  kitchenId!: number;

  @IsInt()
  @Min(1)
  productId!: number;

  @IsInt()
  @Min(0)
  quantity!: number;

  @IsInt()
  @Min(1)
  updatedBy!: number;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;

  constructor(partial?: Partial<InventoryItem>) {
    if (partial) Object.assign(this, partial);
  }

  addStock(amount: number) {
    this.quantity += amount;
  }

  removeStock(amount: number) {
    if (amount > this.quantity) {
      throw new Error("No hay stock suficiente");
    }
    this.quantity -= amount;
  }

  setStock(amount: number) {
    if (amount < 0) throw new Error("El stock no puede ser negativo");
    this.quantity = amount;
  }
}