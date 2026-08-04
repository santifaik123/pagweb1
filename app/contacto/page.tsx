import { NuvikInfoPage } from "@/components/marketing/NuvikInfoPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contactar a Nuvik Digital",
  description:
    "Contacta a Nuvik Digital para proyectos de diseño web, software a medida, automatización e inteligencia artificial para empresas.",
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: "/contacto" },
        ])}
      />
      <NuvikInfoPage
        eyebrow="Contacto"
        title="Contactar a Nuvik Digital"
        asideTitle="CONTACTO OFICIAL"
        asideBody="Proyectos web, software, automatización e inteligencia artificial."
        lead="Cuéntanos qué necesitas construir, automatizar o mejorar. Nuvik Digital trabaja en sitios web, software a medida, automatización de procesos e integración de inteligencia artificial para empresas."
        sections={[
          {
            title: "Correo oficial",
            body: [
              "El correo principal de contacto comercial es contacto@nuvik.digital. Úsalo para cotizaciones, consultas de alcance, propuestas y coordinación inicial.",
            ],
            links: [{ label: "Escribir a contacto@nuvik.digital", href: "mailto:contacto@nuvik.digital" }],
          },
          {
            title: "Qué puedes cotizar",
            body: [
              "Puedes consultar por diseño web, desarrollo web, software a medida, dashboards, automatización de procesos, integraciones, agentes de inteligencia artificial, chatbots, e-commerce, landing pages, SEO técnico y mantenimiento web.",
            ],
            links: [
              { label: "Servicios", href: "/servicios" },
              { label: "Portafolio", href: "/portafolio" },
            ],
          },
          {
            title: "Redes oficiales",
            body: [
              "Nuvik Digital usa sus perfiles oficiales para comunicación de marca, novedades y presencia pública. No se usan perfiles personales como canales oficiales de SEO.",
            ],
            links: [
              { label: "Instagram", href: "https://www.instagram.com/nuvikdigital/", external: true },
              { label: "LinkedIn empresa", href: "https://cl.linkedin.com/company/nuvikdigital", external: true },
            ],
          },
          {
            title: "Formulario de cotización",
            body: [
              "El botón de cotización abre el panel de solicitud del sitio. Si todavía no hay integración de backend activa, el canal formal de cierre y seguimiento es contacto@nuvik.digital.",
            ],
          },
        ]}
        contactContext="un proyecto digital"
        showContactCta
      />
    </>
  );
}
