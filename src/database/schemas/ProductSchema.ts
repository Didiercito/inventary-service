import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { InventoryItemSchema } from "./InventoryItemSchema";

@Entity({ name: "products" })
export class ProductSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  kitchenId!: number;

  @Column({ length: 200 })
  name!: string;

  @Column()
  categoryId!: number;

  @Column({ length: 10 })
  unit!: string;

  @Column({ default: false })
  perishable!: boolean;

  @Column({ nullable: true })
  shelfLifeDays?: number;

  @OneToMany(() => InventoryItemSchema, inv => inv.product)
  inventoryItems?: InventoryItemSchema[];
}