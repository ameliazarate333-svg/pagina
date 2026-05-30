-- ============================================================
--  AZ · Amelia Zárate — Tabla de FAVORITOS (wishlist)
--  Ejecutar en Supabase → SQL Editor (después de schema.sql).
-- ============================================================

create table if not exists public.favorites (
  user_id      uuid not null references auth.users (id) on delete cascade,
  product_slug text not null,
  created_at   timestamptz default now(),
  primary key (user_id, product_slug)
);

alter table public.favorites enable row level security;

drop policy if exists "favoritos propios - all" on public.favorites;
create policy "favoritos propios - all" on public.favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
