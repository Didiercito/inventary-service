import { Repository } from "typeorm";
import { ICategoryRepository } from "../../domain/interfaces/ICategoryRepository";
import { Category } from "../../domain/entities/Category";
import { CategorySchema } from "../../database/schemas/CategorySchema";

export class CategoryAdapter implements ICategoryRepository {
  constructor(private readonly ormRepo: Repository<CategorySchema>) {}

  async register(category: Category): Promise<Category> {
    const row = this.ormRepo.create(category);
    const saved = await this.ormRepo.save(row);

    return new Category({
      id: saved.id,
      name: saved.name,
      description: saved.description,
    });
  }

  async update(category: Category): Promise<Category> {
    await this.ormRepo.update(category.id!, {
      name: category.name,
      description: category.description,
    });

    return category;
  }

  async delete(categoryId: number): Promise<void> {
    await this.ormRepo.delete({ id: categoryId });
  }

  async findById(categoryId: number): Promise<Category | null> {
    const row = await this.ormRepo.findOne({ where: { id: categoryId } });

    return row
      ? new Category({
          id: row.id,
          name: row.name,
          description: row.description,
        })
      : null;
  }

  async findAll(): Promise<Category[]> {
    const rows = await this.ormRepo.find();

    return rows.map(
      row =>
        new Category({
          id: row.id,
          name: row.name,
          description: row.description,
        })
    );
  }
}