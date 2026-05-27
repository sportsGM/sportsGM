
-- 龍女體育會員制分析平台 Supabase 建表 SQL
-- 到 Supabase Dashboard → SQL Editor → New query → 貼上全部執行

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  nickname text not null,
  role text not null default 'member' check (role in ('member','admin')),
  is_active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  game_key text not null,
  user_id uuid references auth.users(id) on delete set null,
  nickname text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  game_key text not null,
  user_id uuid references auth.users(id) on delete cascade,
  reaction_type text not null check (reaction_type in ('boom','opposite')),
  created_at timestamptz not null default now(),
  unique(game_key, user_id)
);

create table if not exists public.pundits (
  id uuid primary key default gen_random_uuid(),
  nickname text not null,
  avatar text default '🎯',
  bio text default '',
  accuracy_30 numeric default 0,
  accuracy_all numeric default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.pundit_picks (
  id uuid primary key default gen_random_uuid(),
  pundit_id uuid references public.pundits(id) on delete cascade,
  game_key text not null,
  market text not null,
  pick text not null,
  line text default '',
  reason text default '',
  result text default 'pending' check (result in ('pending','win','lose','push')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.comments enable row level security;
alter table public.reactions enable row level security;
alter table public.pundits enable row level security;
alter table public.pundit_picks enable row level security;

-- 本專案主要透過 Vercel service role API 讀寫。
-- 前台不直接呼叫 Supabase，所以 RLS 可以保持嚴格。
drop policy if exists "profiles_self_read" on public.profiles;
create policy "profiles_self_read" on public.profiles for select using (auth.uid() = id);

-- 建立兩個推薦人範例
insert into public.pundits (nickname, avatar, bio, accuracy_30, accuracy_all)
values 
('林口兄弟', '🔥', '擅長棒球讓分盤與臨場盤口觀察。', 63, 59),
('水過仙人', '🌊', '偏向大小分與反市場方向，專看盤口過熱。', 58, 56)
on conflict do nothing;
