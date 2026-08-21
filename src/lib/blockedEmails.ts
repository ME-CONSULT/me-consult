import { supabaseAdmin } from "@/lib/supabase/admin";

export type BlockedEmail = {
  id: string;
  pattern: string;
  reason: string | null;
  created_by: string | null;
  created_at: string;
};

export async function listBlockedEmails(): Promise<BlockedEmail[]> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("blocked_emails")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as BlockedEmail[];
}

export async function addBlockedEmail(pattern: string, reason: string | null, createdBy: string) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("blocked_emails")
    .insert({ pattern: pattern.trim().toLowerCase(), reason, created_by: createdBy })
    .select()
    .single();
  if (error) throw error;
  return data as BlockedEmail;
}

export async function deleteBlockedEmail(id: string) {
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("blocked_emails").delete().eq("id", id);
  if (error) throw error;
}

export async function isEmailBlocked(email: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  const domain = normalized.split("@")[1];

  const supabase = supabaseAdmin();
  const patterns = [normalized, ...(domain ? [`@${domain}`] : [])];
  const { data, error } = await supabase
    .from("blocked_emails")
    .select("id")
    .in("pattern", patterns)
    .limit(1);

  if (error) throw error;
  return (data?.length ?? 0) > 0;
}
