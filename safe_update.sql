-- SAFE UPDATE SCRIPT FOR BLOG & SLIDES
-- Clear your SQL Editor and run this exactly.

-- 1. Create Blog Posts Table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text not null,
  image_url text,
  is_published boolean default true
);

alter table posts enable row level security;

-- Recreate Policies for Posts (Drops existing to avoid errors)
drop policy if exists "Public can view posts" on posts;
create policy "Public can view posts" on posts for select using (true);

drop policy if exists "Admin can manage posts" on posts;
create policy "Admin can manage posts" on posts for all using (auth.role() = 'authenticated');


-- 2. Create Slides Table
create table if not exists slides (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  subtitle text,
  image_url text not null,
  cta_text text default 'Book Now',
  cta_link text default '/book',
  sort_order int default 0
);

alter table slides enable row level security;

-- Recreate Policies for Slides
drop policy if exists "Public can view slides" on slides;
create policy "Public can view slides" on slides for select using (true);

drop policy if exists "Admin can manage slides" on slides;
create policy "Admin can manage slides" on slides for all using (auth.role() = 'authenticated');


-- 3. Insert Default Data (Only if empty)
insert into slides (title, subtitle, image_url, cta_text, cta_link, sort_order)
select 'Cleaning with a Spirit of Excellence', 'Serving South Florida Since 2008. Professional, Reliable, & Detailed.', '/assets/sliderimages/1.jpg', 'Book Now', '/book', 1
where not exists (select 1 from slides);

insert into slides (title, subtitle, image_url, cta_text, cta_link, sort_order)
select 'Quality Cleaning Services', 'Residential & Commercial cleaning tailored to your needs.', '/assets/sliderimages/2.jpg', 'Our Services', '/services', 2
where not exists (select 1 from slides where sort_order = 2);

insert into slides (title, subtitle, image_url, cta_text, cta_link, sort_order)
select 'Professional Staff', 'Trained, Insured, and dedicated to your satisfaction.', '/assets/sliderimages/3.jpg', 'Contact Us', '/book', 3
where not exists (select 1 from slides where sort_order = 3);