import { NuvikPortfolio } from "@/components/marketing/NuvikPortfolio";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portafolio digital",
  description:
    "Proyectos, productos y soluciones digitales desarrolladas por Nuvik Digital para vender, operar y escalar.",
  path: "/portafolio",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Portafolio", path: "/portafolio" },
        ])}
      />
      <NuvikPortfolio />
    </>
  );
}
