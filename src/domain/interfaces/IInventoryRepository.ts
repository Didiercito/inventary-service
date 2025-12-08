import { InventoryItem } from "../entities/InventoryItem";

export interface IInventoryRepository {
  exists(kitchenId: number, productId: number): Promise<boolean>;

  findByProductId(
    kitchenId: number,
    productId: number
  ): Promise<InventoryItem | null>;

  findByKitchenId(kitchenId: number): Promise<InventoryItem[]>;

  create(item: InventoryItem): Promise<InventoryItem>;

  addStock(
    kitchenId: number,
    productId: number,
    amount: number,
    userId: number
  ): Promise<InventoryItem>;

  removeStock(
    kitchenId: number,
    productId: number,
    amount: number,
    userId: number
  ): Promise<InventoryItem>;

  setStock(
    kitchenId: number,
    productId: number,
    quantity: number,
    userId: number
  ): Promise<InventoryItem>;

  filterByStock(
    kitchenId: number,
    mode: "greater" | "less",
    quantity: number
  ): Promise<InventoryItem[]>;

  delete(kitchenId: number, productId: number): Promise<void>;
}
