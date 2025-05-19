-- Supabase schema setup for profiles and posts
-- Ensures posts can reference profiles without foreign-key errors

-- Create the profiles table linked to auth.users
create table if not exists public.profiles (
  id uuid references auth.users(id) primary key,
  username text unique,
  display_name text,
  updated_at timestamp with time zone default timezone('utc', now())
);

-- Enable Row Level Security and define basic policies
alter table public.profiles enable row level security;
create policy "Allow anyone to read profiles"
  on public.profiles for select using ( true );
create policy "Users can update their own profile"
  on public.profiles for update using ( auth.uid() = id );

-- Create posts table referencing profiles(id)
create extension if not exists "uuid-ossp";
create table if not exists public.posts (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    username text not null,
    content text not null,
    created_at timestamptz not null default now()
);

-- Add the username column only if it doesn't exist (for older setups)
alter table public.posts add column if not exists username text;

-- Example: insert a profile row so posting succeeds for a user
-- Replace the UUID and username with your values
insert into public.profiles (id, username, display_name)
values ('00000000-0000-0000-0000-000000000000', 'some_username', 'Some Name')
on conflict (id) do nothing;
