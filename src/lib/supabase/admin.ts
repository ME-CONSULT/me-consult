import { createClient, type User } from "@supabase/supabase-js";
import { isStaffRole } from "@/lib/roles";

export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

/** Every Supabase auth user in this project, paginated (client accounts now
 * share this pool with staff, so a single perPage:200 call can no longer be
 * assumed to return everyone). */
async function listAllUsers(): Promise<User[]> {
  const supabase = supabaseAdmin();
  const perPage = 200;
  const all: User[] = [];

  for (let page = 1; ; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    all.push(...data.users);
    if (data.users.length < perPage) break;
  }

  return all;
}

/** Admin + staff users only — excludes client portal accounts. */
export async function listStaffUsers(): Promise<User[]> {
  const users = await listAllUsers();
  return users.filter((u) => isStaffRole(getRoleOf(u)));
}

function getRoleOf(user: User) {
  const role = user.app_metadata?.role;
  if (role === "staff" || role === "client") return role;
  return "admin" as const;
}

export async function getAdminUserByEmail(email: string) {
  const staff = await listStaffUsers();
  return staff.find((u) => u.email?.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function searchAdminUsers(q: string, limit = 5) {
  const staff = await listStaffUsers();

  const needle = q.toLowerCase();
  return staff
    .filter((u) => u.email?.toLowerCase().includes(needle))
    .slice(0, limit)
    .map((u) => ({ id: u.id, email: u.email ?? "" }));
}
