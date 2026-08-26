"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { NuvikContactPanel } from "./NuvikContactPanel";
import styles from "./NuvikHome.module.css";

const navLinks = [
  ["Suite", "/#suite"],
  ["Servicios", "/#servicios"],
  ["Proceso", "/#proceso"],
  ["Precios", "/servicios"],
  ["FAQ", "/#faq"],
  ["Portafolio", "/portafolio"],
];

const portfolioItems = [
  {
    name: "ITO-e",
    category: "Web corporativa",
    title: "Una web que ordena la inspección técnica de obra.",
    description:
      "Sitio corporativo diseñado y desarrollado para ITO-e: narrativa editorial, secciones interactivas y una arquitectura orientada a solicitar demos.",
    href: "https://www.ito-e.cl/",
    image: "/assets/sections/ito-e-showcase.webp",
    cta: "Visitar ito-e.cl",
  },
  {
    name: "Dar.io",
    category: "Software operativo",
    title: "Gestión en tiempo real para negocios que necesitan control.",
    description:
      "Dashboard para inventario, ventas, costos y rentabilidad, pensado para tomar decisiones sin depender de planillas dispersas.",
    href: "/dar.io",
    image: "/assets/sections/dar-io-showcase-2026-06-23.webp",
    cta: "Explorar Dar.io",
  },
  {
    name: "NexusChatBot",
    category: "Chatbot comercial",
    title: "Atención automática para capturar oportunidades 24/7.",
    description:
      "Asistente integrado a la web para responder consultas, ordenar leads y entregar contexto comercial desde la primera interacción.",
    href: "/nexus",
    image: "/assets/sections/nexus-chatbot-showcase-2026-06-23.webp",
    cta: "Explorar NexusChatBot",
  },
  {
    name: "Automatizaciones",
    category: "Procesos conectados",
    title: "Flujos repetitivos resueltos con automatización real.",
    description:
      "Implementaciones para seguimiento comercial, coordinación interna y sincronización de datos entre herramientas clave.",
    href: "/automatizaciones",
    image: "/assets/sections/automations.webp",
    cta: "Explorar automatizaciones",
  },
  {
    name: "Sitios a medida",
    category: "Presencia digital",
    title: "Sitios rápidos, editoriales y construidos para convertir.",
    description:
      "Webs sin plantillas genéricas, con arquitectura clara, diseño responsive, SEO técnico y recorridos pensados para la acción.",
    href: "/servicios",
    image: "/assets/sections/sites.webp",
    cta: "Ver servicios",
  },
  {
    name: "MachReach",
    category: "Plataforma educativa",
    title: "Estudio todo-en-uno para universitarios.",
    description:
      "Integra sesiones de enfoque, seguimiento de cursos, flashcards y quizzes con IA para organizar el estudio y proteger el tiempo de concentración.",
    href: "https://machreach.com/",
    image: "/assets/machreach-showcase.png",
    cta: "Abrir MachReach",
  },
];

const filters = ["Todos", "Software", "Automatización", "Web", "Educación"];

function Logo() {
  return (
    <span className={`${styles.logoLockup} ${styles.logoLight}`}>
      <Image src="/assets/logos/nuvik-symbol-white.png" alt="" width={36} height={36} />
      <span>NUVIK</span>
    </span>
  );
}

export function NuvikPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("nuvik-page");
    return () => document.documentElement.classList.remove("nuvik-page");
  }, []);

  return (
    <main className={`${styles.site} ${styles.portfolioPage}`} id="inicio">
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

      <section className={styles.portfolioHero}>
        <Link className={styles.portfolioBack} href="/">
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
        <div className={styles.portfolioBreadcrumb}>
          <Link href="/">NUVIK</Link>
          <span>/</span>
          <span>Portafolio</span>
        </div>
        <div className={styles.portfolioFilter} aria-label="Categorías de portafolio">
          {filters.map((filter) => (
            <span key={filter}>{filter}</span>
          ))}
        </div>
        <div className={styles.portfolioHeroGrid}>
          <h1>Portafolio</h1>
          <p>
            Productos, automatizaciones y experiencias digitales construidas para vender, operar y escalar con claridad.
          </p>
        </div>
      </section>

      <section className={styles.portfolioGrid} aria-label="Casos del portafolio NUVIK">
        {portfolioItems.map((item, index) => (
          <article className={styles.portfolioCard} key={item.name}>
            <Link
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className={`${styles.portfolioMedia} ${
                item.name === "MachReach" ? styles.portfolioMediaTrimRight : ""
              } ${item.name === "Dar.io" ? styles.portfolioMediaDarIo : ""} ${
                item.name === "NexusChatBot" ? styles.portfolioMediaNexus : ""
              }`}
              aria-label={item.cta}
            >
              <Image
                src={item.image}
                alt={`Vista de ${item.name}`}
                fill
                quality={92}
                sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1040px) calc(100vw - 60px), 46vw"
              />
            </Link>
            <div className={styles.portfolioCardMeta}>
              <span>{item.category}</span>
              <small>{String(index + 1).padStart(2, "0")}</small>
            </div>
            <h2>{item.name}</h2>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <Link
              className={styles.portfolioCardLink}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {item.cta}
              <ArrowRight size={17} />
            </Link>
          </article>
        ))}
      </section>

      <section className={styles.portfolioCta}>
        <div>
          <span>Próximo proyecto</span>
          <h2>Construyamos algo que parezca propio, no genérico.</h2>
        </div>
        <button type="button" onClick={() => setContactOpen(true)}>
          Cotiza ahora <ArrowUpRight size={18} />
        </button>
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
