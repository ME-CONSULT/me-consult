import { combineLagosDateTime, weekdayOf } from "@/lib/availability";

const LAGOS_TZ = "Africa/Lagos";
const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function toDate(dateStr: string) {
  return new Date(`${dateStr}T12:00:00Z`);
}

function toDateStr(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function addDays(dateStr: string, days: number) {
  const d = toDate(dateStr);
  d.setUTCDate(d.getUTCDate() + days);
  return toDateStr(d);
}

/** Monday (YYYY-MM-DD) of the week containing the given date. */
export function mondayOf(dateStr: string) {
  const day = weekdayOf(dateStr); // 0=Sun..6=Sat
  const diff = day === 0 ? -6 : 1 - day;
  return addDays(dateStr, diff);
}

export function todayLagosDateStr() {
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: LAGOS_TZ });
  return fmt.format(new Date()); // en-CA formats as YYYY-MM-DD
}

/** UTC instant range [start, end) for a Lagos-local calendar week starting Monday. */
export function weekRangeUTC(mondayStr: string) {
  const startISO = combineLagosDateTime(mondayStr, "00:00").toISOString();
  const endISO = combineLagosDateTime(addDays(mondayStr, 7), "00:00").toISOString();
  return { startISO, endISO };
}

/** Weekday (0=Sun..6=Sat), hour (0-23), and minute of a UTC instant, in Lagos local time. */
export function lagosPartsOf(iso: string) {
  const date = new Date(iso);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: LAGOS_TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(date);
  const weekdayShort = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const rawHour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");

  return {
    weekday: WEEKDAY_INDEX[weekdayShort] ?? 0,
    hour: rawHour === 24 ? 0 : rawHour,
    minute,
  };
}

export function formatHourLabel(hour: number) {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}

export function formatWeekRangeLabel(mondayStr: string) {
  const sunday = addDays(mondayStr, 6);
  const start = toDate(mondayStr);
  const end = toDate(sunday);
  const startLabel = start.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  const endLabel = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  return `${startLabel} – ${endLabel}`;
}
