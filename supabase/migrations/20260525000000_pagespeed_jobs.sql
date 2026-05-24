-- Migration: Add PageSpeed job queue table

create table public.pagespeed_jobs (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  canonical_url text not null,
  status text not null default 'pending' check (status in ('pending', 'running', 'completed', 'failed')),
  result jsonb,
  error text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function public.pagespeed_jobs_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_pagespeed_jobs_updated_at
  before update on public.pagespeed_jobs
  for each row
  execute function public.pagespeed_jobs_updated_at();
