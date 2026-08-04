"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import type { ServiceDetailContent } from "@/lib/nuvik-service-content";
import type { NuvikService } from "@/lib/nuvik-services";

import { NuvikContactPanel } from "./NuvikContactPanel";
import styles from "./NuvikHome.module.css";

type RelatedService = Pick<NuvikService, "slug" | "name" | "summary" | "category">;

type NuvikServicePageProps = {
  service: NuvikService;
  content: ServiceDetailContent;
  relatedServices: RelatedService[];
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

export function NuvikServicePage({
  service,
  content,
  relatedServices,
}: NuvikServicePageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

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

      <section className={`${styles.productHero} ${styles.serviceDetailHero}`}>
        <Link href="/#servicios" className={styles.productBack}>
          <ArrowLeft size={17} /> Volver a servicios
        </Link>
        <div className={styles.productHeroCopy}>
          <p className={styles.monoLabel}>
            {service.category} / {service.index}
          </p>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <div className={styles.serviceHeroActions}>
            <button type="button" onClick={() => setContactOpen(true)}>
              Cotizar {service.name} <ArrowUpRight size={18} />
            </button>
            <a href="https://cal.com/nuvik.digital/15min" target="_blank" rel="noreferrer">
              Agenda una reunión <ArrowUpRight size={17} />
            </a>
          </div>
          <ul className={styles.serviceHeroBenefits} aria-label="Beneficios principales">
            {content.heroBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
        <div className={styles.productHeroVisual}>
          <Image
            src={service.image}
            alt={`Vista conceptual de ${service.name}`}
            fill
            priority
            className={
              service.image === "/assets/sections/dar-io-showcase-2026-06-23.webp"
                ? styles.productImageContain
                : undefined
            }
            quality={92}
            sizes="(max-width: 900px) calc(100vw - 40px), 58vw"
          />
          <div className={styles.visualStamp}>
            <Image src="/assets/logos/nuvik-symbol.webp" alt="" width={52} height={52} />
            <span>{service.name}</span>
            <small>{content.heroBenefits.slice(0, 2).join(" / ")}</small>
          </div>
        </div>
      </section>

      <section className={styles.serviceClaritySection}>
        <article>
          <span>01</span>
          <p className={styles.kicker}>Problema</p>
          <h2>{content.problemTitle}</h2>
          <p>{content.problemBody}</p>
        </article>
        <article>
          <span>02</span>
          <p className={styles.kicker}>Solución</p>
          <h2>{content.solutionTitle}</h2>
          <p>{content.solutionBody}</p>
        </article>
        <article>
          <span>03</span>
          <p className={styles.kicker}>{content.aiSummaryTitle}</p>
          <h2>{content.serviceType}</h2>
          <p>{content.aiSummaryBody}</p>
        </article>
      </section>

      <section className={styles.serviceFitSection}>
        <div className={styles.serviceSectionIntro}>
          <p className={styles.kicker}>Cuándo tiene sentido</p>
          <h2>{content.fitTitle}</h2>
          <p>{content.fitBody}</p>
        </div>
        <div className={styles.serviceSignalList}>
          {content.signals.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.serviceDeliverablesSection}>
        <div className={styles.serviceSectionIntro}>
          <p className={styles.kicker}>Qué entregamos</p>
          <h2>{content.deliverablesTitle}</h2>
          <p>{content.deliverablesBody}</p>
        </div>
        <div className={styles.serviceDeliverableGrid}>
          {content.deliverables.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.serviceOutcomeSection}>
        <div className={styles.serviceSectionIntro}>
          <p className={styles.kicker}>Beneficios y casos de uso</p>
          <h2>{content.benefitsTitle}</h2>
          <p>{content.benefitsBody}</p>
        </div>
        <div className={styles.serviceOutcomeGrid}>
          <div>
            <p className={styles.kicker}>Beneficios</p>
            {content.benefits.map(([title, body], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div>
            <p className={styles.kicker}>Casos de uso</p>
            {content.useCases.map(([title, body], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.serviceProcessSection}>
        <div className={styles.serviceSectionIntro}>
          <p className={styles.kicker}>Cómo lo construimos</p>
          <h2>{content.processTitle}</h2>
          <p>{content.processBody}</p>
        </div>
        <div className={styles.serviceProcessList}>
          {content.process.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.serviceApproachSection}>
        <div>
          <p className={styles.kicker}>Enfoque tecnico</p>
          <h2>{content.approachTitle}</h2>
          <p>{content.approachBody}</p>
        </div>
        <div className={styles.serviceApproachList}>
          {content.approachItems.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.serviceMediaSection}>
        <div className={styles.serviceMediaHeading}>
          <p className={styles.kicker}>El resultado</p>
          <h2>Diseño, lógica y operación en una experiencia coherente.</h2>
        </div>
        <div className={styles.serviceMediaGrid}>
          {content.gallery.map((item) => (
            <figure key={item.title}>
              <div className={styles.serviceMediaVisual}>
                <Image
                  src={item.image}
                  alt={`${service.name}: ${item.title}`}
                  fill
                  quality={90}
                  loading="lazy"
                  sizes="(max-width: 720px) calc(100vw - 40px), 48vw"
                />
              </div>
              <figcaption>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.serviceFaqSection}>
        <div className={styles.serviceFaqHeading}>
          <p className={styles.kicker}>Antes de comenzar</p>
          <h2>Preguntas frecuentes sobre {service.name.toLowerCase()}.</h2>
        </div>
        <div className={styles.serviceDetailFaqs}>
          {content.faqs.map(([question, answer], index) => {
            const isOpen = openFaq === index;
            return (
              <article key={question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  <span>{question}</span>
                  <ChevronDown
                    className={isOpen ? styles.chevronOpen : ""}
                    size={22}
                    strokeWidth={1.4}
                  />
                </button>
                <div className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerOpen : ""}`}>
                  <p>{answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.serviceRelatedSection}>
        <div className={styles.serviceRelatedHeading}>
          <p className={styles.kicker}>Servicios relacionados</p>
          <h2>Una solución puede necesitar más de una disciplina.</h2>
        </div>
        <div className={styles.serviceRelatedList}>
          {relatedServices.map((related, index) => (
            <Link href={`/servicios/${related.slug}`} key={related.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>{related.category}</small>
                <h3>{related.name}</h3>
                <p>{related.summary}</p>
              </div>
              <ArrowUpRight size={24} strokeWidth={1.3} />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.serviceFinalCta}>
        <div>
          <p className={styles.kicker}>Siguiente paso</p>
          <h2>{content.ctaTitle}</h2>
          <p>{content.ctaBody}</p>
        </div>
        <div className={styles.serviceFinalActions}>
          <button type="button" onClick={() => setContactOpen(true)}>
            Cotiza ahora <ArrowUpRight size={18} />
          </button>
          <a href="https://cal.com/nuvik.digital/15min" target="_blank" rel="noreferrer">
            Agenda una reunión <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <Link className={styles.productReturn} href="/#servicios">
        Ver todos los servicios <ArrowRight size={18} />
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
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setContactOpen(true);
            }}
          >
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
        context={service.name}
      />
    </main>
  );
}
