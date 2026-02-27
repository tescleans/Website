-- Create Bookings Table
create table bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  service text not null,
  date text not null, -- Storing as text (YYYY-MM-DD) for simplicity or date type
  time text not null,
  name text not null,
  email text not null,
  phone text not null,
  message text,
  status text default 'pending'
);

-- Row Level Security (RLS)
alter table bookings enable row level security;

-- Policies
-- Allow anyone to insert (make a booking)
create policy "Allow public insert" on bookings for insert with check (true);

-- Allow admins to view all (This requires identifying admins. 
-- For simplicity, we can allow authenticated users to view if we only give login to admins,
-- or strictly check email).
create policy "Allow authenticated view" on bookings for select using (auth.role() = 'authenticated');

-- Allow admins to update status
create policy "Allow authenticated update" on bookings for update using (auth.role() = 'authenticated');