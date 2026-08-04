"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { NuvikContactPanel } from "./NuvikContactPanel";
import styles from "./NuvikHome.module.css";

type ProductPageProps = {
  name: string;
  type: string;
  index: string;
  title: string;
  description: string;
  image: string;
  containImage?: boolean;
  capabilities: Array<[string, string]>;
  backHref?: string;
  backLabel?: string;
  capabilitiesLabel?: string;
  capabilitiesTitle?: string;
  returnLabel?: string;
};

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

export function NuvikProductPage({
  name,
  type,
  index,
  title,
  description,
  image,
  containImage = false,
  capabilities,
  backHref = "/#suite",
  backLabel = "Volver al ecosistema",
  capabilitiesLabel = "Capacidades",
  capabilitiesTitle = "Diseñado para operar sin fricción.",
  returnLabel = "Volver a productos",
}: ProductPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("nuvik-page");
    return () => document.documentElement.classList.remove("nuvik-page");
  }, []);

  return (
    <main className={`${styles.site} ${styles.productPage}`} id="inicio">
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

      <section className={styles.productHero}>
        <Link href={backHref} className={styles.productBack}>
          <ArrowLeft size={17} /> {backLabel}
        </Link>
        <div className={styles.productHeroCopy}>
          <p className={styles.monoLabel}>{type} / {index}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <button type="button" onClick={() => setContactOpen(true)}>
            Cotizar {name} <ArrowUpRight size={18} />
          </button>
        </div>
        <div className={styles.productHeroVisual}>
          <Image
            className={containImage ? styles.productImageContain : undefined}
            src={image}
            alt={`Vista conceptual de ${name}`}
            fill
            priority
            quality={92}
            sizes="(max-width: 900px) calc(100vw - 40px), 58vw"
          />
          <div className={styles.visualStamp}>
            <Image src="/assets/logos/nuvik-symbol.webp" alt="" width={52} height={52} />
            <span>{name}</span>
            <small>Built by NUVIK</small>
          </div>
        </div>
      </section>

      <section className={styles.productCapabilities}>
        <div>
          <p className={styles.kicker}>{capabilitiesLabel}</p>
          <h2>{capabilitiesTitle}</h2>
        </div>
        <div className={styles.productCapabilityList}>
          {capabilities.map(([capability, detail], capabilityIndex) => (
            <article key={capability}>
              <span>{String(capabilityIndex + 1).padStart(2, "0")}</span>
              <h3>{capability}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <Link className={styles.productReturn} href={backHref}>
        {returnLabel} <ArrowRight size={18} />
      </Link>

      <div className={`${styles.menuOverlay} ${menuOpen ? styles.overlayOpen : ""}`} aria-hidden={!menuOpen}>
        <div className={styles.overlayTop}>
          <Logo />
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Cerrar navegación">
            <X size={26} />
          </button>
        </div>
        <nav aria-label="Menú principal">
          {navLinks.map(([label, href], navIndex) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
              <span>{String(navIndex + 1).padStart(2, "0")}</span>
              {label}
              <ArrowUpRight size={28} />
            </Link>
          ))}
        </nav>
        <div className={styles.menuFooter}>
          <span>NUVIK DIGITAL</span>
          <button type="button" onClick={() => { setMenuOpen(false); setContactOpen(true); }}>
            Cotiza ahora
          </button>
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
