-- ============================================================
--  AZ · Amelia Zárate — Esquema de base de datos (Supabase)
--  Cómo usar:  Supabase → SQL Editor → New query → pega esto → Run
--  Crea las tablas, la seguridad (RLS) y el alta automática de perfil.
-- ============================================================

-- ---------- PERFILES ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  phone       text,
  consent     boolean default false,
  created_at  timestamptz default now()
);

-- ---------- MEDIDAS (una fila por clienta, datos en JSON) ----------
create table if not exists public.measurements (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  data        jsonb default '{}'::jsonb,
  updated_at  timestamptz default now()
);

-- ---------- PEDIDOS ----------
create table if not exists public.orders (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  name        text not null,
  status      int  default 0,   -- 0..5 (ver estados en la app)
  created_at  timestamptz default now()
);

-- ---------- CITAS ----------
create table if not exists public.appointments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  type        text,
  mode        text,
  date        date,
  "time"      time,
  created_at  timestamptz default now()
);

-- ============================================================
--  SEGURIDAD A NIVEL DE FILA (RLS)
--  Cada usuaria solo puede ver/editar SUS propios datos.
-- ============================================================
alter table public.profiles     enable row level security;
alter table public.measurements enable row level security;
alter table public.orders       enable row level security;
alter table public.appointments enable row level security;

-- PROFILES
drop policy if exists "perfil propio - select" on public.profiles;
create policy "perfil propio - select" on public.profiles
  for select using (auth.uid() = id);
drop policy if exists "perfil propio - update" on public.profiles;
create policy "perfil propio - update" on public.profiles
  for update using (auth.uid() = id);
drop policy if exists "perfil propio - insert" on public.profiles;
create policy "perfil propio - insert" on public.profiles
  for insert with check (auth.uid() = id);

-- MEASUREMENTS
drop policy if exists "medidas propias - all" on public.measurements;
create policy "medidas propias - all" on public.measurements
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ORDERS
drop policy if exists "pedidos propios - select" on public.orders;
create policy "pedidos propios - select" on public.orders
  for select using (auth.uid() = user_id);
drop policy if exists "pedidos propios - insert" on public.orders;
create policy "pedidos propios - insert" on public.orders
  for insert with check (auth.uid() = user_id);
drop policy if exists "pedidos propios - delete" on public.orders;
create policy "pedidos propios - delete" on public.orders
  for delete using (auth.uid() = user_id);

-- APPOINTMENTS
drop policy if exists "citas propias - all" on public.appointments;
create policy "citas propias - all" on public.appointments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
--  ALTA AUTOMÁTICA: al registrarse una usuaria, se crean
--  su perfil y su fila de medidas vacía.
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, consent)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone',
    coalesce((new.raw_user_meta_data ->> 'consent')::boolean, false)
  );
  insert into public.measurements (user_id) values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
