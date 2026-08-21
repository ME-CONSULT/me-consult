-- Admin-generated shareable booking links. 1 lawyer attached = today's
-- single-lawyer flow; 2+ lets the client multi-select which of them they
-- want. NGN-only. fee_kobo is a flat bespoke price set by the admin, not
-- FK-constrained to durations/consultation_rates — a link is deliberately
-- arbitrary/one-off.
create table booking_links (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  title text,
  duration_minutes integer not null check (duration_minutes > 0),
  fee_kobo integer not null check (fee_kobo >= 0),
  status text not null default 'active' check (status in ('active', 'used', 'revoked')),
  expires_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index booking_links_token_idx on booking_links (token);
create index booking_links_status_idx on booking_links (status);
alter table booking_links enable row level security;

create table booking_link_lawyers (
  booking_link_id uuid not null references booking_links(id) on delete cascade,
  lawyer_id uuid not null references lawyers(id) on delete cascade,
  primary key (booking_link_id, lawyer_id)
);

alter table booking_link_lawyers enable row level security;
