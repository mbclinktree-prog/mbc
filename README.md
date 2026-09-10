# MBC · Linktree + Admin

Página pública tipo Linktree (`index.html`) + panel de administración con login
(`admin.html`) para editar perfil, redes y botones, y ver métricas de visitas y
clicks. Se hostea como sitio estático (GitHub Pages) y usa **Supabase** para
auth, base de datos y almacenamiento de imágenes.

```
index.html          página pública (dinámica: lee la config y registra métricas)
admin.html          panel de administración (login + editor + métricas)
config.js           URL y anon key de tu proyecto Supabase   ← hay que completarlo
defaults.js         contenido por defecto / fallback
mbc.js              cliente Supabase + helpers compartidos
supabase-setup.sql  esquema, políticas RLS, bucket y semilla
assets/             avatar.jpg, festival.png
```

## Puesta en marcha (una vez)

### 1. Crear el proyecto en Supabase
- Entrá a <https://supabase.com> → **New project** (plan Free alcanza).
- Elegí una contraseña de base de datos y una región cercana.

### 2. Crear las tablas y políticas
- En el proyecto: **SQL Editor → New query**.
- Pegá todo el contenido de `supabase-setup.sql` y **Run**.
- Esto crea las tablas `site_config` y `events`, las políticas de seguridad
  (RLS), el bucket público `assets` y una fila de contenido inicial.

### 3. Crear tu usuario de admin
- **Authentication → Sign In / Providers → Email**: dejalo habilitado.
- **Authentication → Sign In / Providers →** *desactivá* **"Allow new users to
  sign up"**. Así nadie puede registrarse solo; sólo entran los usuarios que
  crees a mano.
- **Authentication → Users → Add user → Create new user**: poné tu email y una
  contraseña. Marcá "Auto Confirm User". Ese es tu login del panel.

### 4. Conectar la página con Supabase
- **Project Settings → API**. Copiá:
  - **Project URL** (ej. `https://abcd1234.supabase.co`)
  - **anon public** key
- Pegalos en `config.js`:
  ```js
  window.MBC_CONFIG = {
    SUPABASE_URL: "https://abcd1234.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOi..."
  };
  ```
  > La anon key es pública por diseño (va en el HTML del sitio). Lo que protege
  > los datos son las políticas RLS del paso 2: cualquiera puede leer la config
  > y registrar un click/visita, pero **sólo tu usuario logueado puede editar el
  > contenido o leer las métricas**.

### 5. Publicar
- Commit + push del repo. Con GitHub Pages activo:
  - Página pública: `https://<usuario>.github.io/<repo>/`
  - Panel: `https://<usuario>.github.io/<repo>/admin.html`

## Uso del panel

- **Contenido**
  - *Perfil*: nombre y foto (subís un archivo o pegás una URL).
  - *Redes*: filas tipo + URL. Tipos: instagram, web, facebook, tiktok,
    whatsapp, x, youtube.
  - *Botones*: texto, URL, tipo (link normal o PDF en modal), subtítulo
    opcional, miniatura opcional, y check de "visible". Se reordenan con ↑/↓.
  - **Guardar cambios** escribe en Supabase; la página pública toma la nueva
    versión al recargar.
- **Métricas**
  - Visitas y clicks por rango (7 / 30 / 90 días / todo).
  - Gráfico de visitas por día.
  - Tabla de clicks por botón con porcentaje.

## Notas

- Si `config.js` todavía tiene los valores `TU-PROYECTO` / `TU-ANON-KEY`, la
  página pública funciona igual con el contenido de `defaults.js`, pero sin
  métricas y sin login en el admin.
- Las imágenes subidas desde el panel van al bucket `assets` de Supabase Storage
  y quedan referenciadas por URL absoluta. Las imágenes semilla (`assets/*`)
  viven en el repo.
- Volumen esperado bajo: las métricas se agregan en el navegador. Si algún día
  el tráfico crece mucho, conviene mover la agregación a una vista o función SQL.
