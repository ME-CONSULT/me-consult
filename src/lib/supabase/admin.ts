import { createClient } from "@supabase/supabase-js";

export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export async function getAdminUserByEmail(email: string) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.auth.admin.listUsers({ perPage: 200 });
  if (error) throw error;
  return data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function searchAdminUsers(q: string, limit = 5) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.auth.admin.listUsers({ perPage: 200 });
  if (error) throw error;

  const needle = q.toLowerCase();
  return data.users
    .filter((u) => u.email?.toLowerCase().includes(needle))
    .slice(0, limit)
    .map((u) => ({ id: u.id, email: u.email ?? "" }));
}
