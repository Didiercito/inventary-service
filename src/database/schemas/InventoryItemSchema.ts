import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ProductSchema } from "./ProductSchema";

@Entity({ name: "inventory_items" })
export class InventoryItemSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  kitchenId!: number;

  @Column()
  productId!: number;

  @ManyToOne(() => ProductSchema, { eager: false })
  @JoinColumn({ name: "productId" })
  product!: ProductSchema;

  @Column({ type: "numeric", default: 0 })
  quantity!: number;

  @Column()
  updatedBy!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}