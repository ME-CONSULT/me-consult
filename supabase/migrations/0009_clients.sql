-- Real client identity/status table, replacing the purely-derived
-- ClientSummary in src/lib/clients.ts. Aggregate stats (bookings count,
-- total paid, last booking) stay computed live from `bookings` at read
-- time; this table only owns persistent identity + portal-account state.
create table clients (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  phone text,
  auth_user_id uuid references auth.users(id) on delete set null,
  login_sent_at timestamptz,
  first_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index clients_auth_user_id_idx on clients (auth_user_id);
alter table clients enable row level security;

-- Backfill one row per distinct existing booking client_email, using the
-- most recent booking's name/phone (latest booking per email wins).
insert into clients (email, name, phone, created_at)
select
  lower(b.client_email) as email,
  (array_agg(b.client_name order by b.created_at desc))[1] as name,
  (array_agg(b.client_phone order by b.created_at desc))[1] as phone,
  min(b.created_at) as created_at
from bookings b
group by lower(b.client_email)
on conflict (email) do nothing;
