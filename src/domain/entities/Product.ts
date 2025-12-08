import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  Min,
  IsEnum,
} from "class-validator";

export enum UnitOfMeasure {
  KG = "kg",
  G = "g",
  L = "l",
  ML = "ml",
  PCS = "pcs",
  PACK = "pack",
  BOX = "box",
}

export class Product {

  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  @Min(1)
  kitchenId!: number;

  @IsString()
  name!: string;

  @IsInt()
  @Min(1)
  categoryId!: number;

  @IsEnum(UnitOfMeasure, {
    message: "unit debe ser: kg, g, l, ml, pcs, pack, box",
  })
  unit!: UnitOfMeasure;

  @IsBoolean()
  perishable!: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  shelfLifeDays?: number;

  constructor(partial?: Partial<Product>) {
    if (partial) Object.assign(this, partial);

    if (
      this.perishable === true &&
      this.shelfLifeDays === undefined
    ) {
      throw new Error(
        "Los productos perecederos deben incluir shelfLifeDays"
      );
    }
  }
}