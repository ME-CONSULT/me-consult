-- Lawyers roster (real team members, matches home page + terms page)
create table lawyers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  tier text not null check (tier in ('consultant_associate', 'lead_consultant', 'of_counsel')),
  title text not null,
  photo_url text,
  bio text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table lawyers enable row level security;

insert into lawyers (first_name, last_name, tier, title, photo_url, bio, sort_order) values
  ('Mary', 'Ekemezie', 'lead_consultant', 'Founder and Lead Consultant', '/Mary Ekemezie - .jpg',
   'Mary is the Founder and Lead Consultant at ME Consult, with over 18 years of experience in corporate commercial law and employment law advisory.', 1),
  ('Obianuju', 'Ibekwe', 'of_counsel', 'Of Counsel, Company Secretarial & Corporate Governance', '/OBIANUJU IBEKWE -.png',
   'Obianuju serves as Of Counsel at ME Consult, where she leads company secretarial and corporate governance advisory services.', 2),
  ('Rukayya', 'Umar Danladi', 'consultant_associate', 'Consultant Associate', '/Rukayya.jpg',
   'Rukayya is a Consultant Associate at ME Consult, where she advises startups and MSMEs on a wide range of corporate and commercial law matters.', 3);

-- Consultation fee structure: tier x duration -> fee (excl. VAT), from
-- online-consultation-terms page section 4.4
create table consultation_rates (
  id uuid primary key default gen_random_uuid(),
  tier text not null check (tier in ('consultant_associate', 'lead_consultant', 'of_counsel')),
  duration_minutes integer not null check (duration_minutes in (30, 60, 90, 120)),
  fee_kobo integer not null,
  updated_at timestamptz not null default now(),
  unique (tier, duration_minutes)
);

alter table consultation_rates enable row level security;

insert into consultation_rates (tier, duration_minutes, fee_kobo) values
  ('consultant_associate', 30, 2500000),
  ('lead_consultant', 30, 10000000),
  ('of_counsel', 30, 10000000),
  ('consultant_associate', 60, 5000000),
  ('lead_consultant', 60, 20000000),
  ('of_counsel', 60, 20000000),
  ('consultant_associate', 90, 7500000),
  ('lead_consultant', 90, 30000000),
  ('of_counsel', 90, 30000000),
  ('consultant_associate', 120, 10000000),
  ('lead_consultant', 120, 40000000),
  ('of_counsel', 120, 40000000);

-- Bookable timeslots per duration (start time, 24h). Normalizes the one
-- inconsistent example row on the terms page (90min/Of Counsel) to the
-- majority value used by the other 90min rows.
create table duration_timeslots (
  id uuid primary key default gen_random_uuid(),
  duration_minutes integer not null check (duration_minutes in (30, 60, 90, 120)),
  start_time text not null
);

alter table duration_timeslots enable row level security;

insert into duration_timeslots (duration_minutes, start_time) values
  (30, '10:00'), (30, '14:00'),
  (60, '10:00'), (60, '14:00'),
  (90, '11:00'), (90, '15:00'),
  (120, '09:00'), (120, '12:00');

-- Site-wide booking settings (singleton row)
create table settings (
  id integer primary key default 1,
  business_email text not null default 'contactus@me-consult.org',
  business_phone text,
  booking_notice_hours integer not null default 24,
  vat_rate numeric not null default 7.5,
  business_days integer[] not null default '{1,2,3,4,5}',
  updated_at timestamptz not null default now(),
  constraint settings_singleton check (id = 1)
);

alter table settings enable row level security;

insert into settings (id) values (1);

-- Extend bookings for the real lawyer/duration/fee model
alter table bookings
  add column lawyer_id uuid references lawyers(id) on delete set null,
  add column duration_minutes integer,
  add column fee_kobo integer,
  add column vat_kobo integer,
  add column terms_accepted_at timestamptz;

-- Prevent double-booking the same lawyer at the same slot (only bookings
-- still pending or active hold the slot; cancelled/completed don't).
create unique index bookings_lawyer_slot_idx
  on bookings (lawyer_id, scheduled_at)
  where status in ('pending', 'active') and lawyer_id is not null;
