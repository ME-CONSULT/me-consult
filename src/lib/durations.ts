import { supabaseAdmin } from "@/lib/supabase/admin";

export type Duration = {
  id: string;
  minutes: number;
  created_at: string;
};

export async function listDurations() {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("durations")
    .select("*")
    .order("minutes", { ascending: true });

  if (error) throw error;
  return data as Duration[];
}

export async function createDuration(minutes: number) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("durations")
    .insert({ minutes })
    .select()
    .single();

  if (error) throw error;
  return data as Duration;
}

export async function deleteDuration(id: string) {
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("durations").delete().eq("id", id);
  if (error) throw error;
}
