import { NuvikInfoPage } from "@/components/marketing/NuvikInfoPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Política de privacidad",
  description:
    "Política de privacidad de Nuvik Digital para el uso del sitio web y formularios de contacto.",
  path: "/privacidad",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Política de privacidad", path: "/privacidad" },
        ])}
      />
      <NuvikInfoPage
        eyebrow="Privacidad"
        title="Política de privacidad."
        updatedLabel="Última actualización: 17 de junio de 2026"
        asideTitle="NUVIK DIGITAL"
        asideBody="Tratamiento responsable de datos del sitio y solicitudes comerciales."
        lead="Esta política explica cómo Nuvik Digital trata la información enviada a través del sitio, formularios de contacto y canales oficiales de comunicación."
        sections={[
          {
            title: "Datos que pueden recopilarse",
            body: [
              "Cuando una persona completa un formulario o escribe al correo oficial, Nuvik Digital puede recibir nombre, email, empresa, mensaje, necesidad comercial y contexto del proyecto.",
              "Si se configuran herramientas de analítica, el sitio también puede registrar información técnica agregada sobre uso, rendimiento y navegación.",
            ],
          },
          {
            title: "Uso de la información",
            body: [
              "La información se utiliza para responder consultas, preparar cotizaciones, evaluar alcance de proyectos, coordinar conversaciones comerciales y mejorar la experiencia del sitio.",
              "Nuvik Digital no vende datos personales a terceros.",
            ],
          },
          {
            title: "Herramientas y terceros",
            body: [
              "El sitio puede integrar servicios de hosting, analítica, formularios o comunicación cuando estén configurados. Esos servicios operan bajo sus propias condiciones y políticas.",
              "Los scripts de analítica solo se cargan cuando existen variables de entorno configuradas para habilitarlos.",
            ],
          },
          {
            title: "Contacto sobre privacidad",
            body: [
              "Para solicitar información, corrección o eliminación de datos enviados a través del sitio, escribe a contacto@nuvik.digital.",
            ],
            links: [{ label: "contacto@nuvik.digital", href: "mailto:contacto@nuvik.digital" }],
          },
        ]}
      />
    </>
  );
}
