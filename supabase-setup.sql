-- ============================================================================
--  MBC Linktree · esquema de Supabase
--  Ejecutar una sola vez: Supabase → SQL Editor → New query → pegar → Run.
-- ============================================================================

-- ---------- 1. Tablas -------------------------------------------------------

create table if not exists public.site_config (
  id          text primary key default 'main',
  profile     jsonb not null default '{}'::jsonb,   -- { name, avatar_url }
  socials     jsonb not null default '[]'::jsonb,   -- [{ type, url }]
  links       jsonb not null default '[]'::jsonb,   -- [{ id,label,url,kind,thumb_url,sublabel,enabled }]
  updated_at  timestamptz not null default now()
);

create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('view','click')),
  link_id     text,
  link_label  text,
  referrer    text,
  ua          text,
  created_at  timestamptz not null default now()
);

create index if not exists events_created_at_idx on public.events (created_at);
create index if not exists events_type_idx        on public.events (type);

-- ---------- 2. Permisos base (roles anónimo / autenticado) ----------------

grant select                 on public.site_config to anon;
grant select, insert, update on public.site_config to authenticated;
grant insert                 on public.events      to anon;
grant select, insert         on public.events      to authenticated;

-- ---------- 3. Row Level Security ----------------------------------------

alter table public.site_config enable row level security;
alter table public.events      enable row level security;

-- site_config: lectura pública, escritura sólo logueado (el admin)
drop policy if exists "config_public_read"  on public.site_config;
drop policy if exists "config_admin_write"  on public.site_config;
drop policy if exists "config_admin_update" on public.site_config;

create policy "config_public_read"  on public.site_config
  for select to anon, authenticated using (true);
create policy "config_admin_write"  on public.site_config
  for insert to authenticated with check (true);
create policy "config_admin_update" on public.site_config
  for update to authenticated using (true) with check (true);

-- events: cualquiera puede registrar (view/click), sólo el admin puede leer
drop policy if exists "events_anon_insert" on public.events;
drop policy if exists "events_admin_read"  on public.events;

create policy "events_anon_insert" on public.events
  for insert to anon, authenticated with check (type in ('view','click'));
create policy "events_admin_read"  on public.events
  for select to authenticated using (true);

-- ---------- 4. Storage: bucket público para imágenes --------------------

insert into storage.buckets (id, name, public)
values ('assets', 'assets', true)
on conflict (id) do update set public = true;

drop policy if exists "assets_public_read"   on storage.objects;
drop policy if exists "assets_admin_insert"  on storage.objects;
drop policy if exists "assets_admin_update"  on storage.objects;
drop policy if exists "assets_admin_delete"  on storage.objects;

create policy "assets_public_read"  on storage.objects
  for select to anon, authenticated using (bucket_id = 'assets');
create policy "assets_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'assets');
create policy "assets_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'assets') with check (bucket_id = 'assets');
create policy "assets_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'assets');

-- ---------- 5. Semilla de contenido -----------------------------------

insert into public.site_config (id, profile, socials, links)
values (
  'main',
  '{"name":"Montevideo Beer Company","avatar_url":"assets/avatar.jpg"}'::jsonb,
  '[{"type":"instagram","url":"https://www.instagram.com/montevideobeercompany/"},
    {"type":"web","url":"https://www.montevideobeercompany.com"}]'::jsonb,
  '[
    {"id":"festival","label":"Festival Sudestada – Powered by MBC 11/9 | RedTickets","url":"https://redtickets.uy/evento/Festival-Sudestada--Powered-by-MBC-119/32450","kind":"link","thumb_url":"assets/festival.png","sublabel":"","enabled":true},
    {"id":"reserva","label":"🛎️ Reservá tu mesa","url":"https://go.meitre.com/mbc","kind":"link","thumb_url":"","sublabel":"","enabled":true},
    {"id":"menu","label":"Menú 🍔🍻","url":"https://ugc.production.linktr.ee/bfe1b6fc-c120-4d0d-9cae-b982e5cc7263_MBC-Carta-A4-comida-y-bebida-2025.pdf","kind":"pdf","thumb_url":"","sublabel":"PDF · 2 pages","enabled":true},
    {"id":"horarios","label":"🕑 Horarios","url":"https://drive.google.com/file/d/1RPtHabmTkWYQ739dbRPEobyUjzp2SZrd/view?usp=sharing","kind":"link","thumb_url":"","sublabel":"","enabled":true},
    {"id":"ombu","label":"📦 Delivery OMBÚ | PedidosYa","url":"https://www.pedidosya.com.uy/restaurantes/montevideo/mbc-ombu-burgers-beer-6fb8b5c8-5b7d-41e8-97c8-c5c361b07ffb-menu?search=ombu","kind":"link","thumb_url":"","sublabel":"","enabled":true},
    {"id":"punta","label":"📦 Delivery PUNTA CARRETAS | PedidosYa","url":"https://www.pedidosya.com.uy/restaurantes/montevideo/mbc-punta-carretas-burgers-beer-aa41a3e8-cad4-471a-ba84-b180967ae08a-menu?search=MBC","kind":"link","thumb_url":"","sublabel":"","enabled":true},
    {"id":"nuevocentro","label":"📦 Delivery NUEVOCENTRO | PedidosYa","url":"https://www.pedidosya.com.uy/restaurantes/montevideo/mbc-nuevocentro-4bfa0ebc-8f7b-4b40-a578-8ced646effa4-menu?search=NUEVOCENTRO%20MBC","kind":"link","thumb_url":"","sublabel":"","enabled":true}
  ]'::jsonb
)
on conflict (id) do nothing;
