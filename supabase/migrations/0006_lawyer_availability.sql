-- Replaces the global, duration-keyed "bookable timeslots" list with
-- per-lawyer weekly working hours. Each lawyer gets at most one time range
-- per weekday; bookable start times are generated from that range by
-- stepping through it in increments of the selected consultation duration.

create table lawyer_availability (
  id uuid primary key default gen_random_uuid(),
  lawyer_id uuid not null references lawyers(id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null check (end_time > start_time),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lawyer_id, weekday)
);

alter table lawyer_availability enable row level security;

drop table duration_timeslots;
