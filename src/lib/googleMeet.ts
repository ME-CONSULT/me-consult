import type { Booking } from "@/lib/bookings";
import type { Lawyer } from "@/lib/lawyers";

// Creates Google Calendar events with a Meet link on ME Consult's Google
// account. Auth is a long-lived OAuth refresh token for that account (see
// scripts/google-refresh-token.mjs). If the env vars are missing every
// function here is a silent no-op, so bookings never fail because of Meet.

const CALENDAR_API = "https://www.googleapis.com/calendar/v3";

function config() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;
  return {
    clientId,
    clientSecret,
    refreshToken,
    calendarId: encodeURIComponent(process.env.GOOGLE_CALENDAR_ID || "primary"),
  };
}

type Config = NonNullable<ReturnType<typeof config>>;

async function accessToken(cfg: Config) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      refresh_token: cfg.refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(`Google token refresh failed: ${data.error ?? res.status}`);
  }
  return data.access_token as string;
}

// Deterministic event id per booking (Google allows a-v + 0-9, and a UUID
// without dashes fits), so retries and the webhook/confirm-page race reuse
// the same event, and reschedule/cancel need no extra DB column.
function eventIdFor(bookingId: string) {
  return `mec${bookingId.replace(/-/g, "").toLowerCase()}`;
}

function timesFor(booking: Booking) {
  const start = new Date(booking.scheduled_at!);
  const end = new Date(start.getTime() + (booking.duration_minutes ?? 60) * 60_000);
  return {
    start: { dateTime: start.toISOString(), timeZone: "Africa/Lagos" },
    end: { dateTime: end.toISOString(), timeZone: "Africa/Lagos" },
  };
}

type CalendarEvent = {
  hangoutLink?: string;
  conferenceData?: { entryPoints?: { entryPointType: string; uri: string }[] };
};

function meetLinkOf(event: CalendarEvent) {
  return (
    event.hangoutLink ??
    event.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")?.uri ??
    null
  );
}

async function getEvent(cfg: Config, token: string, id: string) {
  const res = await fetch(`${CALENDAR_API}/calendars/${cfg.calendarId}/events/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return (await res.json()) as CalendarEvent;
}

/** Creates (or reuses) the calendar event for a booking and returns its Meet link. */
export async function createMeetForBooking(booking: Booking, lawyer: Lawyer | null) {
  const cfg = config();
  if (!cfg || !booking.scheduled_at) return null;

  const token = await accessToken(cfg);
  const id = eventIdFor(booking.id);
  const lawyerName = lawyer ? `${lawyer.first_name} ${lawyer.last_name}` : "ME Consult";

  const res = await fetch(
    `${CALENDAR_API}/calendars/${cfg.calendarId}/events?conferenceDataVersion=1&sendUpdates=all`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        summary: `ME Consult consultation: ${booking.client_name} with ${lawyerName}`,
        description: [
          `Consultation with ${lawyerName}`,
          booking.duration_minutes ? `Duration: ${booking.duration_minutes} minutes` : null,
          booking.service ? `Regarding: ${booking.service}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        ...timesFor(booking),
        attendees: [{ email: booking.client_email, displayName: booking.client_name }],
        conferenceData: {
          createRequest: { requestId: id, conferenceSolutionKey: { type: "hangoutsMeet" } },
        },
      }),
    }
  );

  // 409 = event already exists (a retry or the parallel webhook made it).
  if (res.status === 409) {
    const existing = await getEvent(cfg, token, id);
    return existing ? meetLinkOf(existing) : null;
  }
  const event = (await res.json()) as CalendarEvent & { error?: { message?: string } };
  if (!res.ok) throw new Error(`Google event create failed: ${event.error?.message ?? res.status}`);

  const link = meetLinkOf(event);
  if (link) return link;
  // Meet creation can lag a moment behind the event itself.
  await new Promise((r) => setTimeout(r, 1500));
  const again = await getEvent(cfg, token, id);
  return again ? meetLinkOf(again) : null;
}

/** Moves the booking's event (if one exists) to its current scheduled time. */
export async function rescheduleMeetForBooking(booking: Booking) {
  const cfg = config();
  if (!cfg || !booking.scheduled_at) return;

  const token = await accessToken(cfg);
  const res = await fetch(
    `${CALENDAR_API}/calendars/${cfg.calendarId}/events/${eventIdFor(booking.id)}?sendUpdates=all`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(timesFor(booking)),
    }
  );
  if (!res.ok && res.status !== 404) {
    throw new Error(`Google event reschedule failed: ${res.status}`);
  }
}

/** Deletes the booking's event (if one exists); attendees get a cancellation. */
export async function cancelMeetForBooking(bookingId: string) {
  const cfg = config();
  if (!cfg) return;

  const token = await accessToken(cfg);
  const res = await fetch(
    `${CALENDAR_API}/calendars/${cfg.calendarId}/events/${eventIdFor(bookingId)}?sendUpdates=all`,
    { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok && res.status !== 404 && res.status !== 410) {
    throw new Error(`Google event cancel failed: ${res.status}`);
  }
}
