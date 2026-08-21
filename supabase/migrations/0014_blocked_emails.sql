-- Single source of truth for booking-submission blocking. `pattern` is
-- either a full lowercased email or "@domain.com" for a whole-domain block.
create table blocked_emails (
  id uuid primary key default gen_random_uuid(),
  pattern text not null unique,
  reason text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table blocked_emails enable row level security;
