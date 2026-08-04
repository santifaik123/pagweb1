import { NuvikHome } from "@/components/marketing/NuvikHome";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, homeFaqs, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: {
    absolute: "Nuvik Digital | Soluciones digitales para vender, operar y escalar",
  },
  description:
    "Nuvik Digital desarrolla sitios web, software a medida, automatización de procesos e inteligencia artificial para empresas que quieren vender, operar y escalar.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <NuvikHome />
    </>
  );
}
