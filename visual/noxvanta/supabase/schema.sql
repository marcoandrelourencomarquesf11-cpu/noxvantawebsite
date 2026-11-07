-- NOXVANTA database schema. No Supabase Storage bucket is required.
-- Run in Supabase SQL Editor. Review RLS policies before production use.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  riot_id text,
  role text not null default 'member' check (role in ('owner','strategist','player','member')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.strategies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  map_name text not null,
  side text not null check (side in ('attack','defense')),
  instructions text,
  markers jsonb not null default '[]'::jsonb,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  nickname text not null,
  age integer not null check (age >= 13),
  country text,
  current_rank text,
  peak_rank text,
  main_role text,
  agents text,
  availability text,
  competitive_experience text,
  discord text,
  introduction text not null,
  status text not null default 'pending' check (status in ('pending','reviewing','accepted','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  opponent text not null,
  competition text,
  starts_at timestamptz,
  status text not null default 'scheduled',
  result_for integer,
  result_against integer,
  created_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text,
  image_url text,
  published_at timestamptz,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.strategies enable row level security;
alter table public.applications enable row level security;
alter table public.matches enable row level security;
alter table public.news enable row level security;

-- Profiles: signed-in users can read/update only their own profile.
create policy "profile read own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profile update own" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- Strategy reads are for authenticated users. Only owner/strategist can write.
create policy "strategy read authenticated" on public.strategies for select to authenticated using (true);
create policy "strategy insert authorized" on public.strategies for insert to authenticated
with check (created_by = auth.uid() and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('owner','strategist')));
create policy "strategy update authorized" on public.strategies for update to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('owner','strategist')))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('owner','strategist')));
create policy "strategy delete authorized" on public.strategies for delete to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('owner','strategist')));

-- Public visitors may submit applications, but cannot read them.
create policy "application submit public" on public.applications for insert to anon, authenticated with check (true);
create policy "application read owner" on public.applications for select to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'owner'));

-- Public published match/news content.
create policy "matches public read" on public.matches for select to anon, authenticated using (true);
create policy "news public read published" on public.news for select to anon, authenticated using (published = true);

-- IMPORTANT: assign the first owner manually from SQL Editor after creating their Auth user:
-- update public.profiles set role='owner', username='Junior' where id='AUTH_USER_UUID';
-- Create the profile row after Auth user creation:
-- insert into public.profiles (id, username, display_name, role)
-- values ('AUTH_USER_UUID','Junior','Junior','owner');
-- Only the owner should change role values. Do not expose the service_role key in frontend.
