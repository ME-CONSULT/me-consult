export type Role = "admin" | "staff" | "client";

type RoleBearer = { app_metadata?: Record<string, unknown> } | null | undefined;

export function getUserRole(user: RoleBearer): Role {
  const role = user?.app_metadata?.role;
  if (role === "staff" || role === "client") return role;
  return "admin"; // back-compat fallback for pre-role accounts
}

export function isStaffRole(role: Role): role is "admin" | "staff" {
  return role === "admin" || role === "staff";
}
