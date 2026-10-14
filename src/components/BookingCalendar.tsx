"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

/** "YYYY-MM-DD" for a UTC-midnight Date. */
export function toDateStr(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Earliest bookable day given the notice period, as "YYYY-MM-DD". */
export function minSelectableDate(noticeHours: number) {
  return toDateStr(new Date(Date.now() + noticeHours * 60 * 60 * 1000));
}

function monthGrid(year: number, month: number) {
  const first = new Date(Date.UTC(year, month, 1));
  const firstWeekday = (first.getUTCDay() + 6) % 7; // 0 = Monday
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(Date.UTC(year, month, d)));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/** Month-grid date picker. Only days for which isSelectable returns true
 * can be clicked, so clients never pick a day that has no bookable slots. */
export default function BookingCalendar({
  value,
  onChange,
  isSelectable,
}: {
  value: string | null;
  onChange: (date: string) => void;
  isSelectable: (date: string) => boolean;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const weeks = monthGrid(viewYear, viewMonth);
  const atCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  function shiftMonth(delta: number) {
    const next = new Date(Date.UTC(viewYear, viewMonth + delta, 1));
    setViewYear(next.getUTCFullYear());
    setViewMonth(next.getUTCMonth());
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-[#222753]/10 bg-white p-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={atCurrentMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#222753]/15 text-[#222753]/60 hover:bg-[#222753]/5 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-semibold text-[#222753]">
          {new Date(Date.UTC(viewYear, viewMonth, 1)).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          })}
        </p>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#222753]/15 text-[#222753]/60 hover:bg-[#222753]/5"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-[#222753]/40">
        {WEEKDAY_LABELS.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      <div className="mt-1 space-y-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1">
            {week.map((d, di) => {
              if (!d) return <div key={di} />;
              const dStr = toDateStr(d);
              const selectable = isSelectable(dStr);
              const selected = dStr === value;
              return (
                <button
                  type="button"
                  key={di}
                  disabled={!selectable}
                  onClick={() => onChange(dStr)}
                  aria-pressed={selected}
                  aria-label={d.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    timeZone: "UTC",
                  })}
                  className={`aspect-square rounded-full text-sm transition disabled:cursor-not-allowed disabled:text-[#222753]/20 ${
                    selected
                      ? "bg-[#222753] font-semibold text-white"
                      : selectable
                        ? "text-[#222753] hover:bg-[#222753]/5"
                        : "text-[#222753]/30"
                  }`}
                >
                  {d.getUTCDate()}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
