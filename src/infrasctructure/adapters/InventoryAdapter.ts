import { Repository } from "typeorm";
import { IInventoryRepository } from "../../domain/interfaces/IInventoryRepository";
import { InventoryItem } from "../../domain/entities/InventoryItem";
import { InventoryItemSchema } from "../../database/schemas/InventoryItemSchema";

export class InventoryAdapter implements IInventoryRepository {
  constructor(
    private readonly ormRepo: Repository<InventoryItemSchema>
  ) {}

  async exists(
    kitchenId: number,
    productId: number
  ): Promise<boolean> {
    const count = await this.ormRepo.count({
      where: { kitchenId, productId },
    });
    return count > 0;
  }

  async findByProductId(
    kitchenId: number,
    productId: number
  ): Promise<InventoryItem | null> {
    const row = await this.ormRepo.findOne({
      where: { kitchenId, productId },
    });

    return row
      ? new InventoryItem({
          id: row.id,
          kitchenId: row.kitchenId,
          productId: row.productId,
          quantity: row.quantity,
          updatedBy: row.updatedBy,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        })
      : null;
  }

  async create(item: InventoryItem): Promise<InventoryItem> {
    const row = this.ormRepo.create(item);
    const saved = await this.ormRepo.save(row);

    return new InventoryItem({
      id: saved.id,
      kitchenId: saved.kitchenId,
      productId: saved.productId,
      quantity: saved.quantity,
      updatedBy: saved.updatedBy,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    });
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
    item.updatedAt = new Date();

    await this.ormRepo.update(item.id!, {
      quantity: item.quantity,
      updatedBy: userId,
      updatedAt: item.updatedAt,
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
    item.updatedAt = new Date();

    await this.ormRepo.update(item.id!, {
      quantity: item.quantity,
      updatedBy: userId,
      updatedAt: item.updatedAt,
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
    item.updatedAt = new Date();

    await this.ormRepo.update(item.id!, {
      quantity,
      updatedBy: userId,
      updatedAt: item.updatedAt,
    });

    return item;
  }

  async filterByStock(
    kitchenId: number,
    mode: "greater" | "less",
    quantity: number
  ): Promise<InventoryItem[]> {
    const qb = this.ormRepo.createQueryBuilder("inv");

    qb.where("inv.kitchenId = :k", { k: kitchenId });

    qb.andWhere(
      mode === "greater"
        ? "inv.quantity > :qty"
        : "inv.quantity < :qty",
      { qty: quantity }
    );

    const rows = await qb.getMany();

    return rows.map(
      row =>
        new InventoryItem({
          id: row.id,
          kitchenId: row.kitchenId,
          productId: row.productId,
          quantity: row.quantity,
          updatedBy: row.updatedBy,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        })
    );
  }

  async delete(
    kitchenId: number,
    productId: number
  ): Promise<void> {
    await this.ormRepo.delete({ kitchenId, productId });
  }
}