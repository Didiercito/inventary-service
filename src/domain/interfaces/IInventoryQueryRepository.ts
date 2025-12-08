export interface IInventoryQueryRepository {
  findKitchenInventory(
    kitchenId: number
  ): Promise<{
    productId: number;
    name: string;
    categoryId: number | null;
    unit: string;
    perishable: boolean;
    shelfLifeDays: number | null;
    quantity: number;
  }[]>;
}