-- ============================================================
--  AZ · Amelia Zárate — Catálogo gestionable (tabla products)
--  Ejecutar en Supabase → SQL Editor (después de schema.sql y admin.sql).
-- ============================================================

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  category    text,
  price_cop   integer not null default 0,
  fabric      text,
  sizes       text[] default '{}',
  description text,
  image_url   text,
  available   boolean default true,
  sort        int default 0,
  created_at  timestamptz default now()
);

alter table public.products enable row level security;

-- Público: puede leer el catálogo (la UI muestra disponible/agotado).
drop policy if exists "productos lectura pública" on public.products;
create policy "productos lectura pública" on public.products
  for select using (true);

-- Admin: gestiona todo.
drop policy if exists "admin gestiona productos" on public.products;
create policy "admin gestiona productos" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- Políticas de Storage para el bucket 'productos' ----------
drop policy if exists "productos storage lectura" on storage.objects;
create policy "productos storage lectura" on storage.objects
  for select using (bucket_id = 'productos');

drop policy if exists "productos storage admin insert" on storage.objects;
create policy "productos storage admin insert" on storage.objects
  for insert with check (bucket_id = 'productos' and public.is_admin());

drop policy if exists "productos storage admin update" on storage.objects;
create policy "productos storage admin update" on storage.objects
  for update using (bucket_id = 'productos' and public.is_admin());

drop policy if exists "productos storage admin delete" on storage.objects;
create policy "productos storage admin delete" on storage.objects
  for delete using (bucket_id = 'productos' and public.is_admin());

-- ---------- Semilla: los 8 vestidos actuales ----------
insert into public.products (slug, name, category, price_cop, fabric, sizes, description, image_url, available, sort) values
('vestido-lino','Vestido Lino','Día · Lino belga',320000,'100% lino belga','{XS,S,M,L,XL}','Un vestido de día de caída fluida en lino natural, fresco y elegante. Corte recto que favorece sin marcar, ideal para el calor con un acabado impecable.','https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=900&auto=format&fit=crop',true,1),
('tunica-hueso','Túnica Hueso','Cóctel · Seda',480000,'Seda lavada color hueso','{XS,S,M,L}','Túnica de seda con movimiento líquido y un tono hueso atemporal. Perfecta para un cóctel donde la elegancia se nota sin esfuerzo.','https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=900&auto=format&fit=crop',true,2),
('slip-greige','Slip Greige','Noche · Satén',540000,'Satén de viscosa greige','{XS,S,M,L}','Vestido slip de tiras finas y espalda fluida, en un greige sofisticado. La pieza de noche que define el lujo silencioso.','https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=900&auto=format&fit=crop',true,3),
('vestido-arena','Vestido Arena','Gala · Crepé',690000,'Crepé de alta caída','{XS,S,M,L,XL}','Vestido largo de gala en crepé color arena, con un drapeado que esculpe la silueta. Hecho para los momentos que se recuerdan.','https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=900&auto=format&fit=crop',true,4),
('camisero-taupe','Camisero Taupe','Día · Algodón',295000,'Algodón peinado taupe','{XS,S,M,L,XL}','Vestido camisero en algodón de tacto suave, versátil de día a tarde. Cinturón de la misma tela para marcar la cintura a tu gusto.','https://images.unsplash.com/photo-1623609163859-ca93c959b98a?q=80&w=900&auto=format&fit=crop',true,5),
('vestido-marfil','Vestido Marfil','Novia civil · Crepé',820000,'Crepé marfil','{XS,S,M,L}','Vestido midi en marfil, depurado y luminoso, pensado para la novia de boda civil que busca sobriedad con carácter.','https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=900&auto=format&fit=crop',true,6),
('vestido-sage','Vestido Sage','Cóctel · Lino mezcla',390000,'Mezcla de lino y viscosa, tono salvia','{XS,S,M,L}','Un verde salvia apagado en una mezcla fresca de lino. Silueta envolvente que cae con gracia, para una tarde de eventos.','https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=900&auto=format&fit=crop',true,7),
('vestido-noche-oxido','Vestido Óxido','Gala · Satén',750000,'Satén color óxido','{XS,S,M,L}','Vestido largo en satén color óxido cálido, con escote sereno y caída que abraza. Una declaración de elegancia para la noche.','https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=900&auto=format&fit=crop',true,8)
on conflict (slug) do nothing;
