import { Product } from "../entities/Product";

export interface IProductRepository {
  exists(productId: number): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;

  findById(productId: number): Promise<Product | null>;

  register(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(productId: number): Promise<void>;

  filterByCategory(categoryId: number): Promise<Product[]>;
}