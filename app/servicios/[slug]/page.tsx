import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NuvikServicePage } from "@/components/marketing/NuvikServicePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceContentBySlug } from "@/lib/nuvik-service-content";
import { getNuvikService, nuvikServices } from "@/lib/nuvik-services";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return nuvikServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getNuvikService(slug);

  if (!service) {
    return {};
  }

  const content = serviceContentBySlug[slug];

  return pageMetadata({
    title: content?.seoTitle || `${service.name} para empresas`,
    description: content?.seoDescription || service.description,
    path: `/servicios/${service.slug}`,
    image: service.image,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getNuvikService(slug);
  const content = serviceContentBySlug[slug];

  if (!service || !content) {
    notFound();
  }

  const relatedServices = content.relatedSlugs
    .map((relatedSlug) => getNuvikService(relatedSlug))
    .filter((relatedService) => relatedService !== undefined);

  return (
    <>
      <JsonLd data={serviceJsonLd(service, content)} />
      <JsonLd data={faqJsonLd(content.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
          { name: service.name, path: `/servicios/${service.slug}` },
        ])}
      />
      <NuvikServicePage service={service} content={content} relatedServices={relatedServices} />
    </>
  );
}
