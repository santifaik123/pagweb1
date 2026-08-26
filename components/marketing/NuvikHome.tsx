"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Instagram,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import type { CSSProperties, MouseEvent, PointerEvent, UIEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { serviceGroups } from "@/lib/nuvik-services";
import { homeFaqs } from "@/lib/seo";

import { NuvikContactPanel } from "./NuvikContactPanel";
import styles from "./NuvikHome.module.css";

const suiteItems = [
  {
    name: "Dar.io",
    type: "Software",
    index: "01",
    title: "Gestión integral de tu negocio en tiempo real.",
    body: "Dashboard y sistema de gestión para visualizar información clave, ordenar datos y tomar mejores decisiones.",
    stamp: "Gestión en tiempo real",
    link: "Explorar Dar.io",
    href: "/dar.io",
    image: "/assets/sections/dar-io-showcase-2026-06-23.webp",
    containImage: false,
    brandVisual: false,
  },
  {
    name: "NexusChatBot",
    type: "Chatbot",
    index: "02",
    title: "Atiende, responde y captura oportunidades 24/7.",
    body: "Chatbot con inteligencia artificial para responder, guiar y automatizar conversaciones con clientes.",
    stamp: "Captura oportunidades 24/7",
    link: "Explorar NexusChatBot",
    href: "/nexus",
    image: "/assets/sections/nexus-chatbot-showcase-2026-06-23.webp",
    containImage: false,
    brandVisual: false,
  },
  {
    name: "Automatizaciones",
    type: "Automatización",
    index: "03",
    title: "Procesos repetitivos, resueltos automáticamente.",
    body: "Flujos digitales que conectan herramientas, reducen tareas manuales y aceleran la operación diaria.",
    stamp: "Procesos automáticos sin fricción",
    link: "Explorar automatizaciones",
    href: "/automatizaciones",
    image: "/assets/sections/automations.webp",
    containImage: false,
    brandVisual: false,
  },
  {
    name: "Sitios a medida",
    type: "Diseño Web",
    index: "04",
    title: "Presencia digital diseñada para convertir.",
    body: "Websites rápidos, claros y orientados a conversión para empresas que necesitan verse serias y vender mejor.",
    stamp: "Presencia que convierte",
    link: "Ver servicios",
    href: "/servicios",
    image: "/assets/sections/sites.webp",
    containImage: false,
    brandVisual: false,
  },
  {
    name: "MachReach",
    type: "Plataforma educativa",
    index: "05",
    title: "Estudio todo-en-uno para universitarios.",
    body: "Plataforma con sesiones de enfoque, seguimiento de cursos, flashcards y quizzes con IA para organizar mejor el estudio.",
    stamp: "Estudio enfocado con IA",
    link: "Explorar MachReach",
    href: "https://machreach.com/",
    image: "/assets/logos/machreach.svg",
    containImage: true,
    brandVisual: true,
  },
  {
    name: "ITO-e",
    type: "Web corporativa",
    index: "06",
    title: "Una web que ordena la inspección técnica de obra.",
    body: "Sitio corporativo diseñado y desarrollado para ITO-e, con narrativa editorial y una arquitectura orientada a solicitar demos.",
    stamp: "Caso real de cliente",
    link: "Visitar ito-e.cl",
    href: "https://www.ito-e.cl/",
    image: "/assets/sections/ito-e-showcase.webp",
    containImage: false,
    brandVisual: false,
  },
];

const suiteCarouselItems = [suiteItems[suiteItems.length - 1], ...suiteItems, suiteItems[0]];

const processSteps = [
  ["01", "Contacto inicial", "Conversamos contigo para entender qué quieres construir, qué problema necesitas resolver y qué resultado esperas."],
  ["02", "Conocernos", "Revisamos tu negocio, tus clientes y tus procesos actuales para detectar dónde hay fricción y oportunidades concretas."],
  ["03", "Ruta del proyecto", "Ordenamos páginas, flujos, funcionalidades, integraciones y prioridades antes de empezar a diseñar o desarrollar."],
  ["04", "Diseño visual", "Creamos una interfaz clara, profesional y alineada con la marca, pensada para guiar al usuario hacia la acción."],
  ["05", "Desarrollo", "Construimos con código limpio, responsive, veloz y preparado para crecer sin depender de parches improvisados."],
  ["06", "Revisión", "Probamos contigo cada parte del sistema, ajustamos detalles y validamos que funcione en casos reales."],
  ["07", "Lanzamiento y mejora", "Publicamos, medimos y dejamos la base lista para seguir optimizando, automatizando y escalando."],
];

const faqs = homeFaqs;

const navLinks = [
  ["Suite", "#suite"],
  ["Servicios", "#servicios"],
  ["Proceso", "#proceso"],
  ["Precios", "/servicios"],
  ["FAQ", "#faq"],
  ["Portafolio", "/portafolio"],
];

const footerLinks = [
  ["Inicio", "#inicio"],
  ["Portafolio", "/portafolio"],
  ["Servicios", "#servicios"],
  ["Contacto", "#cotizar"],
  ["Nuvik Digital", "/nuvik-digital"],
  ["Términos", "/terminos"],
  ["Privacidad", "/privacidad"],
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`${styles.logoLockup} ${light ? styles.logoLight : ""}`}>
      <Image
        src={light ? "/assets/logos/nuvik-symbol-white.png" : "/assets/logos/nuvik-symbol.webp"}
        alt=""
        width={36}
        height={36}
      />
      <span>NUVIK</span>
    </span>
  );
}

export function NuvikHome() {
  const [announcement, setAnnouncement] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [suitePosition, setSuitePosition] = useState(1);
  const [suiteTransition, setSuiteTransition] = useState(true);
  const [suiteIsMobile, setSuiteIsMobile] = useState(false);
  const [serviceGroup, setServiceGroup] =
    useState<keyof typeof serviceGroups>("software");
  const [openFaq, setOpenFaq] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [announcementScrolled, setAnnouncementScrolled] = useState(false);
  const suiteDragRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    isDragging: false,
    didSwipe: false,
  });

  const activeSuite = (suitePosition - 1 + suiteItems.length) % suiteItems.length;
  const suiteSlideGap = suiteIsMobile ? 0 : 24;
  useEffect(() => {
    document.documentElement.classList.add("nuvik-page");
    return () => {
      document.documentElement.classList.remove("nuvik-page");
    };
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;

      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  useEffect(() => {
    if (suitePosition === 0 || suitePosition === suiteItems.length + 1) return;

    const timer = window.setTimeout(() => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setSuiteTransition(true);
        setSuitePosition((value) => Math.min(value + 1, suiteItems.length + 1));
      }
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [suitePosition]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const updateSuiteViewport = () => setSuiteIsMobile(media.matches);

    updateSuiteViewport();
    media.addEventListener("change", updateSuiteViewport);
    return () => media.removeEventListener("change", updateSuiteViewport);
  }, []);

  useEffect(() => {
    if (suitePosition !== 0 && suitePosition !== suiteItems.length + 1) return;

    const resetTimer = window.setTimeout(() => {
      setSuiteTransition(false);
      setSuitePosition(suitePosition === 0 ? suiteItems.length : 1);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setSuiteTransition(true));
      });
    }, 850);

    return () => window.clearTimeout(resetTimer);
  }, [suitePosition]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-nuvik-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.querySelector("#footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollRoot = document.getElementById("inicio");
    if (!scrollRoot) return;

    const updateAnnouncementPosition = () => {
      const isScrolled = Math.max(window.scrollY, scrollRoot.scrollTop) > 8;
      setAnnouncementScrolled((current) => (current === isScrolled ? current : isScrolled));
    };

    updateAnnouncementPosition();
    scrollRoot.addEventListener("scroll", updateAnnouncementPosition, { passive: true });
    window.addEventListener("scroll", updateAnnouncementPosition, { passive: true });
    return () => {
      scrollRoot.removeEventListener("scroll", updateAnnouncementPosition);
      window.removeEventListener("scroll", updateAnnouncementPosition);
    };
  }, []);

  function closeOverlays() {
    setMenuOpen(false);
  }

  function handleSiteScroll(event: UIEvent<HTMLElement>) {
    const isScrolled = event.currentTarget.scrollTop > 8;
    setAnnouncementScrolled((current) => (current === isScrolled ? current : isScrolled));
  }

  function goToSuite(index: number) {
    setSuiteTransition(true);
    setSuitePosition(((index + suiteItems.length) % suiteItems.length) + 1);
  }

  function handleSuitePointerDown(event: PointerEvent<HTMLDivElement>) {
    suiteDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      isDragging: true,
      didSwipe: false,
    };
  }

  function handleSuitePointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = suiteDragRef.current;
    if (!drag.isDragging || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
      drag.didSwipe = true;
    }
  }

  function handleSuitePointerEnd(event: PointerEvent<HTMLDivElement>) {
    const drag = suiteDragRef.current;
    if (!drag.isDragging || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    const shouldSwipe = Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

    if (shouldSwipe) {
      setSuiteTransition(true);
      setSuitePosition((value) =>
        Math.max(0, Math.min(suiteItems.length + 1, value + (deltaX < 0 ? 1 : -1))),
      );
    }

    const didSwipe = shouldSwipe;

    suiteDragRef.current = {
      pointerId: -1,
      startX: 0,
      startY: 0,
      isDragging: false,
      didSwipe,
    };

    window.setTimeout(() => {
      suiteDragRef.current.didSwipe = false;
    }, 0);
  }

  function preventSuiteClickAfterSwipe(event: MouseEvent<HTMLAnchorElement>) {
    if (!suiteDragRef.current.didSwipe) return;
    event.preventDefault();
  }

  function handleSuiteTransitionEnd() {
    if (suitePosition !== 0 && suitePosition !== suiteItems.length + 1) return;

    setSuiteTransition(false);
    setSuitePosition(suitePosition === 0 ? suiteItems.length : 1);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setSuiteTransition(true));
    });
  }

  return (
    <main className={styles.site} id="inicio" onScroll={handleSiteScroll}>
      {announcement ? (
        <div
          className={`${styles.announcement} ${
            footerVisible || announcementScrolled ? styles.announcementOut : ""
          }`}
        >
          <a href="#cotizar" onClick={(event) => { event.preventDefault(); setContactOpen(true); }}>
            Diagnóstico digital gratuito · Respuesta en menos de 24 horas
          </a>
          <button type="button" onClick={() => setAnnouncement(false)} aria-label="Cerrar anuncio">
            <X size={17} strokeWidth={1.5} />
          </button>
        </div>
      ) : null}

      <header
        className={`${styles.header} ${styles["nuvik-navbar-glass"]} ${announcement && !announcementScrolled ? "" : styles.headerRaised} ${
          footerVisible ? styles.headerOut : ""
        }`}
      >
        <a className={styles.brandLink} href="#inicio" aria-label="Inicio NUVIK">
          <Logo light />
        </a>
        <nav className={styles.desktopNav} aria-label="Navegación principal">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
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

      <section className={styles.heroShell} aria-labelledby="hero-title">
        <div className={styles.heroSticky}>
          <div className={styles.heroMedia}>
            <Image
              className={styles.heroImage}
              src="/assets/hero/nuvik-hero-cinematic-2026-06-24.webp"
              alt="Infraestructura digital cinematografica con servidores, arquitectura cloud y sistemas NUVIK"
              fill
              priority
              quality={95}
              sizes="100vw"
            />
          </div>
          <div className={styles.heroShade} />
          <div className={styles.heroContent}>
            <h1
              id="hero-title"
              className={styles.heroMainTitle}
            >
              <span>Soluciones digitales</span>
              <span>para vender, operar</span>
              <span>y escalar.</span>
            </h1>
            <p className={styles.maskedHeroTitle} aria-hidden="true">
              nuvik digital
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.suiteSection} ${styles.nextSection}`} id="suite">
        <div className={styles.suiteTabsRow}>
          <div className={styles.suiteTabs} role="tablist" aria-label="Productos NUVIK">
            {suiteItems.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeSuite === index}
                key={item.name}
                onClick={() => {
                  goToSuite(index);
                }}
                className={activeSuite === index ? styles.activeTab : ""}
              >
                <span>{item.name}</span>
                <small>{item.index}</small>
              </button>
            ))}
          </div>
          <Link className={styles.suitePortfolioTab} href="/portafolio">
            <span>Portafolio</span>
            <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
          </Link>
        </div>
        <p className={styles.suiteMobileTitle} aria-live="polite">
          {suiteItems[activeSuite].name}
        </p>
        <div
          className={styles.suiteCarousel}
          onPointerDown={handleSuitePointerDown}
          onPointerMove={handleSuitePointerMove}
          onPointerUp={handleSuitePointerEnd}
          onPointerCancel={handleSuitePointerEnd}
        >
          <div className={`${styles.suiteTrack} ${suiteTransition ? "" : styles.suiteTrackNoTransition}`}>
            {suiteCarouselItems.map((item, index) => {
              const offset = index - suitePosition;
              const isCurrentSlide = index === suitePosition;

              return (
              <article
                className={`${styles.suiteFeature} ${
                  item.name === "Dar.io" ? styles.suiteFeatureDarIo : ""
                } ${item.name === "NexusChatBot" ? styles.suiteFeatureNexus : ""}`}
                key={`${item.name}-${index}`}
                aria-hidden={!isCurrentSlide}
                style={{
                  transform: `translate3d(calc(${offset * 100}% + ${offset * suiteSlideGap}px), 0, 0)`,
                } as CSSProperties}
                onTransitionEnd={isCurrentSlide ? handleSuiteTransitionEnd : undefined}
              >
                <div
                  className={`${styles.suiteVisual} ${
                    item.brandVisual ? styles.machReachVisual : ""
                  }`}
                >
                  {item.brandVisual ? (
                    <div className={styles.machReachLockup}>
                      <Image
                        src={item.image}
                        alt=""
                        width={108}
                        height={108}
                        loading="lazy"
                      />
                      <strong>
                        Mach<span>Reach</span>
                      </strong>
                      <small>Estudiar deja de ser una lata.</small>
                    </div>
                  ) : (
                    <Image
                      className={item.containImage ? styles.suiteProductImageContain : undefined}
                      src={item.image}
                      alt={`Vista de ${item.name}`}
                      fill
                      quality={90}
                      loading={isCurrentSlide ? "eager" : "lazy"}
                      sizes="(max-width: 720px) calc(100vw - 50px), (max-width: 1040px) 100vw, 64vw"
                    />
                  )}
                  <a
                    className={styles.visualStamp}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    tabIndex={isCurrentSlide ? undefined : -1}
                    aria-label={item.link}
                    onClick={(event) => {
                      if (item.href !== "#cotizar") return;
                      event.preventDefault();
                      setContactOpen(true);
                    }}
                  >
                    <Image src="/assets/logos/nuvik-symbol.webp" alt="" width={52} height={52} />
                    <span>{item.name}</span>
                    <small>{item.stamp}</small>
                    <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
                  </a>
                </div>
                <div className={styles.suiteCopy}>
                  <p className={styles.monoLabel}>
                    <span className={styles.suiteDesktopMeta}>{item.type} / {item.index}</span>
                    <span className={styles.suiteMobileMeta}>{item.name}</span>
                  </p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    tabIndex={isCurrentSlide ? undefined : -1}
                    onClick={item.href === "#cotizar" ? (event) => {
                      event.preventDefault();
                      setContactOpen(true);
                    } : undefined}
                  >
                    {item.link} <ArrowRight size={18} />
                  </a>
                  <Link
                    className={styles.suitePortfolioLink}
                    href="/portafolio"
                    tabIndex={isCurrentSlide ? undefined : -1}
                    onClick={(event) => preventSuiteClickAfterSwipe(event)}
                  >
                    Portafolio <ArrowRight size={18} />
                  </Link>
                </div>
                <a
                  className={styles.suiteMobileCardLink}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  tabIndex={isCurrentSlide ? undefined : -1}
                  aria-label={item.link}
                  onClick={(event) => {
                    preventSuiteClickAfterSwipe(event);
                    if (event.defaultPrevented || item.href !== "#cotizar") return;
                    event.preventDefault();
                    setContactOpen(true);
                  }}
                />
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.aboutSection}`} id="nosotros">
        <h2 data-nuvik-reveal>No somos una agencia tradicional.</h2>
        <div className={styles.aboutGrid} data-nuvik-reveal>
          <figure className={styles.aboutQuote}>
            <blockquote>
              “Nuvik Digital es un estudio de producto y tecnología. Creamos sitios, sistemas y automatizaciones pensadas
              para resolver problemas reales de negocio: conseguir clientes, ordenar información, conectar herramientas y
              escalar operaciones.”
            </blockquote>
            <figcaption>Equipo Nuvik Digital</figcaption>
          </figure>
          <div className={styles.aboutStatement}>
            <p className={styles.monoLabel}>CÓMO TRABAJAMOS</p>
            <p>
              Diseñamos, construimos y operamos nuestras propias soluciones. Eso nos permite trabajar con una mirada más
              completa: estrategia, experiencia de usuario, desarrollo y automatización en una misma dirección.
            </p>
            <p>
              Pensamos como negocio. Diseñamos como producto. Construimos como tecnología.
            </p>
          </div>
        </div>
        <div className={styles.watermark}>NUVIK<br />DIGITAL</div>
      </section>

      <section className={`${styles.section} ${styles.servicesSection}`} id="servicios">
        <div className={styles.serviceHeading} data-nuvik-reveal>
          <h2>Todo lo que hacemos.</h2>
        </div>
        <div className={styles.serviceSwitch} role="tablist" data-nuvik-reveal>
          <button
            type="button"
            role="tab"
            aria-selected={serviceGroup === "software"}
            onClick={() => setServiceGroup("software")}
          >
            Automatización & software
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={serviceGroup === "presencia"}
            onClick={() => setServiceGroup("presencia")}
          >
            Presencia digital
          </button>
        </div>
        <div className={styles.serviceList} data-nuvik-reveal>
          {serviceGroups[serviceGroup].map((service, index) => (
            <Link
              className={styles.serviceRow}
              href={`/servicios/${service.slug}`}
              key={service.slug}
              aria-label={`Conocer más sobre ${service.name}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.name}</h3>
              <p>{service.summary}</p>
              <ArrowUpRight size={22} strokeWidth={1.3} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.processSection}`} id="proceso">
        <div className={styles.processIntro} data-nuvik-reveal>
          <h2>Primero nos conocemos. Después construimos.</h2>
          <p className={styles.processSummary}>
            Partimos con una conversación clara para entender tu negocio, ordenar prioridades y construir solo lo que
            realmente mueve el proyecto.
          </p>
          <a
            className={styles.processCta}
            href="https://cal.com/nuvik.digital/15min"
            target="_blank"
            rel="noreferrer"
          >
            Agenda una reunión
            <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
        <div className={styles.processList}>
          {processSteps.map(([number, title, body]) => (
            <article key={number} data-nuvik-reveal>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`} id="faq">
        <div className={styles.faqTitle} data-nuvik-reveal>
          <h2>Preguntas frecuentes.</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map(([question, answer], index) => {
            const isOpen = openFaq === index;
            return (
              <article key={question} data-nuvik-reveal>
                <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen}>
                  <span>{question}</span>
                  <ChevronDown className={isOpen ? styles.chevronOpen : ""} size={22} strokeWidth={1.4} />
                </button>
                <div className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerOpen : ""}`}>
                  <p>{answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className={styles.footer} id="footer">
        <div className={styles.footerMain}>
          <div className={styles.footerSocial}>
            <a href="https://www.instagram.com/nuvikdigital/" target="_blank" rel="noreferrer">
              <Instagram aria-hidden="true" strokeWidth={1.5} />
              <span>Instagram</span>
            </a>
            <a href="https://cl.linkedin.com/company/nuvikdigital" target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" strokeWidth={1.5} />
              <span>LinkedIn</span>
            </a>
          </div>
          <nav className={styles.footerNavigation} aria-label="Navegación de pie de página">
            {footerLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={label === "Contacto" ? (event) => {
                  event.preventDefault();
                  setContactOpen(true);
                } : undefined}
              >
                <span>{label}</span>
                <ArrowRight aria-hidden="true" strokeWidth={2} />
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 NUVIK DIGITAL</p>
          <a href="/terminos">
            Términos y condiciones
          </a>
        </div>
      </footer>

      <div className={`${styles.menuOverlay} ${menuOpen ? styles.overlayOpen : ""}`} aria-hidden={!menuOpen}>
        <div className={styles.overlayTop}>
          <Logo light />
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Cerrar navegación">
            <X size={26} />
          </button>
        </div>
        <nav aria-label="Menú principal">
          {navLinks.map(([label, href], index) => (
            <a key={label} href={href} onClick={closeOverlays}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
              <ArrowUpRight size={28} />
            </a>
          ))}
        </nav>
        <div className={styles.menuFooter}>
          <span>NUVIK DIGITAL</span>
          <button type="button" onClick={() => { closeOverlays(); setContactOpen(true); }}>Cotiza ahora</button>
        </div>
      </div>

      <div className={`${styles.mobileDock} ${footerVisible ? styles.mobileDockOut : ""}`}>
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
