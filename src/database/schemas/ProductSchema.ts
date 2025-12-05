import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { CategorySchema } from "./CategorySchema";

@Entity({ name: "products" })
export class ProductSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 200 })
  name!: string;

  @Column()
  categoryId!: number;

  @ManyToOne(() => CategorySchema, (category) => category.products, {
    onDelete: "CASCADE",
  })
  category!: CategorySchema;

  @Column({
    type: "varchar",
    length: 10,
  })
  unit!: string; 

  @Column({ type: "boolean", default: false })
  perishable!: boolean;

  @Column({ type: "int", nullable: true })
  shelfLifeDays?: number;
}