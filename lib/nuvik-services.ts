export type NuvikService = {
  slug: string;
  name: string;
  summary: string;
  category: "Automatización & software" | "Presencia digital";
  index: string;
  title: string;
  description: string;
  image: string;
  capabilities: Array<[string, string]>;
};

export const nuvikServices: NuvikService[] = [
  {
    slug: "software-a-medida",
    name: "Software a medida",
    summary: "Creamos sistemas adaptados a tu operación: paneles, flujos internos, herramientas de gestión e integraciones.",
    category: "Automatización & software",
    index: "01",
    title: "Software construido alrededor de tu operación.",
    description:
      "Diseñamos herramientas propias para centralizar procesos, datos y decisiones sin forzar a tu equipo a trabajar alrededor de un software genérico.",
    image: "/assets/sections/dar-io-showcase-2026-06-23.webp",
    capabilities: [
      ["Arquitectura", "Definimos módulos, permisos y flujos según la forma real en que trabaja tu negocio."],
      ["Operación", "Unificamos tareas críticas en una experiencia clara para cada rol del equipo."],
      ["Datos", "Convertimos información dispersa en registros confiables y accionables."],
      ["Evolución", "Construimos una base preparada para crecer con nuevas funciones e integraciones."],
    ],
  },
  {
    slug: "automatizacion",
    name: "Automatización",
    summary: "Reducimos tareas repetitivas conectando formularios, bases de datos, correos, CRM, WhatsApp y herramientas internas.",
    category: "Automatización & software",
    index: "02",
    title: "Procesos que avanzan sin depender de tareas repetitivas.",
    description:
      "Mapeamos cada paso, eliminamos fricción y conectamos acciones automáticas para que tu equipo se concentre en las decisiones que sí requieren criterio.",
    image: "/assets/sections/automations.webp",
    capabilities: [
      ["Disparadores", "Activamos flujos desde formularios, cambios de estado, pagos o eventos internos."],
      ["Reglas", "Aplicamos condiciones para que cada caso siga el recorrido correcto."],
      ["Acciones", "Coordinamos mensajes, registros, alertas y tareas entre distintas herramientas."],
      ["Monitoreo", "Registramos ejecuciones y excepciones para mantener el proceso bajo control."],
    ],
  },
  {
    slug: "integraciones",
    name: "Integraciones",
    summary: "Conectamos las plataformas que ya usas para que la información fluya sin copiar y pegar datos manualmente.",
    category: "Automatización & software",
    index: "03",
    title: "Tus herramientas trabajando como un solo sistema.",
    description:
      "Conectamos plataformas comerciales, operativas y administrativas para reducir duplicación, errores y pérdida de contexto entre equipos.",
    image: "/assets/sections/interoperability.webp",
    capabilities: [
      ["APIs", "Integramos servicios modernos mediante conexiones estables y documentadas."],
      ["Sincronización", "Mantenemos clientes, estados y operaciones actualizados entre plataformas."],
      ["Validación", "Controlamos formatos, duplicados y excepciones antes de mover información."],
      ["Trazabilidad", "Dejamos registro de cada intercambio para diagnosticar y mejorar el sistema."],
    ],
  },
  {
    slug: "dashboards",
    name: "Dashboards",
    summary: "Transformamos datos dispersos en paneles claros para tomar decisiones comerciales, operativas y financieras.",
    category: "Automatización & software",
    index: "04",
    title: "Una lectura clara de lo que está pasando.",
    description:
      "Diseñamos paneles que reúnen indicadores operativos y comerciales para detectar cambios, priorizar acciones y decidir con información confiable.",
    image: "/assets/sections/dar-io-showcase-2026-06-23.webp",
    capabilities: [
      ["Indicadores", "Definimos métricas útiles para cada objetivo y nivel de decisión."],
      ["Visualización", "Jerarquizamos datos complejos para que se entiendan en segundos."],
      ["Filtros", "Permitimos explorar periodos, áreas, clientes y estados sin perder contexto."],
      ["Alertas", "Destacamos variaciones importantes antes de que se conviertan en problemas."],
    ],
  },
  {
    slug: "agentes-ia",
    name: "Agentes IA",
    summary: "Implementamos inteligencia artificial en atención, procesos internos y flujos comerciales donde realmente aporta valor.",
    category: "Automatización & software",
    index: "05",
    title: "Inteligencia aplicada a conversaciones y tareas reales.",
    description:
      "Creamos agentes conectados con el contexto de tu negocio para responder, clasificar, registrar información y activar procesos con supervisión.",
    image: "/assets/sections/nexus-chatbot-showcase-2026-06-23.webp",
    capabilities: [
      ["Contexto", "Organizamos conocimiento y reglas para respuestas coherentes con tu negocio."],
      ["Conversación", "Diseñamos interacciones útiles, directas y alineadas con cada canal."],
      ["Acciones", "Permitimos que el agente consulte datos y ejecute tareas autorizadas."],
      ["Control", "Definimos límites, registros y escalamiento humano para casos sensibles."],
    ],
  },
  {
    slug: "apps-internas",
    name: "Apps internas",
    summary: "Construimos herramientas simples para equipos que necesitan operar más rápido sin depender de planillas eternas.",
    category: "Automatización & software",
    index: "06",
    title: "Herramientas internas que reducen fricción diaria.",
    description:
      "Construimos aplicaciones enfocadas en una operación específica, con interfaces claras, permisos precisos y acceso rápido a la información necesaria.",
    image: "/assets/sections/sites.webp",
    capabilities: [
      ["Flujos", "Transformamos procedimientos dispersos en recorridos simples y consistentes."],
      ["Roles", "Mostramos a cada persona solo las acciones y datos que necesita."],
      ["Colaboración", "Centralizamos estados, comentarios y responsables en un mismo lugar."],
      ["Acceso", "Diseñamos experiencias responsive para escritorio, tablet y móvil."],
    ],
  },
  {
    slug: "web-corporativa",
    name: "Web corporativa",
    summary: "Credibilidad digital desde el primer segundo.",
    category: "Presencia digital",
    index: "01",
    title: "Una web que explica, posiciona y convierte.",
    description:
      "Construimos sitios corporativos con una narrativa precisa, una identidad sólida y una arquitectura preparada para transformar visitas en oportunidades.",
    image: "/assets/sections/sites.webp",
    capabilities: [
      ["Estrategia", "Ordenamos oferta, audiencias y objetivos antes de diseñar la interfaz."],
      ["Narrativa", "Convertimos información compleja en mensajes claros y memorables."],
      ["Diseño", "Creamos un sistema visual propio, coherente y adaptable a cada sección."],
      ["Desarrollo", "Entregamos una experiencia rápida, responsive y fácil de mantener."],
    ],
  },
  {
    slug: "landing-pages",
    name: "Landing pages",
    summary: "Una narrativa enfocada en una sola conversión.",
    category: "Presencia digital",
    index: "02",
    title: "Una página, un objetivo, un recorrido claro.",
    description:
      "Diseñamos landing pages que conectan el problema, la propuesta y la acción sin distracciones, con una estructura preparada para campañas y validación.",
    image: "/assets/sections/sites.webp",
    capabilities: [
      ["Oferta", "Definimos una promesa concreta y relevante para la audiencia."],
      ["Jerarquía", "Ordenamos argumentos y prueba para sostener la decisión."],
      ["Conversión", "Diseñamos formularios y llamados a la acción sin fricción."],
      ["Medición", "Preparamos eventos clave para analizar y mejorar el rendimiento."],
    ],
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    summary: "Catálogo y compra pensados para vender más.",
    category: "Presencia digital",
    index: "03",
    title: "Una experiencia de compra rápida y confiable.",
    description:
      "Diseñamos tiendas que facilitan descubrir, comparar y comprar, manteniendo una identidad sólida y una operación preparada para crecer.",
    image: "/assets/sections/sites.webp",
    capabilities: [
      ["Catálogo", "Organizamos categorías, filtros y fichas para encontrar productos con rapidez."],
      ["Compra", "Reducimos pasos y dudas en carrito, pago y confirmación."],
      ["Contenido", "Integramos fotografía, argumentos y especificaciones con jerarquía clara."],
      ["Operación", "Conectamos inventario, pagos y seguimiento cuando el proyecto lo requiere."],
    ],
  },
  {
    slug: "rediseno-web",
    name: "Rediseño web",
    summary: "Una experiencia actual, rápida y coherente.",
    category: "Presencia digital",
    index: "04",
    title: "Replanteamos lo que ya existe para que vuelva a funcionar.",
    description:
      "Auditamos contenido, navegación, identidad y rendimiento para conservar lo valioso y reconstruir lo que está frenando la experiencia.",
    image: "/assets/sections/sites.webp",
    capabilities: [
      ["Auditoría", "Detectamos fricción visual, técnica y narrativa en el sitio actual."],
      ["Arquitectura", "Simplificamos recorridos y reorganizamos el contenido por prioridad."],
      ["Sistema visual", "Actualizamos tipografía, componentes y comportamiento responsive."],
      ["Migración", "Planificamos el cambio para preservar contenido, URLs y continuidad."],
    ],
  },
  {
    slug: "marca-personal",
    name: "Identidad digital",
    summary: "Posicionamiento, narrativa y presencia web para comunicar experiencia con claridad.",
    category: "Presencia digital",
    index: "05",
    title: "Identidad digital para comunicar con criterio.",
    description:
      "Ordenamos posicionamiento, narrativa, diseño y presencia web para transformar experiencia en una propuesta clara, creíble y fácil de contactar.",
    image: "/assets/sections/sites.webp",
    capabilities: [
      ["Posicionamiento", "Definimos una idea central que organiza experiencia, oferta y audiencia."],
      ["Identidad", "Creamos un lenguaje visual consistente sin caer en fórmulas genéricas."],
      ["Contenido", "Diseñamos una estructura preparada para casos, ideas y credenciales."],
      ["Contacto", "Facilitamos que la audiencia correcta entienda cómo iniciar una conversación."],
    ],
  },
  {
    slug: "seo-mantenimiento",
    name: "SEO + mantenimiento",
    summary: "Rendimiento técnico y evolución continua.",
    category: "Presencia digital",
    index: "06",
    title: "Una web preparada para encontrarse y mantenerse vigente.",
    description:
      "Mejoramos la base técnica, la estructura de contenidos y el rendimiento, y acompañamos la evolución del sitio después de su publicación.",
    image: "/assets/sections/interoperability.webp",
    capabilities: [
      ["SEO técnico", "Revisamos indexación, estructura, metadatos y señales esenciales."],
      ["Rendimiento", "Optimizamos carga, imágenes y comportamiento en distintos dispositivos."],
      ["Contenido", "Organizamos páginas y enlaces para mejorar comprensión y relevancia."],
      ["Mantenimiento", "Aplicamos mejoras, actualizaciones y controles de forma continua."],
    ],
  },
];

export const serviceGroups = {
  presencia: nuvikServices.filter((service) => service.category === "Presencia digital"),
  software: nuvikServices.filter((service) => service.category === "Automatización & software"),
};

export function getNuvikService(slug: string) {
  return nuvikServices.find((service) => service.slug === slug);
}
