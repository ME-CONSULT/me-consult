import type { User } from "@supabase/supabase-js";

export function adminDisplayName(user: Pick<User, "email" | "user_metadata"> | null) {
  const fullName = user?.user_metadata?.full_name;
  if (typeof fullName === "string" && fullName.trim()) return fullName.trim();

  const localPart = user?.email?.split("@")[0] ?? "";
  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
}
