-- Sequential-numbered PDF invoices. PDFs are generated on-demand from this
-- row's data (via @react-pdf/renderer) rather than stored as binaries, so
-- there's nothing to keep in sync if a booking's data changes before the
-- invoice is first viewed/downloaded.
create sequence invoice_number_seq start 1;

create table invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number bigint not null unique default nextval('invoice_number_seq'),
  booking_id uuid not null references bookings(id) on delete cascade,
  client_id uuid references clients(id) on delete set null,
  amount_kobo integer not null,
  issued_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index invoices_booking_id_idx on invoices (booking_id);
create index invoices_client_id_idx on invoices (client_id);
alter table invoices enable row level security;
