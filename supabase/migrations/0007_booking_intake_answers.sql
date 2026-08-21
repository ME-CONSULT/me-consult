-- Adds a flexible column for the richer intake questionnaire (generic +
-- service-specific follow-up questions) collected on the public booking
-- wizard, without requiring a new table or schema change per question.

alter table bookings
  add column intake_answers jsonb not null default '{}'::jsonb;
