import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { Analytics } from "@/components/seo/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  absoluteUrl,
  BRAND_NAME,
  BRAND_TAGLINE,
  LOGO_URL,
  OG_IMAGE,
  organizationJsonLd,
  professionalServiceJsonLd,
  SITE_URL,
  websiteJsonLd,
} from "@/lib/seo";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined;
const bingVerification = process.env.NEXT_PUBLIC_BING_VERIFICATION || undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND_NAME,
  title: {
    default: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Nuvik Digital desarrolla sitios web, software a medida, automatización de procesos e integración de inteligencia artificial para empresas en Chile y LATAM.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: absoluteUrl("/"),
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    description:
      "Nuvik Digital desarrolla soluciones digitales para empresas: diseño web, software a medida, automatización e inteligencia artificial.",
    images: [absoluteUrl(OG_IMAGE)],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    description:
      "Diseño web, software a medida, automatización e inteligencia artificial para empresas.",
    images: [absoluteUrl(OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: absoluteUrl(LOGO_URL), type: "image/webp" },
      { url: absoluteUrl("/assets/logos/nuvik-symbol-white.png"), type: "image/png" },
    ],
    apple: [{ url: absoluteUrl("/assets/logos/nuvik-symbol-white.png") }],
  },
  verification: {
    google: gscVerification,
    other: bingVerification ? { "msvalidate.01": bingVerification } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#181a1b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${manrope.variable}`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [organizationJsonLd(), websiteJsonLd(), professionalServiceJsonLd()],
          }}
        />
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  );
}
