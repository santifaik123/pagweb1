import { NuvikInfoPage } from "@/components/marketing/NuvikInfoPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Política de privacidad",
  description: "Política de privacidad de Nuvik Digital para el sitio, formularios, analítica y asistente virtual.",
  path: "/privacidad",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Política de privacidad", path: "/privacidad" }])} />
      <NuvikInfoPage
        eyebrow="Privacidad"
        title="Política de privacidad."
        updatedLabel="Última actualización: 4 de agosto de 2026"
        asideTitle="NUVIK DIGITAL"
        asideBody="Tratamiento responsable de datos del sitio y solicitudes comerciales."
        lead="Esta política explica cómo Nuvik Digital trata la información enviada mediante el sitio, sus formularios, el asistente virtual y los canales oficiales."
        sections={[
          {
            title: "Datos que pueden recopilarse",
            body: [
              "Al completar un formulario podemos recibir nombre, email, empresa, mensaje, servicio de interés, página de origen y parámetros de campaña. Para prevenir abuso se conserva un hash irreversible de la dirección IP, no la dirección IP en texto legible.",
              "Al usar el asistente Nuvi, NexusChat procesa el contenido de la conversación y un identificador de sesión para generar respuestas y mantener el contexto.",
            ],
          },
          {
            title: "Analítica y experiencia",
            body: [
              "El sitio utiliza Microsoft Clarity y PostHog para comprender navegación, clics, scroll, rendimiento y recorridos agregados. Los campos de formularios se configuran para quedar enmascarados en las grabaciones de PostHog; Clarity aplica enmascaramiento de contenido sensible.",
              "Estas herramientas pueden usar almacenamiento local o cookies según su configuración y sus propias políticas. Puedes bloquearlas desde la configuración de privacidad de tu navegador.",
            ],
          },
          {
            title: "Uso y conservación",
            body: [
              "Usamos la información para responder consultas, preparar cotizaciones, coordinar conversaciones comerciales, proteger el formulario contra spam y mejorar la experiencia del sitio.",
              "Nuvik Digital no vende datos personales. Conservamos la información comercial solo durante el tiempo necesario para responder, dar seguimiento y cumplir obligaciones aplicables.",
            ],
          },
          {
            title: "Proveedores",
            body: [
              "El sitio usa Netlify para hosting y funciones, Neon para almacenar solicitudes, Microsoft Clarity y PostHog para analítica, y NexusChat alojado en Render para el asistente virtual. Cada proveedor opera bajo sus propias condiciones y políticas.",
            ],
          },
          {
            title: "Contacto sobre privacidad",
            body: ["Para solicitar acceso, corrección o eliminación de datos enviados a través del sitio, escribe a contacto@nuvik.digital."],
            links: [{ label: "contacto@nuvik.digital", href: "mailto:contacto@nuvik.digital" }],
          },
        ]}
      />
    </>
  );
}
