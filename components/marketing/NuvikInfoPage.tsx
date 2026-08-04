"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Instagram, Linkedin, Mail, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL } from "@/lib/seo";

import { NuvikContactPanel } from "./NuvikContactPanel";
import styles from "./NuvikHome.module.css";

type InfoSection = {
  title: string;
  body: string[];
  links?: Array<{ label: string; href: string; external?: boolean }>;
};

type NuvikInfoPageProps = {
  eyebrow: string;
  title: string;
  updatedLabel?: string;
  asideTitle: string;
  asideBody: string;
  lead: string;
  sections: InfoSection[];
  contactContext?: string;
  showContactCta?: boolean;
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

export function NuvikInfoPage({
  eyebrow,
  title,
  updatedLabel,
  asideTitle,
  asideBody,
  lead,
  sections,
  contactContext,
  showContactCta = false,
}: NuvikInfoPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("nuvik-page");
    return () => document.documentElement.classList.remove("nuvik-page");
  }, []);

  return (
    <main className={`${styles.site} ${styles.legalPage}`} id="inicio">
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

      <section className={styles.legalHero}>
        <Link href="/" className={styles.legalBack}>
          <ArrowLeft size={17} /> Volver al inicio
        </Link>
        <p className={styles.kicker}>{eyebrow}</p>
        <h1>{title}</h1>
        {updatedLabel ? <p>{updatedLabel}</p> : null}
      </section>

      <div className={styles.legalLayout}>
        <aside>
          <p className={styles.monoLabel}>{asideTitle}</p>
          <p>{asideBody}</p>
          <div className={styles.legalIconLinks}>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <Mail aria-hidden="true" strokeWidth={1.5} />
              <span>{CONTACT_EMAIL}</span>
            </a>
            <a className={styles.legalSocialLink} href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Instagram aria-hidden="true" strokeWidth={1.5} />
              <span>Instagram</span>
            </a>
            <a className={styles.legalSocialLink} href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" strokeWidth={1.5} />
              <span>LinkedIn</span>
            </a>
          </div>
          {showContactCta ? (
            <button className={styles.legalContactButton} type="button" onClick={() => setContactOpen(true)}>
              Cotizar proyecto <ArrowUpRight size={17} />
            </button>
          ) : null}
        </aside>
        <article className={styles.legalContent}>
          <div className={styles.legalLead}>
            <p>{lead}</p>
          </div>
          {sections.map((section, index) => (
            <section className={styles.legalSection} key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.links ? (
                  <div className={styles.legalLinkList}>
                    {section.links.map((link) =>
                      link.external ? (
                        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                      ) : (
                        <Link key={link.href} href={link.href}>
                          {link.label}
                        </Link>
                      ),
                    )}
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </article>
      </div>

      <footer className={styles.legalFooter}>
        <p>© 2026 NUVIK DIGITAL</p>
        <Link href="/">Volver a nuvik.digital</Link>
      </footer>

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

      <NuvikContactPanel
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        context={contactContext}
      />
    </main>
  );
}
