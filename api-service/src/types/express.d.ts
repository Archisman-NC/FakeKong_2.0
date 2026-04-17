import { Role } from "../utils/permissions";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
      organization?: {
        id: string;
        role: Role;
      };
    }
  }
}

export {};