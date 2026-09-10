// Contenido por defecto. Se usa como semilla inicial y como fallback si
// Supabase no responde. Una vez que guardás desde el admin, manda la versión
// de la base de datos.
window.MBC_DEFAULTS = {
  profile: {
    name: "Montevideo Beer Company",
    avatar_url: "assets/avatar.jpg"
  },
  socials: [
    { type: "instagram", url: "https://www.instagram.com/montevideobeercompany/" },
    { type: "web", url: "https://www.montevideobeercompany.com" }
  ],
  links: [
    {
      id: "festival",
      label: "Festival Sudestada – Powered by MBC 11/9 | RedTickets",
      url: "https://redtickets.uy/evento/Festival-Sudestada--Powered-by-MBC-119/32450",
      kind: "link",
      thumb_url: "assets/festival.png",
      sublabel: "",
      enabled: true
    },
    {
      id: "reserva",
      label: "🛎️ Reservá tu mesa",
      url: "https://go.meitre.com/mbc",
      kind: "link",
      thumb_url: "",
      sublabel: "",
      enabled: true
    },
    {
      id: "menu",
      label: "Menú 🍔🍻",
      url: "https://ugc.production.linktr.ee/bfe1b6fc-c120-4d0d-9cae-b982e5cc7263_MBC-Carta-A4-comida-y-bebida-2025.pdf",
      kind: "pdf",
      thumb_url: "",
      sublabel: "PDF · 2 pages",
      enabled: true
    },
    {
      id: "horarios",
      label: "🕑 Horarios",
      url: "https://drive.google.com/file/d/1RPtHabmTkWYQ739dbRPEobyUjzp2SZrd/view?usp=sharing",
      kind: "link",
      thumb_url: "",
      sublabel: "",
      enabled: true
    },
    {
      id: "ombu",
      label: "📦 Delivery OMBÚ | PedidosYa",
      url: "https://www.pedidosya.com.uy/restaurantes/montevideo/mbc-ombu-burgers-beer-6fb8b5c8-5b7d-41e8-97c8-c5c361b07ffb-menu?search=ombu",
      kind: "link",
      thumb_url: "",
      sublabel: "",
      enabled: true
    },
    {
      id: "punta",
      label: "📦 Delivery PUNTA CARRETAS | PedidosYa",
      url: "https://www.pedidosya.com.uy/restaurantes/montevideo/mbc-punta-carretas-burgers-beer-aa41a3e8-cad4-471a-ba84-b180967ae08a-menu?search=MBC",
      kind: "link",
      thumb_url: "",
      sublabel: "",
      enabled: true
    },
    {
      id: "nuevocentro",
      label: "📦 Delivery NUEVOCENTRO | PedidosYa",
      url: "https://www.pedidosya.com.uy/restaurantes/montevideo/mbc-nuevocentro-4bfa0ebc-8f7b-4b40-a578-8ced646effa4-menu?search=NUEVOCENTRO%20MBC",
      kind: "link",
      thumb_url: "",
      sublabel: "",
      enabled: true
    }
  ]
};
