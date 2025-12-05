import { Repository } from "typeorm";
import { KitchenInventoryMembership } from "../../domain/entities/KitchenInventoryMembership";

export class KitchenMembershipInventoryRepo {
  constructor(
    private readonly ormRepo: Repository<KitchenInventoryMembership>
  ) {}

  async upsert(data: {
    userId: number;
    kitchenId: number;
    role: string;
    isActive: boolean;
  }) {
    const existing = await this.ormRepo.findOne({
      where: { userId: data.userId, kitchenId: data.kitchenId },
    });

    if (existing) {
      existing.role = data.role;
      existing.isActive = data.isActive;
      return this.ormRepo.save(existing);
    }

    const newRecord = this.ormRepo.create(data);
    return this.ormRepo.save(newRecord);
  }

  async remove(userId: number, kitchenId: number): Promise<void> {
    await this.ormRepo.delete({ userId, kitchenId });
  }

  async findByUserAndKitchen(
    userId: number,
    kitchenId: number
  ): Promise<KitchenInventoryMembership | null> {
    return this.ormRepo.findOne({
      where: { userId, kitchenId },
    });
  }
}
