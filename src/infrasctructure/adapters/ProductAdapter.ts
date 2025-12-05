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
  constructor(private readonly ormRepo: Repository<ProductSchema>) { }

  private mapUnit(value: string): UnitOfMeasure {
    const normalized = value.trim().toLowerCase();

    if (!(normalized in UnitMap)) {
      throw {
        success: false,
        message: `Unidad inválida recibida desde BD: '${value}'`,
        acceptedUnits: Object.keys(UnitMap),
      };
    }

    return UnitMap[normalized];
  }

  async exists(productId: number): Promise<boolean> {
    const count = await this.ormRepo.count({ where: { id: productId } });
    return count > 0;
  }

  async findById(productId: number): Promise<Product | null> {
    const row = await this.ormRepo.findOne({ where: { id: productId } });

    return row
      ? new Product({
        id: row.id,
        name: row.name,
        categoryId: row.categoryId,
        unit: this.mapUnit(row.unit),
        perishable: row.perishable,
        shelfLifeDays: row.shelfLifeDays,
      })
      : null;
  }

  async register(product: Product): Promise<Product> {
    const row = this.ormRepo.create({
      name: product.name,
      categoryId: product.categoryId,
      unit: product.unit,
      perishable: product.perishable,
      shelfLifeDays: product.shelfLifeDays,
    });

    const saved = await this.ormRepo.save(row);

    return new Product({
      id: saved.id,
      name: saved.name,
      categoryId: saved.categoryId,
      unit: this.mapUnit(saved.unit),
      perishable: saved.perishable,
      shelfLifeDays: saved.shelfLifeDays,
    });
  }

  async update(product: Product): Promise<Product> {
    await this.ormRepo.update(product.id!, {
      name: product.name,
      categoryId: product.categoryId,
      unit: product.unit,
      perishable: product.perishable,
      shelfLifeDays: product.shelfLifeDays,
    });

    return product;
  }

  async delete(productId: number): Promise<void> {
    await this.ormRepo.delete({ id: productId });
  }


  async filterByCategory(categoryId: number): Promise<Product[]> {
    const rows = await this.ormRepo.find({ where: { categoryId } });

    return rows.map(
      row =>
        new Product({
          id: row.id,
          name: row.name,
          categoryId: row.categoryId,
          unit: this.mapUnit(row.unit),
          perishable: row.perishable,
          shelfLifeDays: row.shelfLifeDays,
        })
    );
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.ormRepo.count({ where: { name } });
    return count > 0;
  }
}