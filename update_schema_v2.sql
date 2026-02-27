-- RUN THIS IN SUPABASE SQL EDITOR TO ADD BLOG AND SLIDER TABLES

-- 1. Create Blog Posts Table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text not null,
  image_url text, -- Store path like '/assets/blog/1.jpg' or external URL
  is_published boolean default true
);

-- 2. Create Slides Table (for Homepage)
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

-- 3. Enable RLS
alter table posts enable row level security;
alter table slides enable row level security;

-- 4. Policies (Public Read, Admin Write)

-- Blog: Anyone can read published, Admin can do all
create policy "Public can view posts" on posts for select using (true);
create policy "dmin can manage posts" on posts for all using (auth.role() = 'authenticated');

-- Slides: Anyone can read, Admin can do all
create policy "Public can view slides" on slides for select using (true);
create policy "Admin can manage slides" on slides for all using (auth.role() = 'authenticated');

-- 5. Seed Initial Slides (Optional, so it's not empty)
insert into slides (title, subtitle, image_url, cta_text, cta_link, sort_order)
values 
('Cleaning with a Spirit of Excellence', 'Serving South Florida Since 2008. Professional, Reliable, & Detailed.', '/assets/sliderimages/1.jpg', 'Book Now', '/book', 1),
('Quality Cleaning Services', 'Residential & Commercial cleaning tailored to your needs.', '/assets/sliderimages/2.jpg', 'Our Services', '/services', 2),
('Professional Staff', 'Trained, Insured, and dedicated to your satisfaction.', '/assets/sliderimages/3.jpg', 'Contact Us', '/contact', 3);