-- =====================================================================
-- Swajit CMS — Storage Buckets, RLS & Tables setup
-- Run this ONCE in the Supabase SQL Editor.
-- Safe to re-run (uses IF NOT EXISTS / ON CONFLICT).
-- =====================================================================

-- 1. STORAGE BUCKETS  -------------------------------------------------
insert into storage.buckets (id, name, public)
values
  ('site-assets',  'site-assets',  true),
  ('products',     'products',     true),
  ('gallery',      'gallery',      true),
  ('hero-slides',  'hero-slides',  true),
  ('news',         'news',         true),
  ('client-logos', 'client-logos', true)
on conflict (id) do update set public = true;

-- 2. STORAGE RLS POLICIES  --------------------------------------------
-- Public read for everyone, writes allowed for anon (site uses a
-- custom admin session, NOT Supabase auth, so we cannot rely on auth.uid()).
-- Tighten later if you migrate admin to Supabase Auth.

drop policy if exists "Public read site buckets"   on storage.objects;
drop policy if exists "Anyone can insert site buckets" on storage.objects;
drop policy if exists "Anyone can update site buckets" on storage.objects;
drop policy if exists "Anyone can delete site buckets" on storage.objects;

create policy "Public read site buckets"
on storage.objects for select to public
using (bucket_id in ('site-assets','products','gallery','hero-slides','news','client-logos'));

create policy "Anyone can insert site buckets"
on storage.objects for insert to anon, authenticated
with check (bucket_id in ('site-assets','products','gallery','hero-slides','news','client-logos'));

create policy "Anyone can update site buckets"
on storage.objects for update to anon, authenticated
using (bucket_id in ('site-assets','products','gallery','hero-slides','news','client-logos'))
with check (bucket_id in ('site-assets','products','gallery','hero-slides','news','client-logos'));

create policy "Anyone can delete site buckets"
on storage.objects for delete to anon, authenticated
using (bucket_id in ('site-assets','products','gallery','hero-slides','news','client-logos'));

-- 3. GALLERY TABLE  ---------------------------------------------------
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  section_title text not null default 'General',
  image_url text not null,
  alt_text text default '',
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.gallery_items enable row level security;

drop policy if exists "Public read gallery"  on public.gallery_items;
drop policy if exists "Anyone write gallery" on public.gallery_items;
create policy "Public read gallery"  on public.gallery_items for select to public using (true);
create policy "Anyone write gallery" on public.gallery_items for all    to anon, authenticated using (true) with check (true);

-- 4. NEWS TABLE  ------------------------------------------------------
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text default '',
  content text default '',
  image_url text default '',
  is_published boolean not null default true,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.news enable row level security;

drop policy if exists "Public read news"  on public.news;
drop policy if exists "Anyone write news" on public.news;
create policy "Public read news"  on public.news for select to public using (true);
create policy "Anyone write news" on public.news for all    to anon, authenticated using (true) with check (true);

-- 5. SITE SETTINGS — ensure write access  -----------------------------
-- Existing table: just ensure RLS allows upsert.
do $$ begin
  if to_regclass('public.site_settings') is not null then
    execute 'alter table public.site_settings enable row level security';
    execute 'drop policy if exists "Public read site_settings"  on public.site_settings';
    execute 'drop policy if exists "Anyone write site_settings" on public.site_settings';
    execute 'create policy "Public read site_settings"  on public.site_settings for select to public using (true)';
    execute 'create policy "Anyone write site_settings" on public.site_settings for all    to anon, authenticated using (true) with check (true)';
  end if;
end $$;

-- 6. PAGE CONTENT — ensure write access  ------------------------------
do $$ begin
  if to_regclass('public.page_content') is not null then
    execute 'alter table public.page_content enable row level security';
    execute 'drop policy if exists "Public read page_content"  on public.page_content';
    execute 'drop policy if exists "Anyone write page_content" on public.page_content';
    execute 'create policy "Public read page_content"  on public.page_content for select to public using (true)';
    execute 'create policy "Anyone write page_content" on public.page_content for all    to anon, authenticated using (true) with check (true)';
  end if;
end $$;

-- 7. PRODUCTS / CLIENTS / HERO_SLIDES — ensure write access  ---------
do $$
declare t text;
begin
  foreach t in array array['products','clients','hero_slides','product_categories'] loop
    if to_regclass('public.'||t) is not null then
      execute format('alter table public.%I enable row level security', t);
      execute format('drop policy if exists "Public read %1$s"  on public.%1$I', t);
      execute format('drop policy if exists "Anyone write %1$s" on public.%1$I', t);
      execute format('create policy "Public read %1$s"  on public.%1$I for select to public using (true)', t);
      execute format('create policy "Anyone write %1$s" on public.%1$I for all    to anon, authenticated using (true) with check (true)', t);
    end if;
  end loop;
end $$;

-- =====================================================================
-- DONE. After running, image uploads, gallery edits, page-content
-- image changes, and Site Settings saves should all work end-to-end.
-- =====================================================================
