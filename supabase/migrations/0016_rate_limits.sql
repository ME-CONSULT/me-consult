-- Shared fixed-window rate limiter for auth and booking endpoints.
-- Called server-side with the service role via hit_rate_limit(); no client access.

create table if not exists public.rate_limits (
  key text primary key,
  count integer not null,
  reset_at timestamptz not null
);

alter table public.rate_limits enable row level security;

create or replace function public.hit_rate_limit(p_key text, p_limit integer, p_window_seconds integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  insert into public.rate_limits (key, count, reset_at)
  values (p_key, 1, now() + make_interval(secs => p_window_seconds))
  on conflict (key) do update set
    count = case when public.rate_limits.reset_at <= now() then 1 else public.rate_limits.count + 1 end,
    reset_at = case when public.rate_limits.reset_at <= now() then excluded.reset_at else public.rate_limits.reset_at end
  returning count into v_count;

  -- Occasional cleanup of long-expired windows.
  if random() < 0.01 then
    delete from public.rate_limits where reset_at < now() - interval '1 day';
  end if;

  return v_count <= p_limit;
end;
$$;

revoke all on function public.hit_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.hit_rate_limit(text, integer, integer) to service_role;
