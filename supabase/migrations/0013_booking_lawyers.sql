-- Records lawyers attached to a MULTI-lawyer booking (2+ selected off a
-- booking link). Ordinary single-lawyer bookings are NOT written here and
-- keep relying solely on bookings.lawyer_id, unchanged, to avoid a
-- dual-write hazard with the existing lawyer-reassignment UI in
-- BookingDetailClient (which only ever updates bookings.lawyer_id).
create table booking_lawyers (
  booking_id uuid not null references bookings(id) on delete cascade,
  lawyer_id uuid not null references lawyers(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (booking_id, lawyer_id)
);

create index booking_lawyers_lawyer_idx on booking_lawyers (lawyer_id);
alter table booking_lawyers enable row level security;
