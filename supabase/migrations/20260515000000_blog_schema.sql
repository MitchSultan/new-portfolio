-- Migration: Create Blog Schema

-- Table: posts
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_url text,
  category text,
  tags text[],
  status text default 'draft' check (status in ('draft','published','archived')),
  featured boolean default false,
  reading_time_minutes int,
  views_count int default 0,
  author_id uuid references auth.users(id),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: categories
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  color text,
  created_at timestamptz default now()
);

-- Table: post_views
create table public.post_views (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts(id) on delete cascade,
  viewer_ip text,
  user_agent text,
  viewed_at timestamptz default now()
);

-- RLS Policies
alter table public.posts enable row level security;
alter table public.categories enable row level security;
alter table public.post_views enable row level security;

-- Posts: Public read policy on posts WHERE status = 'published'
create policy "Public can view published posts"
  on public.posts for select
  using (status = 'published');

-- Posts: Admin full CRUD policy (assuming authenticated users are admins)
create policy "Admins have full access to posts"
  on public.posts for all
  using (auth.role() = 'authenticated');

-- Categories: Public read
create policy "Public can view categories"
  on public.categories for select
  using (true);

create policy "Admins have full access to categories"
  on public.categories for all
  using (auth.role() = 'authenticated');

-- Post Views: Public insert, Admin read
create policy "Public can insert post_views"
  on public.post_views for insert
  with check (true);

create policy "Admins can view post_views"
  on public.post_views for select
  using (auth.role() = 'authenticated');

-- Trigger to auto-update updated_at on posts
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.posts
  for each row
  execute function public.handle_updated_at();

-- Trigger to auto-calculate reading_time_minutes based on content
create or replace function public.calculate_reading_time()
returns trigger as $$
declare
  word_count int;
begin
  -- very simple word count: stripping HTML tags and counting words separated by spaces
  word_count := array_length(regexp_split_to_array(regexp_replace(new.content, '<[^>]+>', ' ', 'g'), '\s+'), 1);
  if word_count is null then
    word_count := 0;
  end if;
  new.reading_time_minutes := greatest(1, ceiling(word_count::numeric / 200));
  return new;
end;
$$ language plpgsql;

create trigger update_reading_time
  before insert or update of content on public.posts
  for each row
  execute function public.calculate_reading_time();

-- Trigger to auto-increment views_count when a row is inserted into post_views
create or replace function public.increment_post_views()
returns trigger as $$
begin
  update public.posts
  set views_count = coalesce(views_count, 0) + 1
  where id = new.post_id;
  return new;
end;
$$ language plpgsql;

create trigger increment_views_count
  after insert on public.post_views
  for each row
  execute function public.increment_post_views();

-- Enable Supabase Storage bucket named blog-images with public read access
insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true) on conflict (id) do nothing;

create policy "Public can view blog-images"
  on storage.objects for select
  using ( bucket_id = 'blog-images' );

create policy "Admins can insert blog-images"
  on storage.objects for insert
  with check ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );

create policy "Admins can update blog-images"
  on storage.objects for update
  using ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );

create policy "Admins can delete blog-images"
  on storage.objects for delete
  using ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );
