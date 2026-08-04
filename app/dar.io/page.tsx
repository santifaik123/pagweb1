import { NuvikProductPage } from "@/components/marketing/NuvikProductPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareApplicationJsonLd } from "@/lib/seo";

const description =
  "Dar.io es una solución digital desarrollada por Nuvik Digital para operaciones, gestión y sistemas empresariales.";
const image = "/assets/sections/dar-io-showcase-2026-06-23.webp";

export const metadata = pageMetadata({
  title: "Dar.io | Producto digital de Nuvik Digital",
  description,
  path: "/dar.io",
  image,
});

export default function DarIoPage() {
  return (
    <>
      <JsonLd
        data={softwareApplicationJsonLd({
          name: "Dar.io",
          description,
          path: "/dar.io",
          image,
        })}
      />
      <NuvikProductPage
        name="Dar.io"
        type="Software"
        index="01"
        title="Gestión integral de tu negocio en tiempo real."
        description="Controla inventario, ventas, costos y ganancias desde un solo dashboard construido para operar sin caos."
        image={image}
        containImage
        capabilities={[
          ["Inventario", "Stock, movimientos y alertas organizados en una sola vista."],
          ["Ventas", "Seguimiento comercial y resultados actualizados en tiempo real."],
          ["Costos", "Visibilidad sobre márgenes, gastos y rentabilidad del negocio."],
          ["Dashboard", "Información operativa convertida en decisiones claras."],
        ]}
      />
    </>
  );
}
