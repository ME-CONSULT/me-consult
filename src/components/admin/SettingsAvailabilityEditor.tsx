"use client";

import { useState } from "react";
import type { Lawyer } from "@/lib/lawyers";
import type { LawyerAvailability } from "@/lib/lawyerAvailability";

const WEEKDAYS = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 0, label: "Sunday" },
];

function trimSeconds(time: string) {
  return time.slice(0, 5);
}

export default function SettingsAvailabilityEditor({
  lawyers,
  initialAvailability,
}: {
  lawyers: Lawyer[];
  initialAvailability: LawyerAvailability[];
}) {
  const [availability, setAvailability] = useState(initialAvailability);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function rangeFor(lawyerId: string, weekday: number) {
    return availability.find((a) => a.lawyer_id === lawyerId && a.weekday === weekday) ?? null;
  }

  async function saveRange(lawyerId: string, weekday: number, startTime: string, endTime: string) {
    const key = `${lawyerId}-${weekday}`;
    setError(null);
    setSavingKey(key);

    const res = await fetch("/api/admin/availability", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lawyer_id: lawyerId, weekday, start_time: startTime, end_time: endTime }),
    });

    setSavingKey(null);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not save availability");
      return;
    }

    const { availability: row } = await res.json();
    setAvailability((prev) => {
      const exists = prev.some((a) => a.id === row.id);
      return exists ? prev.map((a) => (a.id === row.id ? row : a)) : [...prev, row];
    });
  }

  async function toggleDay(lawyerId: string, weekday: number, enabled: boolean) {
    if (enabled) {
      saveRange(lawyerId, weekday, "09:00", "17:00");
      return;
    }

    const existing = rangeFor(lawyerId, weekday);
    if (!existing) return;

    setAvailability((prev) => prev.filter((a) => a.id !== existing.id));

    const res = await fetch(`/api/admin/availability/${existing.id}`, { method: "DELETE" });
    if (!res.ok) {
      setAvailability((prev) => [...prev, existing]);
      setError("Could not remove that day");
    }
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      {lawyers.map((lawyer) => (
        <div key={lawyer.id} className="rounded-xl border border-[#222753]/10 bg-white p-4">
          <p className="text-sm font-semibold text-[#222753]">
            {lawyer.first_name} {lawyer.last_name}
          </p>
          <div className="mt-3 space-y-1.5">
            {WEEKDAYS.map(({ value, label }) => {
              const range = rangeFor(lawyer.id, value);
              const key = `${lawyer.id}-${value}`;
              const saving = savingKey === key;
              return (
                <div key={value} className="flex items-center gap-3 py-1">
                  <label className="flex w-32 shrink-0 items-center gap-2 text-sm text-[#222753]">
                    <input
                      type="checkbox"
                      checked={!!range}
                      onChange={(e) => toggleDay(lawyer.id, value, e.target.checked)}
                      className="h-4 w-4 rounded border-[#222753]/30"
                    />
                    {label}
                  </label>
                  {range ? (
                    <div className="flex items-center gap-2 text-sm">
                      <input
                        type="time"
                        defaultValue={trimSeconds(range.start_time)}
                        onBlur={(e) => saveRange(lawyer.id, value, e.target.value, trimSeconds(range.end_time))}
                        disabled={saving}
                        className="rounded-lg border border-[#222753]/15 px-2 py-1 text-[#222753] outline-none focus:border-[#222753]/40 disabled:opacity-50"
                      />
                      <span className="text-[#222753]/40">to</span>
                      <input
                        type="time"
                        defaultValue={trimSeconds(range.end_time)}
                        onBlur={(e) => saveRange(lawyer.id, value, trimSeconds(range.start_time), e.target.value)}
                        disabled={saving}
                        className="rounded-lg border border-[#222753]/15 px-2 py-1 text-[#222753] outline-none focus:border-[#222753]/40 disabled:opacity-50"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-[#222753]/30">Not available</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <p className="text-xs text-[#222753]/40">
        Bookable start times are generated from these hours based on the consultation length a
        client picks &mdash; e.g. 9:00&ndash;17:00 with a 60 minute consultation offers 9:00,
        10:00, ... 16:00.
      </p>
    </div>
  );
}
