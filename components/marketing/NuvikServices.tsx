"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { NuvikContactPanel } from "./NuvikContactPanel";
import styles from "./NuvikHome.module.css";

const pricing = [
  {
    name: "Starter",
    price: "$200.000 CLP",
    delivery: "Entrega en 3 días hábiles",
    features: [
      "Landing page completa",
      "Diseño responsive",
      "SEO técnico esencial",
      "Formulario funcional",
      "Integración con WhatsApp",
      "1 mes de soporte",
    ],
  },
  {
    name: "Pro",
    price: "$450.000 CLP",
    delivery: "Entrega en 5 días hábiles",
    features: [
      "Sitio corporativo multipágina",
      "Arquitectura de conversión",
      "Diseño visual a medida",
      "SEO on-page",
      "Analítica e integraciones",
      "2 meses de soporte",
    ],
  },
  {
    name: "Commerce",
    price: "$650.000 CLP",
    delivery: "Entrega según catálogo",
    features: [
      "Tienda online completa",
      "Catálogo y carrito",
      "Pasarela de pago",
      "Gestión de productos",
      "Automatizaciones comerciales",
      "Acompañamiento de lanzamiento",
    ],
  },
  {
    name: "Personalizado",
    price: "A medida",
    delivery: "Roadmap según alcance",
    features: [
      "Software y sistemas internos",
      "Apps y dashboards",
      "Automatización avanzada",
      "Agentes de IA",
      "Integraciones complejas",
      "Soporte evolutivo",
    ],
  },
];

const navLinks = [
  ["Suite", "/#suite"],
  ["Servicios", "/#servicios"],
  ["Proceso", "/#proceso"],
  ["Precios", "/servicios"],
  ["FAQ", "/#faq"],
  ["Portafolio", "/portafolio"],
];

function Logo() {
  return (
    <span className={`${styles.logoLockup} ${styles.logoLight}`}>
      <Image src="/assets/logos/nuvik-symbol-white.png" alt="" width={36} height={36} />
      <span>NUVIK</span>
    </span>
  );
}

export function NuvikServices() {
  const [activePrice, setActivePrice] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const currentPrice = pricing[activePrice];

  useEffect(() => {
    document.documentElement.classList.add("nuvik-page");
    return () => document.documentElement.classList.remove("nuvik-page");
  }, []);

  return (
    <main className={`${styles.site} ${styles.servicesPage}`} id="inicio">
      <header className={`${styles.header} ${styles.headerRaised}`}>
        <Link className={styles.brandLink} href="/" aria-label="Inicio NUVIK">
          <Logo />
        </Link>
        <nav className={styles.desktopNav} aria-label="Navegación principal">
          {navLinks.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <button className={styles.primaryButton} type="button" onClick={() => setContactOpen(true)}>
            Cotiza ahora <ArrowUpRight size={17} />
          </button>
          <button
            className={styles.iconButton}
            type="button"
            aria-label="Abrir navegación"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={21} strokeWidth={1.4} />
          </button>
        </div>
      </header>

      <section className={styles.servicesPageHero}>
        <Link href="/" className={styles.servicesBack}>
          <ArrowLeft size={17} /> Volver al inicio
        </Link>
        <p className={styles.kicker}>Servicios digitales</p>
        <h1>Presencia digital diseñada para convertir.</h1>
        <p>
          Webs modernas, rápidas y sin plantillas genéricas, con una arquitectura que guía al usuario hacia la acción.
        </p>
      </section>

      <section className={`${styles.section} ${styles.pricingSection}`} id="precios">
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>Precios</p>
          <h2>Planes claros, sin sorpresas.</h2>
          <p>Todos incluyen diseño responsive, soporte y una solución construida a medida.</p>
        </div>
        <div className={styles.priceTabs} role="tablist">
          {pricing.map((plan, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activePrice === index}
              key={plan.name}
              onClick={() => setActivePrice(index)}
            >
              {plan.name}
            </button>
          ))}
        </div>
        <div className={styles.pricePanel}>
          <div>
            <p className={styles.monoLabel}>PLAN / {String(activePrice + 1).padStart(2, "0")}</p>
            <h3>{currentPrice.name}</h3>
            <strong>{currentPrice.price}</strong>
            <span>{currentPrice.delivery}</span>
          </div>
          <ul>
            {currentPrice.features.map((feature) => (
              <li key={feature}>
                <Check size={17} /> {feature}
              </li>
            ))}
          </ul>
          <button className={styles.darkButton} type="button" onClick={() => setContactOpen(true)}>
            Cotizar {currentPrice.name} <ArrowUpRight size={18} />
          </button>
        </div>
      </section>

      <div className={`${styles.menuOverlay} ${menuOpen ? styles.overlayOpen : ""}`} aria-hidden={!menuOpen}>
        <div className={styles.overlayTop}>
          <Logo />
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Cerrar navegación">
            <X size={26} />
          </button>
        </div>
        <nav aria-label="Menú principal">
          {navLinks.map(([label, href], index) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
              <ArrowUpRight size={28} />
            </Link>
          ))}
        </nav>
        <div className={styles.menuFooter}>
          <span>NUVIK DIGITAL</span>
          <button type="button" onClick={() => { setMenuOpen(false); setContactOpen(true); }}>Cotiza ahora</button>
        </div>
      </div>

      <div className={styles.mobileDock}>
        <button type="button" aria-label="Abrir navegación" onClick={() => setMenuOpen(true)}>
          <Menu size={21} />
        </button>
        <button className={styles.mobileContactButton} type="button" onClick={() => setContactOpen(true)}>
          Cotiza ahora
        </button>
      </div>

      <NuvikContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
