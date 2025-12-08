import { Repository } from "typeorm";
import { IProductRepository } from "../../domain/interfaces/IProductRepository";
import { Product, UnitOfMeasure } from "../../domain/entities/Product";
import { ProductSchema } from "../../database/schemas/ProductSchema";

const UnitMap: Record<string, UnitOfMeasure> = {
  kg: UnitOfMeasure.KG,
  g: UnitOfMeasure.G,
  l: UnitOfMeasure.L,
  ml: UnitOfMeasure.ML,
  pcs: UnitOfMeasure.PCS,
  pack: UnitOfMeasure.PACK,
  box: UnitOfMeasure.BOX,
};

export class ProductAdapter implements IProductRepository {

  constructor(
    private readonly ormRepo: Repository<ProductSchema>
  ) {}

  private mapUnit(value: string): UnitOfMeasure {
    const normalized = value.trim().toLowerCase();

    if (!(normalized in UnitMap)) {
      throw {
        success: false,
        message: "Unidad inválida",
        received: value,
        acceptedUnits: Object.keys(UnitMap),
      };
    }

    return UnitMap[normalized];
  }

  async exists(kitchenId: number, productId: number): Promise<boolean> {
    return (await this.ormRepo.count({
      where: { id: productId, kitchenId },
    })) > 0;
  }

  async existsByName(kitchenId: number, name: string): Promise<boolean> {
    return (await this.ormRepo.count({
      where: { kitchenId, name },
    })) > 0;
  }

  async findById(
    kitchenId: number,
    productId: number
  ): Promise<Product | null> {
    const row = await this.ormRepo.findOne({
      where: { id: productId, kitchenId },
    });

    if (!row) return null;

    return new Product({
      id: row.id,
      kitchenId: row.kitchenId,
      name: row.name,
      categoryId: row.categoryId,
      unit: this.mapUnit(row.unit),
      perishable: row.perishable,
      shelfLifeDays: row.shelfLifeDays,
    });
  }

  async register(product: Product): Promise<Product> {
    const row = this.ormRepo.create({
      kitchenId: product.kitchenId,
      name: product.name,
      categoryId: product.categoryId,
      unit: product.unit,
      perishable: product.perishable,
      shelfLifeDays: product.shelfLifeDays,
    });

    const saved = await this.ormRepo.save(row);

    return new Product({
      id: saved.id,
      kitchenId: saved.kitchenId,
      name: saved.name,
      categoryId: saved.categoryId,
      unit: this.mapUnit(saved.unit),
      perishable: saved.perishable,
      shelfLifeDays: saved.shelfLifeDays,
    });
  }

  async update(product: Product): Promise<Product> {
    await this.ormRepo.update(
      { id: product.id!, kitchenId: product.kitchenId },
      {
        name: product.name,
        categoryId: product.categoryId,
        unit: product.unit,
        perishable: product.perishable,
        shelfLifeDays: product.shelfLifeDays,
      }
    );
    return product;
  }

  async delete(kitchenId: number, productId: number): Promise<void> {
    await this.ormRepo.delete({ id: productId, kitchenId });
  }

  async filterByCategory(
    kitchenId: number,
    categoryId: number
  ): Promise<Product[]> {
    const rows = await this.ormRepo.find({
      where: { kitchenId, categoryId },
    });

    return rows.map(row =>
      new Product({
        id: row.id,
        kitchenId: row.kitchenId,
        name: row.name,
        categoryId: row.categoryId,
        unit: this.mapUnit(row.unit),
        perishable: row.perishable,
        shelfLifeDays: row.shelfLifeDays,
      })
    );
  }
}