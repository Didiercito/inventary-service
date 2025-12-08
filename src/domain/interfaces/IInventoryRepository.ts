export interface IInventoryRepository {
  exists(
    kitchenId: number,
    productId: number
  ): Promise<boolean>;

  findByProductId(
    kitchenId: number,
    productId: number
  ): Promise<any | null>;

  findByKitchenId(
    kitchenId: number
  ): Promise<any[]>;

  create(item: any): Promise<any>;

  addStock(
    kitchenId: number,
    productId: number,
    amount: number,
    userId: number
  ): Promise<any>;

  removeStock(
    kitchenId: number,
    productId: number,
    amount: number,
    userId: number
  ): Promise<any>;

  setStock(
    kitchenId: number,
    productId: number,
    quantity: number,
    userId: number
  ): Promise<any>;

  delete(
    kitchenId: number,
    productId: number
  ): Promise<void>;
}