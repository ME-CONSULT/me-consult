-- Durations become admin-managed instead of a fixed 30/60/90/120 enum, so
-- the business can add or remove consultation lengths without a code change.
create table durations (
  id uuid primary key default gen_random_uuid(),
  minutes integer not null unique,
  created_at timestamptz not null default now()
);

alter table durations enable row level security;

insert into durations (minutes) values (30), (60), (90), (120);

-- Re-point duration_minutes on the two dependent tables at durations(minutes)
-- instead of a hardcoded CHECK, and drop the old checks.
alter table consultation_rates drop constraint consultation_rates_duration_minutes_check;
alter table consultation_rates
  add constraint consultation_rates_duration_fkey
  foreign key (duration_minutes) references durations(minutes) on delete cascade;

alter table duration_timeslots drop constraint duration_timeslots_duration_minutes_check;
alter table duration_timeslots
  add constraint duration_timeslots_duration_fkey
  foreign key (duration_minutes) references durations(minutes) on delete cascade;
