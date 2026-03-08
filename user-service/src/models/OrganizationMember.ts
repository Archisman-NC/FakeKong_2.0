export type OrganizationRole = "OWNER" | "ADMIN" | "DEVELOPER";

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: OrganizationRole;
  createdAt?: Date;
}