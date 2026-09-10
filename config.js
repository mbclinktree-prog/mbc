// ── Configuración de Supabase ──────────────────────────────────────────────
// La "anon key" es pública por diseño (va en el HTML). La seguridad la dan
// las políticas RLS definidas en supabase-setup.sql: cualquiera puede leer la
// config y registrar un click/visita, pero sólo un usuario logueado puede
// editar el contenido o leer las métricas.

window.MBC_CONFIG = {
  SUPABASE_URL: "https://xctqnnodfjscnijypner.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjdHFubm9kZmpzY25panlwbmVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwNDgwMzcsImV4cCI6MjEwNDYyNDAzN30.DnyeYBZ3F5a9oASz5QNlqZXscAWzmxzSPwxFxFGK3b8"
};
