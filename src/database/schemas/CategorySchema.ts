import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm";

@Entity({ name: "categories" })
export class CategorySchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, unique: true })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;
}