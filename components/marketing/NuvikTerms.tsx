"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Menu, X } from "lucide-react";
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

function Logo() {
  return (
    <span className={`${styles.logoLockup} ${styles.logoLight}`}>
      <Image src="/assets/logos/nuvik-symbol-white.png" alt="" width={36} height={36} />
      <span>NUVIK</span>
    </span>
  );
}

const sections = [
  {
    title: "Alcance y aceptación",
    body: [
      "Estos términos regulan el acceso al sitio de NUVIK Digital y la contratación de servicios de diseño, desarrollo, automatización, software, consultoría y soporte.",
      "Al solicitar una cotización, aceptar una propuesta o iniciar un proyecto, el cliente declara haber leído y aceptado estos términos. La propuesta comercial o contrato particular prevalecerá cuando establezca condiciones diferentes.",
    ],
  },
  {
    title: "Propuestas y alcance",
    body: [
      "Cada proyecto se define mediante una propuesta que detalla entregables, etapas, plazos estimados, precio y condiciones de pago. Todo trabajo no incluido expresamente se considera fuera de alcance.",
      "Los cambios de alcance pueden modificar costos y fechas. NUVIK informará estos efectos antes de ejecutar trabajo adicional.",
    ],
  },
  {
    title: "Precios y pagos",
    body: [
      "Los valores publicados son referenciales hasta la emisión de una propuesta formal. Los impuestos, licencias, dominios, hosting y servicios de terceros se indicarán cuando correspondan.",
      "El calendario de pagos se establece en cada propuesta. El atraso puede suspender entregas, soporte o publicación hasta regularizar el saldo.",
    ],
  },
  {
    title: "Colaboración del cliente",
    body: [
      "El cliente debe entregar contenidos, accesos, aprobaciones e información necesaria de manera oportuna, y garantiza que cuenta con autorización para usar los materiales proporcionados.",
      "Los retrasos del cliente pueden desplazar el calendario del proyecto sin constituir incumplimiento de NUVIK.",
    ],
  },
  {
    title: "Entregas, revisiones y soporte",
    body: [
      "Las etapas de revisión, número de ajustes y período de soporte se determinan en la propuesta. Una etapa se considera aprobada cuando existe confirmación escrita o cuando vence el plazo de revisión acordado sin observaciones.",
      "El soporte posterior no incluye nuevas funcionalidades, rediseños ni incidencias originadas por modificaciones de terceros, salvo acuerdo expreso.",
    ],
  },
  {
    title: "Propiedad intelectual",
    body: [
      "Una vez pagado íntegramente el proyecto, el cliente recibe los derechos de uso o titularidad indicados en la propuesta sobre los entregables finales.",
      "NUVIK conserva la propiedad de herramientas internas, metodologías, componentes reutilizables, conocimiento previo y materiales de terceros. Salvo pacto de confidencialidad, NUVIK podrá mostrar el trabajo final en su portafolio.",
    ],
  },
  {
    title: "Servicios de terceros",
    body: [
      "Integraciones, plataformas, APIs, pasarelas de pago, hosting y otros servicios externos están sujetos a sus propias condiciones, disponibilidad y tarifas.",
      "NUVIK no controla cambios, interrupciones o decisiones de estos proveedores, pero colaborará razonablemente para diagnosticar y resolver impactos dentro del alcance contratado.",
    ],
  },
  {
    title: "Datos y confidencialidad",
    body: [
      "La información recibida se utilizará para evaluar solicitudes, ejecutar proyectos y mantener comunicaciones comerciales relacionadas. Los datos personales serán tratados conforme a la legislación chilena vigente.",
      "Ambas partes deberán proteger la información confidencial a la que accedan y limitar su uso a la ejecución de la relación comercial.",
    ],
  },
  {
    title: "Responsabilidad",
    body: [
      "NUVIK se compromete a prestar los servicios con diligencia profesional. No garantiza resultados comerciales específicos, posicionamiento, ventas ni disponibilidad ininterrumpida de plataformas de terceros.",
      "Cuando la ley lo permita, la responsabilidad total asociada a un proyecto se limitará al monto efectivamente pagado por el servicio que originó el reclamo.",
    ],
  },
  {
    title: "Ley aplicable y contacto",
    body: [
      "Estos términos se interpretan conforme a las leyes de la República de Chile, sin limitar los derechos irrenunciables que correspondan a consumidores cuando resulten aplicables.",
      "Para consultas legales o comerciales puedes escribir a contacto@nuvik.digital. Intentaremos resolver cualquier diferencia de buena fe antes de recurrir a otras instancias.",
    ],
  },
];

export function NuvikTerms() {
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
            <Link key={label} href={href}>{label}</Link>
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
        <p className={styles.kicker}>Legal</p>
        <h1>Términos y condiciones.</h1>
        <p>Última actualización: 11 de junio de 2026</p>
      </section>

      <div className={styles.legalLayout}>
        <aside>
          <p className={styles.monoLabel}>NUVIK DIGITAL</p>
          <p>Condiciones generales para nuestros servicios y productos digitales.</p>
          <a href="mailto:contacto@nuvik.digital">contacto@nuvik.digital</a>
        </aside>
        <article className={styles.legalContent}>
          <div className={styles.legalLead}>
            <p>
              Queremos que cada proyecto comience con expectativas claras. Este documento explica cómo trabajamos,
              qué puedes esperar de NUVIK y qué necesitamos de nuestros clientes.
            </p>
          </div>
          {sections.map((section, index) => (
            <section className={styles.legalSection} key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
