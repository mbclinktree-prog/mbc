// Utilidades compartidas entre index.html y admin.html.
window.MBC = (function () {
  const cfg = window.MBC_CONFIG || {};
  const configured =
    !!cfg.SUPABASE_URL &&
    !!cfg.SUPABASE_ANON_KEY &&
    !cfg.SUPABASE_URL.includes("TU-PROYECTO") &&
    !cfg.SUPABASE_ANON_KEY.includes("TU-ANON-KEY");

  let sb = null;
  if (configured && window.supabase) {
    sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  }

  // Íconos de redes sociales (SVG path del viewBox 0 0 24 24).
  const ICONS = {
    instagram:
      "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.18.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.18.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.18-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.18-.21-.55-.47-.94-.88-1.35-.41-.41-.8-.67-1.35-.88-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.42 5.42 0 110 10.84 5.42 5.42 0 010-10.84zm0 1.62a3.8 3.8 0 100 7.6 3.8 3.8 0 000-7.6zm5.6-.94a1.27 1.27 0 110 2.53 1.27 1.27 0 010-2.53z",
    web:
      "M12 2a10 10 0 100 20 10 10 0 000-20zm6.93 6h-2.95a15.7 15.7 0 00-1.38-3.56A8.03 8.03 0 0118.93 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14a7.96 7.96 0 010-4h3.38a16.6 16.6 0 000 4H4.26zm.81 2h2.95c.32 1.25.78 2.45 1.38 3.56A8.03 8.03 0 015.07 16zm2.95-8H5.07a8.03 8.03 0 014.33-3.56A15.7 15.7 0 008.02 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66a14.9 14.9 0 010-4h4.68a14.9 14.9 0 010 4zm.26 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14a16.6 16.6 0 000-4h3.38a7.96 7.96 0 010 4h-3.38z",
    facebook:
      "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.3-.04-1.3-.13-2.47-.13-2.45 0-4.13 1.5-4.13 4.24v2.37H7.6V13h2.8v8h3.1z",
    tiktok:
      "M16.5 3c.3 2.03 1.46 3.53 3.5 3.86v2.6c-1.2.12-2.26-.24-3.5-.94v6.1c0 4.02-3.4 6.53-6.9 5.26A5.4 5.4 0 016 12.9c1.02-1.9 3.14-2.9 5.2-2.6v2.85c-.4-.13-.83-.16-1.24-.08-1.6.32-2.35 2.13-1.4 3.44.94 1.32 3.05 1 3.55-.55.1-.32.14-.66.14-1V3h4.65z",
    whatsapp:
      "M12 2a10 10 0 00-8.6 15.1L2 22l5.05-1.32A10 10 0 1012 2zm0 1.9a8.1 8.1 0 016.9 12.4l-.2.32.86 3.13-3.2-.84-.3.18A8.1 8.1 0 1112 3.9zm-3.6 3.5c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.77 2.83 4.38 3.85 2.17.85 2.61.68 3.08.64.47-.04 1.52-.62 1.73-1.22.21-.6.21-1.12.15-1.22-.06-.11-.23-.17-.48-.3-.25-.13-1.52-.75-1.75-.83-.23-.09-.4-.13-.57.12-.17.25-.65.83-.8 1-.14.16-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.38.11-.51.11-.11.25-.29.38-.44.12-.14.16-.25.24-.42.08-.17.04-.31-.02-.44-.06-.13-.55-1.4-.77-1.9-.19-.44-.39-.44-.55-.44l-.5-.02z",
    x:
      "M17.53 3H20l-6.56 7.5L21 21h-5.9l-4.63-6.05L4.9 21H2.4l7.03-8.03L3 3h6.06l4.18 5.52L17.53 3zm-1.03 16h1.5L7.6 4.5H6l10.5 14.5z",
    youtube:
      "M23 12s0-3.3-.42-4.88a2.56 2.56 0 00-1.8-1.8C19.2 5 12 5 12 5s-7.2 0-8.78.32a2.56 2.56 0 00-1.8 1.8C1 8.7 1 12 1 12s0 3.3.42 4.88c.23.86.9 1.53 1.8 1.76C4.8 19 12 19 12 19s7.2 0 8.78-.32a2.56 2.56 0 001.8-1.8C23 15.3 23 12 23 12zm-13 3.5v-7l6 3.5-6 3.5z"
  };

  function socialSvg(type) {
    const p = ICONS[type] || ICONS.web;
    return '<svg viewBox="0 0 24 24"><path d="' + p + '"></path></svg>';
  }

  function normalize(raw) {
    const d = window.MBC_DEFAULTS;
    const c = raw && typeof raw === "object" ? raw : {};
    return {
      profile: Object.assign({}, d.profile, c.profile || {}),
      socials: Array.isArray(c.socials) ? c.socials : d.socials.slice(),
      links: Array.isArray(c.links) ? c.links : d.links.slice()
    };
  }

  async function loadConfig() {
    if (!sb) return normalize(null);
    try {
      const { data, error } = await sb
        .from("site_config")
        .select("profile, socials, links")
        .eq("id", "main")
        .maybeSingle();
      if (error) throw error;
      return normalize(data);
    } catch (e) {
      console.warn("MBC: no se pudo leer la config de Supabase, uso defaults.", e);
      return normalize(null);
    }
  }

  function logEvent(type, link) {
    if (!sb) return;
    const row = {
      type: type,
      link_id: link ? link.id : null,
      link_label: link ? link.label : null,
      referrer: document.referrer || null,
      ua: navigator.userAgent.slice(0, 300)
    };
    try {
      sb.from("events").insert(row).then(function () {}, function () {});
    } catch (e) {
      /* silencioso: nunca romper la navegación por analítica */
    }
  }

  return {
    sb: sb,
    configured: configured,
    socialSvg: socialSvg,
    normalize: normalize,
    loadConfig: loadConfig,
    logEvent: logEvent
  };
})();
