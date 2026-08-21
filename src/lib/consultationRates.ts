import { supabaseAdmin } from "@/lib/supabase/admin";

export type ConsultationRate = {
  id: string;
  lawyer_id: string;
  duration_minutes: number;
  fee_kobo: number;
  fee_usd_cents: number | null;
  fee_gbp_pence: number | null;
  updated_at: string;
};

export async function listRates() {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("consultation_rates")
    .select("*")
    .order("duration_minutes", { ascending: true });

  if (error) throw error;
  return data as ConsultationRate[];
}

export async function getRate(lawyerId: string, durationMinutes: number) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("consultation_rates")
    .select("*")
    .eq("lawyer_id", lawyerId)
    .eq("duration_minutes", durationMinutes)
    .single();

  if (error) return null;
  return data as ConsultationRate;
}

export type RateCurrencyField = "fee_kobo" | "fee_usd_cents" | "fee_gbp_pence";

export async function upsertRate(
  lawyerId: string,
  durationMinutes: number,
  amounts: Partial<Record<RateCurrencyField, number | null>>
) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("consultation_rates")
    .upsert(
      {
        lawyer_id: lawyerId,
        duration_minutes: durationMinutes,
        ...amounts,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "lawyer_id,duration_minutes" }
    )
    .select()
    .single();

  if (error) throw error;
  return data as ConsultationRate;
}

export async function deleteRate(id: string) {
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("consultation_rates").delete().eq("id", id);
  if (error) throw error;
}

export async function deleteRates(ids: string[]) {
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("consultation_rates").delete().in("id", ids);
  if (error) throw error;
}
