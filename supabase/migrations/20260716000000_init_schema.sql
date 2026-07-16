-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text,
  avatar_url text
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles RLS Policies
create policy "Allow public read access to profiles" on public.profiles
  for select using (true);

create policy "Allow individual user to update their profile" on public.profiles
  for update using (auth.uid() = id);

-- Create workflows table
create table public.workflows (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null default auth.uid(),
  name text not null,
  description text,
  status text not null default 'Coming soon',
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on workflows
alter table public.workflows enable row level security;

-- Workflows RLS Policies
create policy "Allow individual user to read their own workflows" on public.workflows
  for select using (auth.uid() = user_id);

create policy "Allow individual user to insert their own workflows" on public.workflows
  for insert with check (auth.uid() = user_id);

create policy "Allow individual user to update their own workflows" on public.workflows
  for update using (auth.uid() = user_id);

create policy "Allow individual user to delete their own workflows" on public.workflows
  for delete using (auth.uid() = user_id);

-- Create dashboard_stats table
create table public.dashboard_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade unique not null default auth.uid(),
  active_workflows integer not null default 0,
  daily_habits integer not null default 0,
  upwork_earnings text not null default '$0',
  job_success_score text not null default '100%',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on dashboard_stats
alter table public.dashboard_stats enable row level security;

-- Dashboard Stats RLS Policies
create policy "Allow individual user to read their own stats" on public.dashboard_stats
  for select using (auth.uid() = user_id);

create policy "Allow individual user to insert their own stats" on public.dashboard_stats
  for insert with check (auth.uid() = user_id);

create policy "Allow individual user to update their own stats" on public.dashboard_stats
  for update using (auth.uid() = user_id);

create policy "Allow individual user to delete their own stats" on public.dashboard_stats
  for delete using (auth.uid() = user_id);

-- Profile trigger on Auth Sign-Up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
