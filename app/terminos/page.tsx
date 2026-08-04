import { NuvikTerms } from "@/components/marketing/NuvikTerms";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Términos y condiciones",
  description: "Términos y condiciones de uso de los servicios y sitio web de Nuvik Digital.",
  path: "/terminos",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Términos y condiciones", path: "/terminos" },
        ])}
      />
      <NuvikTerms />
    </>
  );
}
