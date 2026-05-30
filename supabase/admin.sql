-- ============================================================
--  AZ · Amelia Zárate — Acceso de ADMINISTRADORA (Amelia)
--  Ejecutar en Supabase → SQL Editor DESPUÉS de schema.sql.
--  Permite que la cuenta de Amelia vea/gestione TODAS las clientas,
--  manteniendo el RLS intacto para las clientas normales.
-- ============================================================

-- 1) Campos nuevos en profiles
alter table public.profiles add column if not exists is_admin boolean default false;
alter table public.profiles add column if not exists email   text;

-- 2) Guardar también el correo al registrarse (actualiza el trigger)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, email, consent)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone',
    new.email,
    coalesce((new.raw_user_meta_data ->> 'consent')::boolean, false)
  );
  insert into public.measurements (user_id) values (new.id);
  return new;
end;
$$;

-- 3) Rellenar el correo de las clientas que ya existían
update public.profiles p
set email = u.email
from auth.users u
where u.id = p.id and p.email is null;

-- 4) Helper: ¿el usuario actual es admin?  (security definer = sin recursión de RLS)
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- 5) Políticas para la admin (se SUMAN a las de cada clienta; PostgREST las combina con OR)
drop policy if exists "admin ve perfiles" on public.profiles;
create policy "admin ve perfiles" on public.profiles
  for select using (public.is_admin());

drop policy if exists "admin ve medidas" on public.measurements;
create policy "admin ve medidas" on public.measurements
  for select using (public.is_admin());

drop policy if exists "admin gestiona pedidos" on public.orders;
create policy "admin gestiona pedidos" on public.orders
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin ve citas" on public.appointments;
create policy "admin ve citas" on public.appointments
  for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================
--  6) ÚLTIMO PASO (hazlo tú):  marca tu cuenta como administradora.
--     Regístrate primero en la web, y luego ejecuta esta línea
--     cambiando el correo por el TUYO:
--
--     update public.profiles set is_admin = true
--     where email = 'tu-correo@gmail.com';
-- ============================================================
