-- Optional fixed start times per lawyer + duration. When a lawyer has any
-- rows for a duration, only those start times are bookable (on days they
-- have working hours); otherwise start times are generated from their
-- working-hours range as before.

create table if not exists lawyer_duration_slots (
  id uuid primary key default gen_random_uuid(),
  lawyer_id uuid not null references lawyers(id) on delete cascade,
  duration_minutes integer not null check (duration_minutes > 0),
  start_time time not null,
  created_at timestamptz not null default now(),
  unique (lawyer_id, duration_minutes, start_time)
);

create index if not exists lawyer_duration_slots_lawyer_idx on lawyer_duration_slots (lawyer_id);

alter table lawyer_duration_slots enable row level security;
