-- Move consultation_rates from tier-keyed to lawyer-keyed (so each named
-- lawyer has their own editable rate, not a rate shared across a tier),
-- and add USD/GBP alongside the existing NGN price.

alter table consultation_rates add column lawyer_id uuid references lawyers(id) on delete cascade;

update consultation_rates cr
set lawyer_id = (select id from lawyers l where l.tier = cr.tier limit 1);

alter table consultation_rates alter column lawyer_id set not null;
alter table consultation_rates drop constraint consultation_rates_tier_duration_minutes_key;
alter table consultation_rates add constraint consultation_rates_lawyer_duration_key unique (lawyer_id, duration_minutes);
alter table consultation_rates drop column tier;

alter table consultation_rates add column fee_usd_cents integer;
alter table consultation_rates add column fee_gbp_pence integer;
