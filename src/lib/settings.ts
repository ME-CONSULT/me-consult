import { supabaseAdmin } from "@/lib/supabase/admin";

export type Settings = {
  id: number;
  business_email: string;
  business_phone: string | null;
  booking_notice_hours: number;
  vat_rate: number;
  business_days: number[];
  updated_at: string;
};

export async function getSettings() {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.from("settings").select("*").eq("id", 1).single();
  if (error) throw error;
  return data as Settings;
}

export type SettingsUpdateInput = Partial<
  Pick<Settings, "business_email" | "business_phone" | "booking_notice_hours" | "vat_rate" | "business_days">
>;

export async function updateSettings(fields: SettingsUpdateInput) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("settings")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", 1)
    .select()
    .single();

  if (error) throw error;
  return data as Settings;
}
