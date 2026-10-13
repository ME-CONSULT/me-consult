import { supabaseAdmin } from "@/lib/supabase/admin";

export type LawyerAvailability = {
  id: string;
  lawyer_id: string;
  weekday: number; // 0 = Sunday .. 6 = Saturday
  start_time: string; // "HH:MM:SS"
  end_time: string;
  updated_at: string;
  /** Fixed start times ("HH:MM") by duration in minutes, for this lawyer.
   * Attached by listAvailability(); overrides generated slots when present. */
  fixed_slots?: Record<number, string[]>;
};

export type LawyerDurationSlot = {
  id: string;
  lawyer_id: string;
  duration_minutes: number;
  start_time: string; // "HH:MM:SS"
};

export async function listAvailability() {
  const supabase = supabaseAdmin();
  const [{ data, error }, slots] = await Promise.all([
    supabase.from("lawyer_availability").select("*").order("weekday", { ascending: true }),
    listDurationSlots(),
  ]);

  if (error) throw error;

  const byLawyer = new Map<string, Record<number, string[]>>();
  for (const slot of slots) {
    const map = byLawyer.get(slot.lawyer_id) ?? {};
    (map[slot.duration_minutes] ??= []).push(slot.start_time.slice(0, 5));
    byLawyer.set(slot.lawyer_id, map);
  }

  return (data as LawyerAvailability[]).map((a) => ({
    ...a,
    fixed_slots: byLawyer.get(a.lawyer_id),
  }));
}

export async function listDurationSlots() {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("lawyer_duration_slots")
    .select("id, lawyer_id, duration_minutes, start_time")
    .order("start_time", { ascending: true });

  // Table not created yet (migration 0017): behave as if no fixed slots.
  if (error) {
    if (error.code === "42P01" || error.code === "PGRST205") return [];
    throw error;
  }
  return data as LawyerDurationSlot[];
}

/** Replaces the fixed start times for one lawyer + duration. */
export async function setDurationSlots(lawyerId: string, durationMinutes: number, startTimes: string[]) {
  const supabase = supabaseAdmin();
  const { error: deleteError } = await supabase
    .from("lawyer_duration_slots")
    .delete()
    .eq("lawyer_id", lawyerId)
    .eq("duration_minutes", durationMinutes);
  if (deleteError) throw deleteError;

  const unique = [...new Set(startTimes)].sort();
  if (unique.length === 0) return;

  const { error } = await supabase.from("lawyer_duration_slots").insert(
    unique.map((start_time) => ({ lawyer_id: lawyerId, duration_minutes: durationMinutes, start_time }))
  );
  if (error) throw error;
}

export async function upsertAvailability(
  lawyerId: string,
  weekday: number,
  startTime: string,
  endTime: string
) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("lawyer_availability")
    .upsert(
      {
        lawyer_id: lawyerId,
        weekday,
        start_time: startTime,
        end_time: endTime,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "lawyer_id,weekday" }
    )
    .select()
    .single();

  if (error) throw error;
  return data as LawyerAvailability;
}

export async function deleteAvailability(id: string) {
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("lawyer_availability").delete().eq("id", id);
  if (error) throw error;
}

/** "HH:MM:SS" or "HH:MM" -> minutes since midnight. */
function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(minutes: number) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** Bookable start times ("HH:MM") for a working range, stepping by duration. */
export function slotsForRange(startTime: string, endTime: string, durationMinutes: number) {
  const start = toMinutes(startTime);
  const end = toMinutes(endTime);
  const slots: string[] = [];

  for (let t = start; t + durationMinutes <= end; t += durationMinutes) {
    slots.push(toHHMM(t));
  }

  return slots;
}

/** Bookable start times for a specific lawyer, weekday, and duration. */
export function slotsForLawyerDay(
  availability: LawyerAvailability[],
  lawyerId: string,
  weekday: number,
  durationMinutes: number
) {
  const range = availability.find((a) => a.lawyer_id === lawyerId && a.weekday === weekday);
  if (!range) return [];

  const fixed = range.fixed_slots?.[durationMinutes];
  if (fixed && fixed.length > 0) return [...fixed].sort();

  return slotsForRange(range.start_time, range.end_time, durationMinutes);
}

/** Bookable start times where EVERY given lawyer is free (intersection) —
 * used for multi-consultant "collection" bookings redeemed off a booking
 * link with 2+ attached lawyers. */
export function slotsForLawyersDay(
  availability: LawyerAvailability[],
  lawyerIds: string[],
  weekday: number,
  durationMinutes: number
) {
  if (lawyerIds.length === 0) return [];

  const [first, ...rest] = lawyerIds;
  let common = new Set(slotsForLawyerDay(availability, first, weekday, durationMinutes));

  for (const lawyerId of rest) {
    const slots = new Set(slotsForLawyerDay(availability, lawyerId, weekday, durationMinutes));
    common = new Set([...common].filter((t) => slots.has(t)));
  }

  return [...common].sort();
}
