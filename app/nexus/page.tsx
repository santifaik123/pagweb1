import { NuvikProductPage } from "@/components/marketing/NuvikProductPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareApplicationJsonLd } from "@/lib/seo";

const description =
  "NexusChatBot es una solución de Nuvik Digital para atención, automatización y conversaciones con inteligencia artificial.";
const image = "/assets/sections/nexus-chatbot-showcase-2026-06-23.webp";

export const metadata = pageMetadata({
  title: "NexusChatBot | Chatbots IA para empresas",
  description,
  path: "/nexus",
  image,
});

export default function NexusPage() {
  return (
    <>
      <JsonLd
        data={softwareApplicationJsonLd({
          name: "NexusChatBot",
          description,
          path: "/nexus",
          image,
        })}
      />
      <NuvikProductPage
        name="NexusChatBot"
        type="Chatbot"
        index="02"
        title="Atiende, responde y captura oportunidades 24/7."
        description="Un asistente inteligente integrado en tu web para responder consultas, calificar leads y acelerar cada conversación."
        image={image}
        capabilities={[
          ["Atención automática", "Respuestas inmediatas para las consultas más frecuentes."],
          ["Captura de leads", "Datos y contexto comercial organizados desde la primera interacción."],
          ["Calificación", "Oportunidades priorizadas según intención y necesidad."],
          ["Integración", "Conexión con tu web, procesos y herramientas comerciales."],
        ]}
      />
    </>
  );
}
