import { Request, Response, NextFunction } from "express";
import { KitchenMembershipInventoryRepo } from "../database/repositories/KitchenMembershipInventoryRepo";

export function verifyKitchenPermission(
  membershipRepo: KitchenMembershipInventoryRepo,
  requiredRoles: string[] = ["Admin_cocina"]
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Autenticación requerida",
        });
      }

      const userId = req.user.userId;
      const kitchenId = Number(req.params.kitchenId);

      if (!Number.isInteger(kitchenId) || kitchenId <= 0) {
        return res.status(400).json({
          success: false,
          message: "kitchenId inválido",
        });
      }

      const membership = await membershipRepo.findByUserAndKitchen(
        userId,
        kitchenId
      );

      if (!membership || !membership.isActive) {
        return res.status(403).json({
          success: false,
          message: "No estás asociado a esta cocina",
        });
      }

      if (!requiredRoles.includes(membership.role)) {
        return res.status(403).json({
          success: false,
          message: "No tienes permisos suficientes",
          requiredRoles,
          userRole: membership.role,
        });
      }

      return next();
    } catch (err) {
      console.error("Error en verifyKitchenPermission:", err);
      return res.status(500).json({
        success: false,
        message: "Error interno",
      });
    }
  };
}