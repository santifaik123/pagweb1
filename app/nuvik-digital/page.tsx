import { NuvikInfoPage } from "@/components/marketing/NuvikInfoPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

const faqs: Array<[string, string]> = [
  [
    "¿Qué es Nuvik Digital?",
    "Nuvik Digital es un estudio digital que desarrolla sitios web, software a medida, automatización de procesos e integración de inteligencia artificial para empresas.",
  ],
  [
    "¿Dónde trabaja Nuvik Digital?",
    "Nuvik Digital trabaja con empresas en Chile y LATAM mediante proyectos digitales diseñados para vender, operar y escalar.",
  ],
  [
    "¿Cuál es el contacto oficial de Nuvik Digital?",
    "El contacto oficial es contacto@nuvik.digital. Los perfiles públicos oficiales son Instagram y LinkedIn empresa de Nuvik Digital.",
  ],
];

export const metadata = pageMetadata({
  title: "Nuvik Digital | Qué es, servicios y contacto oficial",
  description:
    "Conoce Nuvik Digital, estudio digital especializado en diseño web, software a medida, automatización e inteligencia artificial para empresas en Chile y LATAM.",
  path: "/nuvik-digital",
});

export default function NuvikDigitalPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Nuvik Digital", path: "/nuvik-digital" },
        ])}
      />
      <NuvikInfoPage
        eyebrow="Entidad de marca"
        title="Nuvik Digital"
        asideTitle="NUVIK DIGITAL"
        asideBody="Estudio digital para empresas en Chile y LATAM."
        lead="Nuvik Digital es un estudio digital que desarrolla soluciones para vender, operar y escalar. La marca trabaja en diseño web, desarrollo de software a medida, automatización de procesos e integración de inteligencia artificial para empresas."
        sections={[
          {
            title: "Qué es Nuvik Digital",
            body: [
              "Nuvik Digital es una marca enfocada en crear productos, sitios y sistemas digitales con una base técnica clara, diseño preciso y orientación comercial.",
              "La propuesta combina estrategia, experiencia de usuario y desarrollo para que cada solución pueda explicar, vender, operar o automatizar una parte concreta del negocio.",
            ],
          },
          {
            title: "Qué hace Nuvik Digital",
            body: [
              "Nuvik Digital diseña y desarrolla sitios web, landing pages, software a medida, dashboards, integraciones, automatizaciones, agentes de inteligencia artificial y experiencias digitales para empresas.",
              "Cada proyecto parte de un objetivo de negocio y se traduce en arquitectura, interfaz, contenido, código y medición.",
            ],
            links: [
              { label: "Ver servicios", href: "/servicios" },
              { label: "Ver portafolio", href: "/portafolio" },
            ],
          },
          {
            title: "Servicios principales",
            body: [
              "Las áreas principales son diseño web, desarrollo web, software a medida, automatización de procesos, inteligencia artificial para empresas, chatbots, e-commerce, dashboards, integraciones, SEO técnico y mantenimiento web.",
            ],
            links: [
              { label: "Software a medida", href: "/servicios/software-a-medida" },
              { label: "Automatización", href: "/servicios/automatizacion" },
              { label: "Web corporativa", href: "/servicios/web-corporativa" },
              { label: "Agentes IA", href: "/servicios/agentes-ia" },
            ],
          },
          {
            title: "Sitio y contacto oficial",
            body: [
              "El sitio oficial es nuvik.digital. Para cotizar proyectos o solicitar información comercial, el correo oficial es contacto@nuvik.digital.",
            ],
            links: [
              { label: "Contactar", href: "/contacto" },
              { label: "Instagram oficial", href: "https://www.instagram.com/nuvikdigital/", external: true },
              { label: "LinkedIn empresa", href: "https://cl.linkedin.com/company/nuvikdigital", external: true },
            ],
          },
          {
            title: "Preguntas frecuentes",
            body: faqs.map(([question, answer]) => `${question} ${answer}`),
          },
        ]}
        contactContext="Nuvik Digital"
        showContactCta
      />
    </>
  );
}
