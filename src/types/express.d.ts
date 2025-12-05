import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: number;
      email: string;
      roles?: string[];
      stateId?: number | null;
      municipalityId?: number | null;
      kitchenAccess?: {
        kitchenId: number;
        isOwner: boolean;
        isAdminKitchen: boolean;
      };
    };
  }
}
