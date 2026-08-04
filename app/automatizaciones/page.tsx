import { NuvikProductPage } from "@/components/marketing/NuvikProductPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareApplicationJsonLd } from "@/lib/seo";

const description =
  "Automatizaciones digitales para reducir tareas repetitivas, conectar sistemas y mejorar operaciones empresariales.";
const image = "/assets/sections/automations.webp";

export const metadata = pageMetadata({
  title: "Automatizaciones para empresas",
  description,
  path: "/automatizaciones",
  image,
});

export default function AutomationsPage() {
  return (
    <>
      <JsonLd
        data={softwareApplicationJsonLd({
          name: "Automatizaciones",
          description,
          path: "/automatizaciones",
          image,
        })}
      />
      <NuvikProductPage
        name="Automatizaciones"
        type="Automatización"
        index="03"
        title="Procesos repetitivos, resueltos automáticamente."
        description="Automatiza consultas repetitivas, seguimiento comercial y coordinación operativa con una implementación guiada."
        image={image}
        capabilities={[
          ["Flujos comerciales", "Seguimientos y tareas activados en el momento correcto."],
          ["Operación interna", "Menos trabajo manual y mayor consistencia entre equipos."],
          ["Integraciones", "Datos sincronizados entre las herramientas que ya utilizas."],
          ["Monitoreo", "Control sobre cada ejecución, resultado y excepción."],
        ]}
      />
    </>
  );
}
