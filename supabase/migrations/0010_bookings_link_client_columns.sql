-- Adds: appointment title (customizable per booking, distinct from the
-- existing `service` topic dropdown), a generic meeting-link field
-- (provider-agnostic; video-conferencing wiring intentionally out of
-- scope for now), and a stable client_id FK so the portal/reschedule/
-- invoice queries don't rely on email-string matching.
alter table bookings
  add column title text,
  add column meeting_url text,
  add column client_id uuid references clients(id) on delete set null;

create index bookings_client_id_idx on bookings (client_id);
