# AZ · Amelia Zárate — Sitio web

Atelier de alta costura y confección a medida. Sitio web + área privada de clientas
(registro, login, medidas guardadas, pedidos con seguimiento y citas).

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Base de datos + login:** Supabase (PostgreSQL + Auth, con RLS)
- **Diseño:** CSS propio, estética *Quiet Luxury*
- **Despliegue:** Vercel
- **Dominio:** azameliazarate.com (DNS en HostGator → Vercel)

---

## 1. Requisitos

- [Node.js](https://nodejs.org) 18+ (probado con 22)
- Una cuenta de [Supabase](https://supabase.com) (gratis)
- Una cuenta de [Vercel](https://vercel.com) (gratis)

## 2. Configurar Supabase

1. Crea un proyecto nuevo en Supabase.
2. Ve a **SQL Editor → New query**, pega el contenido de [`supabase/schema.sql`](supabase/schema.sql) y pulsa **Run**.
   Esto crea las tablas (perfiles, medidas, pedidos, citas), la seguridad por fila (RLS)
   y el alta automática de perfil al registrarse.
3. Ve a **Project Settings → API** y copia:
   - **Project URL**
   - **anon public key**
4. (Para probar sin confirmar correos) **Authentication → Sign In / Providers → Email**:
   desactiva temporalmente *"Confirm email"*. Así el registro entra directo a la cuenta.
   En producción se recomienda dejarlo activado.

## 3. Variables de entorno

Copia el archivo de ejemplo y rellena tus valores:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

> ⚠️ Nunca subas `.env.local` a GitHub (ya está en `.gitignore`).

## 4. Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

- `/` — sitio público
- `/login` — registro e inicio de sesión
- `/cuenta` — área privada (requiere sesión)

## 5. Subir a GitHub y desplegar en Vercel

1. Crea un repositorio vacío en GitHub.
2. Conecta este proyecto y haz push:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git branch -M main
   git push -u origin main
   ```
3. En **Vercel → Add New → Project**, importa el repo.
4. En la configuración del proyecto, añade las **Environment Variables**
   (`NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
5. Deploy. Cada `git push` vuelve a publicar automáticamente.
6. **Dominio:** en Vercel → Settings → Domains añade `azameliazarate.com`
   y en HostGator crea los registros DNS que Vercel indique
   (registro `A` → `76.76.21.21` y `CNAME` `www` → `cname.vercel-dns.com`).

---

## Estructura

```
src/
  app/
    page.tsx          → landing (sitio público)
    login/page.tsx    → registro / inicio de sesión
    cuenta/page.tsx   → área privada (protegida por middleware)
    globals.css       → sistema de diseño (landing)
    account.css       → estilos del área privada (.acct)
    layout.tsx        → fuentes + metadatos
  components/
    SiteHeader / SiteFooter / LandingFx   → landing
    LoginForm         → auth con Supabase
    Dashboard         → panel de la clienta (medidas, pedidos, citas, perfil)
  lib/
    supabase/         → clientes browser/server + middleware
    measures.ts       → definición de medidas y estados de pedido
supabase/schema.sql   → base de datos + RLS (ejecutar en Supabase)
public/               → logos SVG
prototipo/            → prototipo HTML original (referencia, no se usa en producción)
Logo/                 → logo en .ai / .pdf / .png
```

## Notas

- El **panel de administración de Amelia** (ver clientas, crear/avanzar pedidos)
  es el siguiente módulo a construir.
- Los **pedidos** se crean del lado del atelier; una clienta nueva verá su lista vacía
  hasta que se le registre un encargo.
- "Eliminar mis datos" borra medidas, pedidos y citas de la clienta (Habeas Data,
  Ley 1581 de 2012). El borrado completo de la cuenta de acceso se hará desde el panel
  de administración con permisos de servidor.
