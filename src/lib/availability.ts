const LAGOS_OFFSET = "+01:00";

/** Combines a YYYY-MM-DD date and HH:MM time (both Lagos-local) into a UTC instant. */
export function combineLagosDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00${LAGOS_OFFSET}`);
}

/** Weekday (0=Sun..6=Sat) of a YYYY-MM-DD calendar date, independent of timezone. */
export function weekdayOf(date: string) {
  return new Date(`${date}T12:00:00Z`).getUTCDay();
}

export function isBusinessDay(date: string, businessDays: number[]) {
  return businessDays.includes(weekdayOf(date));
}

export function meetsNotice(scheduledAt: Date, noticeHours: number) {
  return scheduledAt.getTime() >= Date.now() + noticeHours * 60 * 60 * 1000;
}
