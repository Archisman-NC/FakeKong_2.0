import { Request, Response, NextFunction } from "express";

export const ROLES = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  DEVELOPER: "DEVELOPER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const isValidRole = (role: unknown): role is Role =>
  Object.values(ROLES).includes(role as Role);

export const requiredRoles =
  (allowedRoles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const org = req.organization;

      if (!org) {
        return res.status(400).json({
          message: "Organization context missing (did you run organizationMiddleware?)",
        });
      }

      const { role } = org;

      if (!isValidRole(role)) {
        return res.status(500).json({ message: "Invalid role detected", role });
      }

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({
          message: "Forbidden",
          userRole: role,
          requiredRoles: allowedRoles,
        });
      }

      next();
    } catch (error) {
      console.error("[RBAC Middleware Error]", error);
      return res.status(500).json({ message: "RBAC middleware failed" });
    }
  };