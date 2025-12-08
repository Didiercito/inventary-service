import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "kitchen_memberships" })
export class KitchenMembershipSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @Column({ name: "kitchen_id" })
  kitchenId!: number;

  @Column({
    type: "varchar",
    length: 50,
    comment: "Ej: Admin_cocina, Cocinero, Auxiliar",
  })
  role!: string;

  @Column({
    name: "is_active",
    type: "boolean",
    default: true,
    comment: "Si el usuario sigue siendo miembro de la cocina",
  })
  isActive!: boolean;

  @Column({ name: "assigned_by", nullable: true })
  assignedBy?: number | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt!: Date;
}