-- Hardening and extending the user creation trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Create profile
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  )
  on conflict (id) do nothing;

  -- Create default dashboard stats
  insert into public.dashboard_stats (user_id, active_workflows, daily_habits, upwork_earnings, job_success_score)
  values (new.id, 0, 0, '$0', '100%')
  on conflict (user_id) do nothing;

  return new;
end;
$$ language plpgsql security definer set search_path = public;
