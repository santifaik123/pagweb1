import type { Metadata } from "next";

import type { ServiceDetailContent } from "@/lib/nuvik-service-content";
import type { NuvikService } from "@/lib/nuvik-services";

export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://nuvik.digital").replace(/\/$/, "");

export const BRAND_NAME = "Nuvik Digital";
export const BRAND_TAGLINE = "Soluciones digitales para vender, operar y escalar";
export const CONTACT_EMAIL = "contacto@nuvik.digital";
export const INSTAGRAM_URL = "https://www.instagram.com/nuvikdigital/";
export const LINKEDIN_URL = "https://cl.linkedin.com/company/nuvikdigital";
export const OG_IMAGE = "/assets/hero/nuvik-operations.webp";
export const LOGO_URL = "/assets/logos/nuvik-symbol.webp";

export const homeFaqs: Array<[string, string]> = [
  [
    "¿Qué es Nuvik Digital?",
    "Nuvik Digital es un estudio digital que diseña y desarrolla soluciones para empresas: sitios web, software a medida, automatización de procesos, dashboards, e-commerce e integración de inteligencia artificial.",
  ],
  [
    "¿Qué hace Nuvik Digital?",
    "Ayudamos a empresas a mejorar su presencia digital, ordenar operaciones y automatizar tareas mediante tecnología. Creamos desde sitios web orientados a conversión hasta sistemas internos y flujos automatizados.",
  ],
  [
    "¿Qué servicios ofrece Nuvik Digital?",
    "Ofrecemos diseño web, desarrollo web, software a medida, automatización de procesos, dashboards, e-commerce, integraciones, agentes IA, chatbots y optimización técnica.",
  ],
  [
    "¿Nuvik Digital trabaja con empresas en Chile y LATAM?",
    "Sí. Nuvik Digital trabaja con empresas en Chile y LATAM que buscan mejorar ventas, operación y escalabilidad mediante soluciones digitales.",
  ],
  [
    "¿Cómo contacto a Nuvik Digital?",
    "Puedes escribir a contacto@nuvik.digital o agendar una reunión desde la página de contacto para revisar tu proyecto.",
  ],
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = OG_IMAGE,
}: {
  title: string | Metadata["title"];
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const titleText =
    typeof title === "string"
      ? title
      : title && typeof title === "object" && "absolute" in title && title.absolute
        ? title.absolute
        : BRAND_NAME;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "es_CL",
      url,
      siteName: BRAND_NAME,
      title: titleText,
      description,
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description,
      images: [imageUrl],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: BRAND_NAME,
    alternateName: ["Nuvik", "NUVIK", "Nuvik SpA", "nuvik.digital"],
    url: absoluteUrl("/"),
    logo: absoluteUrl(LOGO_URL),
    description:
      "Nuvik Digital desarrolla soluciones digitales para vender, operar y escalar: diseño web, software a medida, automatización de procesos e integración de inteligencia artificial.",
    foundingDate: "2026",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santiago",
      addressCountry: "CL",
    },
    areaServed: ["Chile", "LATAM"],
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "sales",
      areaServed: ["Chile", "LATAM"],
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: [INSTAGRAM_URL, LINKEDIN_URL],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: BRAND_NAME,
    alternateName: ["Nuvik", "NUVIK", "Nuvik SpA", "nuvik.digital"],
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#professional-service"),
    name: BRAND_NAME,
    url: absoluteUrl("/"),
    image: absoluteUrl(OG_IMAGE),
    email: CONTACT_EMAIL,
    description:
      "Estudio digital especializado en diseño web, software a medida, automatización de procesos e integración de inteligencia artificial para empresas.",
    areaServed: ["Chile", "LATAM"],
    sameAs: [INSTAGRAM_URL, LINKEDIN_URL],
  };
}

export function faqJsonLd(faqs: Array<[string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function serviceJsonLd(service: NuvikService, content?: ServiceDetailContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/servicios/${service.slug}#service`),
    name: service.name,
    serviceType: content?.serviceType || service.name,
    description: content?.seoDescription || service.description,
    url: absoluteUrl(`/servicios/${service.slug}`),
    image: absoluteUrl(service.image),
    provider: {
      "@id": absoluteUrl("/#organization"),
    },
    areaServed: ["Chile", "LATAM"],
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/servicios/${service.slug}`),
      availability: "https://schema.org/InStock",
    },
    hasOfferCatalog: content
      ? {
          "@type": "OfferCatalog",
          name: `Entregables de ${service.name}`,
          itemListElement: content.deliverables.map(([name, description]) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
              description,
            },
          })),
        }
      : undefined,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function softwareApplicationJsonLd({
  name,
  description,
  path,
  image,
}: {
  name: string;
  description: string;
  path: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(path),
      availability: "https://schema.org/InStock",
    },
  };
}
