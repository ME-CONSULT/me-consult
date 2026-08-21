create table bookings (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_email text not null,
  client_phone text,
  service text,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'active', 'completed', 'cancelled')),
  scheduled_at timestamptz,
  amount_kobo integer,
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'paid', 'refunded')),
  paystack_reference text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index bookings_status_idx on bookings(status);
create index bookings_client_email_idx on bookings(client_email);
create index bookings_created_at_idx on bookings(created_at desc);

-- RLS enabled with no policies: locked down entirely except for the
-- service-role key, which is what every admin API route in this app uses
-- (the same model already in place for auth.users-backed admin management).
alter table bookings enable row level security;
