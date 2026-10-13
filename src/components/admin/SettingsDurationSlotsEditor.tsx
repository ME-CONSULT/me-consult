"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Lawyer } from "@/lib/lawyers";
import type { Duration } from "@/lib/durations";
import type { LawyerDurationSlot } from "@/lib/lawyerAvailability";

type SlotMap = Record<string, string[]>; // `${lawyerId}-${minutes}` -> ["HH:MM"]

function buildMap(slots: LawyerDurationSlot[]): SlotMap {
  const map: SlotMap = {};
  for (const s of slots) {
    (map[`${s.lawyer_id}-${s.duration_minutes}`] ??= []).push(s.start_time.slice(0, 5));
  }
  for (const key of Object.keys(map)) map[key].sort();
  return map;
}

export default function SettingsDurationSlotsEditor({
  lawyers,
  durations,
  initialSlots,
}: {
  lawyers: Lawyer[];
  durations: Duration[];
  initialSlots: LawyerDurationSlot[];
}) {
  const [slots, setSlots] = useState<SlotMap>(() => buildMap(initialSlots));
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function save(lawyerId: string, minutes: number, next: string[]) {
    const key = `${lawyerId}-${minutes}`;
    const previous = slots[key] ?? [];
    setError(null);
    setSavingKey(key);
    setSlots((cur) => ({ ...cur, [key]: next }));

    const res = await fetch("/api/admin/duration-slots", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lawyer_id: lawyerId, duration_minutes: minutes, start_times: next }),
    });

    setSavingKey(null);
    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not save start times");
      setSlots((cur) => ({ ...cur, [key]: previous }));
    }
  }

  function add(lawyerId: string, minutes: number) {
    const key = `${lawyerId}-${minutes}`;
    const time = drafts[key];
    if (!time) return;
    const current = slots[key] ?? [];
    if (!current.includes(time)) save(lawyerId, minutes, [...current, time].sort());
    setDrafts((cur) => ({ ...cur, [key]: "" }));
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      {lawyers.map((lawyer) => (
        <div key={lawyer.id} className="rounded-xl border border-[#222753]/10 bg-white p-4">
          <p className="text-sm font-semibold text-[#222753]">
            {lawyer.first_name} {lawyer.last_name}
          </p>
          <div className="mt-3 space-y-2">
            {durations.map(({ minutes }) => {
              const key = `${lawyer.id}-${minutes}`;
              const times = slots[key] ?? [];
              const saving = savingKey === key;
              return (
                <div key={minutes} className="flex flex-wrap items-center gap-2 py-1">
                  <span className="w-24 shrink-0 text-sm text-[#222753]">{minutes} min</span>
                  {times.length === 0 && (
                    <span className="text-sm text-[#222753]/30">Uses working hours</span>
                  )}
                  {times.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1 rounded-full bg-[#222753] py-1 pl-3 pr-1.5 text-xs font-medium text-white"
                    >
                      {t}
                      <button
                        type="button"
                        aria-label={`Remove ${t}`}
                        disabled={saving}
                        onClick={() => save(lawyer.id, minutes, times.filter((x) => x !== t))}
                        className="rounded-full p-0.5 hover:bg-white/20 disabled:opacity-50"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="time"
                    value={drafts[key] ?? ""}
                    onChange={(e) => setDrafts((cur) => ({ ...cur, [key]: e.target.value }))}
                    disabled={saving}
                    className="rounded-lg border border-[#222753]/15 px-2 py-1 text-sm text-[#222753] outline-none focus:border-[#222753]/40 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => add(lawyer.id, minutes)}
                    disabled={saving || !drafts[key]}
                    className="rounded-lg border border-[#222753]/15 px-3 py-1 text-sm font-medium text-[#222753] hover:border-[#222753]/40 disabled:opacity-40"
                  >
                    Add
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <p className="text-xs text-[#222753]/40">
        When a lawyer has start times set for a consultation length, clients can only book those
        times (on days the lawyer is available). Leave it empty to offer every start time within
        their working hours instead.
      </p>
    </div>
  );
}
