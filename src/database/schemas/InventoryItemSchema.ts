import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "inventory_items" })
export class InventoryItemSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  kitchenId!: number;

  @Column()
  productId!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  quantity!: number;

  @Column()
  updatedBy!: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}