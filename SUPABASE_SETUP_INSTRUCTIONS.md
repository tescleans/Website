-- Copy and paste this ENTIRE block into the Supabase SQL Editor
-- Link: https://supabase.com/dashboard/project/gvhbenqokrhgjgajhhbb/sql

-- 1. Create Bookings Table
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  service text not null,
  date text not null,
  time text not null,
  name text not null,
  email text not null,
  phone text not null,
  message text,
  status text default 'pending'
);

-- 2. Enable Security (RLS)
alter table bookings enable row level security;

-- 3. Create Access Policies
-- ALLOW COMPLETED BOOKING SUBMISSION (This fixes the 404/PGRST205 error)
create policy "Allow public insert" on bookings for insert with check (true);

-- ALLOW ADMINS TO VIEW/EDIT
create policy "Allow authenticated view" on bookings for select using (auth.role() = 'authenticated');
create policy "Allow authenticated update" on bookings for update using (auth.role() = 'authenticated');