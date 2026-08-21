"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Booking } from "@/lib/bookings";
import type { Lawyer } from "@/lib/lawyers";
import {
  addDays,
  formatHourLabel,
  formatWeekRangeLabel,
  lagosPartsOf,
} from "@/lib/calendarWeek";
import BookingDrawer from "@/components/admin/BookingDrawer";

const ROW_HEIGHT = 56;
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATUS_STYLES: Record<string, string> = {
  pending: "border-amber-300 bg-amber-50 text-amber-800",
  active: "border-blue-300 bg-blue-50 text-blue-800",
  completed: "border-gray-300 bg-gray-50 text-gray-600",
};

function monthYearLabel(mondayStr: string) {
  return new Date(`${mondayStr}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function DashboardWeekCalendar({
  bookings,
  lawyers,
  mondayStr,
  todayStr,
}: {
  bookings: Booking[];
  lawyers: Lawyer[];
  mondayStr: string;
  todayStr: string;
}) {
  const [items, setItems] = useState(bookings);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = items.filter((b) => b.status !== "cancelled" && b.scheduled_at);

  let minHour = 8;
  let maxHour = 18;
  for (const b of visible) {
    const { hour, minute } = lagosPartsOf(b.scheduled_at!);
    const endHour = Math.ceil(hour + (minute + (b.duration_minutes ?? 60)) / 60);
    minHour = Math.min(minHour, hour);
    maxHour = Math.max(maxHour, endHour);
  }
  minHour = Math.max(0, minHour);
  maxHour = Math.min(24, maxHour);
  const hours = Array.from({ length: maxHour - minHour }, (_, i) => minHour + i);
  const totalHeight = hours.length * ROW_HEIGHT;

  const days = Array.from({ length: 7 }, (_, i) => addDays(mondayStr, i));
  const byDay = days.map((dateStr, i) =>
    visible.filter((b) => lagosPartsOf(b.scheduled_at!).weekday === (i + 1) % 7)
  );

  const prevWeek = addDays(mondayStr, -7);
  const nextWeek = addDays(mondayStr, 7);
  const selected = items.find((b) => b.id === selectedId) ?? null;

  return (
    <div className="overflow-hidden rounded-xl border border-[#222753]/10 bg-white">
      <div className="flex items-center justify-between border-b border-[#222753]/10 px-6 py-4">
        <div>
          <p className="text-base font-semibold text-[#222753]">{monthYearLabel(mondayStr)}</p>
          <p className="text-sm text-[#222753]/50">{formatWeekRangeLabel(mondayStr)}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Link
            href={`/admin?week=${prevWeek}`}
            className="rounded-lg p-1.5 text-[#222753]/50 hover:bg-[#222753]/5"
            aria-label="Previous week"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/admin"
            className="rounded-lg border border-[#222753]/15 px-3 py-1.5 text-sm font-medium text-[#222753] hover:bg-[#222753]/5"
          >
            Today
          </Link>
          <Link
            href={`/admin?week=${nextWeek}`}
            className="rounded-lg p-1.5 text-[#222753]/50 hover:bg-[#222753]/5"
            aria-label="Next week"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid min-w-[720px]" style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}>
          <div />
          {days.map((dateStr, i) => {
            const isToday = dateStr === todayStr;
            const dayNum = Number(dateStr.slice(8, 10));
            return (
              <div key={dateStr} className="border-b border-l border-[#222753]/5 px-2 py-2 text-center">
                <p className="text-xs text-[#222753]/40">{DAY_LABELS[(i + 1) % 7]}</p>
                <p
                  className={`mx-auto mt-1 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium ${
                    isToday ? "bg-[#222753] text-white" : "text-[#222753]"
                  }`}
                >
                  {dayNum}
                </p>
              </div>
            );
          })}

          <div style={{ height: totalHeight }}>
            {hours.map((h) => (
              <div
                key={h}
                style={{ height: ROW_HEIGHT }}
                className="-translate-y-2.5 pr-2 text-right text-xs text-[#222753]/40"
              >
                {formatHourLabel(h)}
              </div>
            ))}
          </div>

          {days.map((dateStr, i) => (
            <div key={dateStr} className="relative border-l border-[#222753]/5" style={{ height: totalHeight }}>
              {hours.map((h) => (
                <div key={h} style={{ height: ROW_HEIGHT }} className="border-b border-[#222753]/5" />
              ))}

              {byDay[i].map((b) => {
                const { hour, minute } = lagosPartsOf(b.scheduled_at!);
                const duration = b.duration_minutes ?? 60;
                const top = (hour - minHour) * ROW_HEIGHT + (minute / 60) * ROW_HEIGHT;
                const height = Math.max((duration / 60) * ROW_HEIGHT, 22);
                const startLabel = `${hour % 12 === 0 ? 12 : hour % 12}:${minute.toString().padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;

                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedId(b.id)}
                    style={{ top, height }}
                    className={`absolute inset-x-1 overflow-hidden rounded-md border px-2 py-1 text-left text-xs leading-tight transition hover:brightness-95 ${STATUS_STYLES[b.status]}`}
                  >
                    <p className="truncate font-medium">{b.client_name}</p>
                    <p className="truncate opacity-70">{startLabel}</p>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <BookingDrawer
        booking={selected}
        lawyers={lawyers}
        onClose={() => setSelectedId(null)}
        onUpdated={(updated) => setItems((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))}
      />
    </div>
  );
}
