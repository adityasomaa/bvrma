-- BVRMA — Supabase initial schema
-- Run via: Supabase Dashboard → SQL Editor → paste & Run.

-- ============================================================
-- Contact form submissions (public can INSERT, admin can SELECT)
-- ============================================================
create table if not exists public.contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  subject      text not null,
  message      text not null,
  ip           text,
  user_agent   text,
  handled      boolean not null default false,
  handled_at   timestamptz
);

alter table public.contact_submissions enable row level security;

-- Anyone (anon) can insert; we never SELECT from anon side.
drop policy if exists "anon can insert contact" on public.contact_submissions;
create policy "anon can insert contact"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Authenticated admin role can read.
drop policy if exists "admin can read contact" on public.contact_submissions;
create policy "admin can read contact"
  on public.contact_submissions
  for select
  to authenticated
  using (auth.jwt() ->> 'role' = 'admin');

-- ============================================================
-- Membership applications (Join Now)
-- ============================================================
create table if not exists public.membership_applications (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  company_name    text not null,
  contact_person  text not null,
  email           text not null,
  phone           text,
  region          text,
  notes           text,
  status          text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_at     timestamptz,
  reviewed_by     uuid references auth.users(id) on delete set null,
  user_id         uuid references auth.users(id) on delete set null
);

alter table public.membership_applications enable row level security;

drop policy if exists "anon can apply" on public.membership_applications;
create policy "anon can apply"
  on public.membership_applications
  for insert
  to anon
  with check (true);

drop policy if exists "user reads own application" on public.membership_applications;
create policy "user reads own application"
  on public.membership_applications
  for select
  to authenticated
  using (auth.uid() = user_id);

-- ============================================================
-- Verification submissions (member verification documents)
-- ============================================================
create table if not exists public.verification_submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  user_id       uuid references auth.users(id) on delete cascade,
  document_type text not null,
  document_url  text not null, -- Supabase Storage path
  status        text not null default 'pending' check (status in ('pending','approved','rejected')),
  notes         text
);

alter table public.verification_submissions enable row level security;

drop policy if exists "owner read verification" on public.verification_submissions;
create policy "owner read verification"
  on public.verification_submissions
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "owner insert verification" on public.verification_submissions;
create policy "owner insert verification"
  on public.verification_submissions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- ============================================================
-- Job applications (when applicants apply through site)
-- ============================================================
create table if not exists public.job_applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  job_slug      text not null,
  applicant_name text not null,
  email         text not null,
  phone         text,
  cv_url        text,
  cover_letter  text
);

alter table public.job_applications enable row level security;

drop policy if exists "anon apply job" on public.job_applications;
create policy "anon apply job"
  on public.job_applications
  for insert
  to anon
  with check (true);

-- ============================================================
-- Newsletter subscribers (for Resend audience sync)
-- ============================================================
create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null unique,
  confirmed   boolean not null default false,
  unsubscribed_at timestamptz,
  source      text
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "anon subscribe" on public.newsletter_subscribers;
create policy "anon subscribe"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (true);
