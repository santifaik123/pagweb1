import { NuvikServices } from "@/components/marketing/NuvikServices";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Servicios digitales para empresas",
  description:
    "Diseño web, software a medida, automatización, inteligencia artificial, dashboards, e-commerce e integraciones para empresas.",
  path: "/servicios",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
        ])}
      />
      <NuvikServices />
    </>
  );
}
