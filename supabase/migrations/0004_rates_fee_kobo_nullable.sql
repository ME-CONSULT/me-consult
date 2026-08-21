-- fee_kobo must be nullable now that a rate row can be created via an
-- upsert on any single currency field (USD/GBP first, NGN filled in later).
alter table consultation_rates alter column fee_kobo drop not null;
