import { Repository } from "typeorm";
import { InventoryItemSchema } from "../../database/schemas/InventoryItemSchema";
import { InventoryItem } from "../../domain/entities/InventoryItem";
import { IInventoryRepository } from "../../domain/interfaces/IInventoryRepository";

export class InventoryAdapter implements IInventoryRepository {

  constructor(
    private readonly ormRepo: Repository<InventoryItemSchema>
  ) { }

  async exists(kitchenId: number, productId: number): Promise<boolean> {
    return (await this.ormRepo.count({ where: { kitchenId, productId } })) > 0;
  }

  async findByProductId(
    kitchenId: number,
    productId: number
  ): Promise<InventoryItem | null> {
    const row = await this.ormRepo.findOne({ where: { kitchenId, productId } });
    return row
      ? new InventoryItem({
        id: row.id,
        kitchenId: row.kitchenId,
        productId: row.productId,
        quantity: Number(row.quantity),
        updatedBy: row.updatedBy,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      })
      : null;
  }

  async findByKitchenId(kitchenId: number): Promise<InventoryItem[]> {
    const rows = await this.ormRepo.find({
      where: { kitchenId },
      order: { updatedAt: "DESC" },
    });

    return rows.map(row =>
      new InventoryItem({
        id: row.id,
        kitchenId: row.kitchenId,
        productId: row.productId,
        quantity: Number(row.quantity),
        updatedBy: row.updatedBy,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      })
    );
  }

  async create(item: InventoryItem): Promise<InventoryItem> {
    const saved = await this.ormRepo.save(this.ormRepo.create(item));
    return new InventoryItem(saved);
  }

  async addStock(
    kitchenId: number,
    productId: number,
    amount: number,
    userId: number
  ): Promise<InventoryItem> {
    const item = await this.findByProductId(kitchenId, productId);
    if (!item) throw new Error("Producto no existe en inventario");

    item.addStock(amount);
    item.updatedBy = userId;

    await this.ormRepo.update(item.id!, {
      quantity: item.quantity,
      updatedBy: userId,
    });

    return item;
  }

  async removeStock(
    kitchenId: number,
    productId: number,
    amount: number,
    userId: number
  ): Promise<InventoryItem> {
    const item = await this.findByProductId(kitchenId, productId);
    if (!item) throw new Error("Producto no existe en inventario");

    item.removeStock(amount);
    item.updatedBy = userId;

    await this.ormRepo.update(item.id!, {
      quantity: item.quantity,
      updatedBy: userId,
    });

    return item;
  }

  async setStock(
    kitchenId: number,
    productId: number,
    quantity: number,
    userId: number
  ): Promise<InventoryItem> {
    const item = await this.findByProductId(kitchenId, productId);
    if (!item) throw new Error("Producto no existe en inventario");

    item.setStock(quantity);
    item.updatedBy = userId;

    await this.ormRepo.update(item.id!, {
      quantity,
      updatedBy: userId,
    });

    return item;
  }

  async filterByStock(
    kitchenId: number,
    mode: "greater" | "less",
    quantity: number
  ): Promise<InventoryItem[]> {
    const qb = this.ormRepo.createQueryBuilder("inv");
    qb.where("inv.kitchenId = :kitchenId", { kitchenId });

    qb.andWhere(
      mode === "greater"
        ? "inv.quantity > :quantity"
        : "inv.quantity < :quantity",
      { quantity }
    );

    const rows = await qb.getMany();

    return rows.map(
      row =>
        new InventoryItem({
          id: row.id,
          kitchenId: row.kitchenId,
          productId: row.productId,
          quantity: Number(row.quantity),
          updatedBy: row.updatedBy,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        })
    );
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
        "product.id AS product_id",
        "product.name AS name",
        "product.categoryId AS category_id",
        "product.unit AS unit",
        "product.perishable AS perishable",
        "product.shelfLifeDays AS shelf_life_days",
        "CAST(inv.quantity AS FLOAT) AS quantity"
      ])
      .getRawMany();

    return rows.map(row => ({
      productId: Number(row.product_id),
      name: row.name,
      categoryId: row.category_id !== null ? Number(row.category_id) : null,
      unit: row.unit,
      perishable: row.perishable,
      shelfLifeDays:
        row.shelf_life_days !== null
          ? Number(row.shelf_life_days)
          : null,
      quantity: Number(row.quantity),
    }));
  }

}