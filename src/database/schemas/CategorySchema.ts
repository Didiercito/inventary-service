import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { ProductSchema } from "./ProductSchema";

@Entity({ name: "categories" })
export class CategorySchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, unique: true })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @OneToMany(() => ProductSchema, (product) => product.category)
  products?: ProductSchema[];
}