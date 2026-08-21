import { supabaseAdmin } from "@/lib/supabase/admin";

export type LawyerAvailability = {
  id: string;
  lawyer_id: string;
  weekday: number; // 0 = Sunday .. 6 = Saturday
  start_time: string; // "HH:MM:SS"
  end_time: string;
  updated_at: string;
};

export async function listAvailability() {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("lawyer_availability")
    .select("*")
    .order("weekday", { ascending: true });

  if (error) throw error;
  return data as LawyerAvailability[];
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
  return slotsForRange(range.start_time, range.end_time, durationMinutes);
}
