import { Product } from "../entities/Product";

export interface IProductRepository {

  exists(
    kitchenId: number,
    productId: number
  ): Promise<boolean>;

  existsByName(
    kitchenId: number,
    name: string
  ): Promise<boolean>;

  findById(
    kitchenId: number,
    productId: number
  ): Promise<Product | null>;

  register(
    product: Product
  ): Promise<Product>;

  update(
    product: Product
  ): Promise<Product>;

  delete(
    kitchenId: number,
    productId: number
  ): Promise<void>;

  filterByCategory(
    kitchenId: number,
    categoryId: number
  ): Promise<Product[]>;
}