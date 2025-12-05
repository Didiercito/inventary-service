import { Category } from "../entities/Category";

export interface ICategoryRepository {
  register(category: Category): Promise<Category>;

  update(category: Category): Promise<Category>;

  delete(categoryId: number): Promise<void>;

  findById(categoryId: number): Promise<Category | null>;

  findAll(): Promise<Category[]>;
}