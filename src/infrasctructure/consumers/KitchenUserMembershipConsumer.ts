import { Channel, ConsumeMessage } from "amqplib";
import { KitchenMembershipInventoryRepo } from "../../database/repositories/KitchenMembershipInventoryRepo";

export class KitchenUserMembershipConsumer {
  private readonly queueName = "kitchen_user_membership_sync";

  constructor(
    private readonly channel: Channel,
    private readonly membershipRepo: KitchenMembershipInventoryRepo
  ) {}

  async start(): Promise<void> {
    await this.channel.assertQueue(this.queueName, {
      durable: true,
    });

    console.log(`🐇 Listening queue: ${this.queueName}`);

    this.channel.consume(
      this.queueName,
      async (msg: ConsumeMessage | null) => {
        if (!msg) return;

        try {
          const event = JSON.parse(msg.content.toString());

          switch (event.event) {
            case "kitchen.user.assigned":
              await this.membershipRepo.upsert({
                userId: event.data.userId,
                kitchenId: event.data.kitchenId,
                role: event.data.role ?? "kitchen_staff",
                isActive: true,
              });

              console.log(
                `➡️ User ${event.data.userId} assigned to kitchen ${event.data.kitchenId}`
              );
              break;

            case "kitchen.admin.assigned":
              await this.membershipRepo.upsert({
                userId: event.data.userId,
                kitchenId: event.data.kitchenId,
                role: "admin_cocina",
                isActive: true,
              });

              console.log(
                `👑 Admin cocina: user ${event.data.userId} -> kitchen ${event.data.kitchenId}`
              );
              break;

            case "kitchen.user.removed":
              await this.membershipRepo.remove(
                event.data.userId,
                event.data.kitchenId
              );

              console.log(
                `❌ User ${event.data.userId} removed from kitchen ${event.data.kitchenId}`
              );
              break;
          }

          this.channel.ack(msg);
        } catch (err) {
          console.error("❗ Error in KitchenUserMembershipConsumer:", err);
          this.channel.nack(msg, false, false);
        }
      }
    );
  }
}