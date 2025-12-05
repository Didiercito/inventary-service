import {
  IsInt,
  IsString,
  IsOptional,
} from "class-validator";

export class Category {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  constructor(partial?: Partial<Category>) {
    if (partial) Object.assign(this, partial);
  }
}