import { supabaseAdmin } from "@/lib/supabase/admin";

export type LawyerTier = "consultant_associate" | "lead_consultant" | "of_counsel";

export type Lawyer = {
  id: string;
  first_name: string;
  last_name: string;
  tier: LawyerTier;
  title: string;
  photo_url: string | null;
  bio: string | null;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export const TIER_LABELS: Record<LawyerTier, string> = {
  consultant_associate: "Consultant Associate",
  lead_consultant: "Lead Consultant",
  of_counsel: "Of Counsel",
};

export async function listLawyers(activeOnly = false) {
  const supabase = supabaseAdmin();
  let query = supabase.from("lawyers").select("*").order("sort_order", { ascending: true });
  if (activeOnly) query = query.eq("active", true);

  const { data, error } = await query;
  if (error) throw error;
  return data as Lawyer[];
}

export async function getLawyer(id: string) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.from("lawyers").select("*").eq("id", id).single();
  if (error) return null;
  return data as Lawyer;
}

export type NewLawyerInput = {
  first_name: string;
  last_name: string;
  tier: LawyerTier;
  title: string;
  photo_url?: string | null;
  bio?: string | null;
  sort_order?: number;
};

export async function createLawyer(input: NewLawyerInput) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("lawyers")
    .insert({
      first_name: input.first_name,
      last_name: input.last_name,
      tier: input.tier,
      title: input.title,
      photo_url: input.photo_url ?? null,
      bio: input.bio ?? null,
      sort_order: input.sort_order ?? 0,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Lawyer;
}

export async function updateLawyer(id: string, fields: Partial<NewLawyerInput & { active: boolean }>) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("lawyers")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Lawyer;
}

export async function deleteLawyer(id: string) {
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("lawyers").delete().eq("id", id);
  if (error) throw error;
}
