-- Flat default-price entry screen configuration (reuses the existing
-- singleton settings row rather than a new table).
alter table settings
  add column default_lawyer_id uuid references lawyers(id) on delete set null,
  add column default_duration_minutes integer references durations(minutes) on delete set null,
  add column default_fee_kobo integer check (default_fee_kobo is null or default_fee_kobo >= 0);
