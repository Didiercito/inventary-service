import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "kitchen_inventory_membership" })
export class KitchenInventoryMembership {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  kitchenId!: number;

  @Column({ default: "kitchen_staff" })
  role!: string;

  @Column({ default: true })
  isActive!: boolean;
}
