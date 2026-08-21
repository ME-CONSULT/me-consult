-- Backfills role="admin" onto every pre-existing Supabase auth user so the
-- runtime fallback (missing role => admin) is a safety net, not the
-- permanent mechanism. New accounts get role set explicitly from here on
-- (staff/admin invite route; client auto-provisioning on first payment).
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', 'admin')
where raw_app_meta_data->>'role' is null;
