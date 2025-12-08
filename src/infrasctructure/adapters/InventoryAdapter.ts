import { Repository } from "typeorm";
import { InventoryItemSchema } from "../../database/schemas/InventoryItemSchema";
import { IInventoryRepository } from "../../domain/interfaces/IInventoryRepository";
import { IInventoryQueryRepository } from "../../domain/interfaces/IInventoryQueryRepository";

export class InventoryAdapter
  implements IInventoryRepository, IInventoryQueryRepository {

  constructor(
    private readonly ormRepo: Repository<InventoryItemSchema>
  ) {}

  async exists(kitchenId: number, productId: number): Promise<boolean> {
    return (await this.ormRepo.count({
      where: { kitchenId, productId }
    })) > 0;
  }

  async findByProductId(kitchenId: number, productId: number) {
    return await this.ormRepo.findOne({
      where: { kitchenId, productId }
    });
  }

  async findByKitchenId(kitchenId: number) {
    return await this.ormRepo.find({
      where: { kitchenId },
      order: { updatedAt: "DESC" }
    });
  }

  async create(item: any) {
    return await this.ormRepo.save(
      this.ormRepo.create(item)
    );
  }

  async addStock(
    kitchenId: number,
    productId: number,
    amount: number,
    userId: number
  ) {
    const row = await this.findByProductId(kitchenId, productId);
    if (!row) throw new Error("Producto no existe");

    row.quantity += amount;
    row.updatedBy = userId;

    return await this.ormRepo.save(row);
  }

  async removeStock(
    kitchenId: number,
    productId: number,
    amount: number,
    userId: number
  ) {
    const row = await this.findByProductId(kitchenId, productId);
    if (!row) throw new Error("Producto no existe");

    row.quantity -= amount;
    row.updatedBy = userId;

    return await this.ormRepo.save(row);
  }

  async setStock(
    kitchenId: number,
    productId: number,
    quantity: number,
    userId: number
  ) {
    const row = await this.findByProductId(kitchenId, productId);
    if (!row) throw new Error("Producto no existe");

    row.quantity = quantity;
    row.updatedBy = userId;

    return await this.ormRepo.save(row);
  }

  async delete(kitchenId: number, productId: number): Promise<void> {
    await this.ormRepo.delete({ kitchenId, productId });
  }

  async findKitchenInventory(kitchenId: number) {
    const rows = await this.ormRepo
      .createQueryBuilder("inv")
      .innerJoin("products", "product", "product.id = inv.productId")
      .where("inv.kitchenId = :kitchenId", { kitchenId })
      .orderBy("product.name", "ASC")
      .select([
        "product.id",
        "product.name",
        "product.categoryId",
        "product.unit",
        "product.perishable",
        "product.shelfLifeDays",
        "inv.quantity"
      ])
      .getRawMany();

    return rows.map(row => ({
      productId: Number(row.product_id),
      name: row.product_name,
      categoryId: row.product_categoryId ?? null,
      unit: row.product_unit,
      perishable: row.product_perishable,
      shelfLifeDays: row.product_shelfLifeDays ?? null,
      quantity: Number(row.inv_quantity),
    }));
  }
}