"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import styles from "./NuvikHome.module.css";

type NuvikContactPanelProps = {
  open: boolean;
  onClose: () => void;
  context?: string;
};

export function NuvikContactPanel({ open, onClose, context }: NuvikContactPanelProps) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: conectar este formulario a un endpoint real de contacto cuando se defina el proveedor de envío.
    setSent(true);
  }

  return (
    <div
      className={`${styles.contactOverlay} ${open ? styles.contactOverlayOpen : ""}`}
      aria-hidden={!open}
    >
      <button
        className={styles.contactBackdrop}
        type="button"
        aria-label="Cerrar formulario de cotización"
        onClick={onClose}
      />
      <section className={styles.contactPanel} role="dialog" aria-modal="true" aria-labelledby="contact-panel-title">
        <div className={styles.contactPanelHeader}>
          <span className={`${styles.logoLockup} ${styles.logoLight}`}>
            <Image src="/assets/logos/nuvik-symbol-white.png" alt="" width={36} height={36} />
            <span>NUVIK</span>
          </span>
          <button type="button" onClick={onClose} aria-label="Cerrar cotización">
            <X size={25} />
          </button>
        </div>

        <div className={styles.contactPanelBody}>
          <div className={styles.contactPanelIntro}>
            <p className={styles.kicker}>{context ? `Cotiza ${context}` : "Cotiza tu proyecto"}</p>
            <h2 id="contact-panel-title">
              {context ? `Conversemos sobre ${context}.` : "Construyamos algo que mueva tu negocio."}
            </h2>
            <p>
              Cuéntanos qué necesitas, qué objetivo quieres alcanzar y qué está ocurriendo hoy.
              Revisaremos el contexto antes de proponerte un alcance.
            </p>
          </div>

          {sent ? (
            <div className={styles.contactPanelSuccess} role="status">
              <Image src="/assets/logos/nuvik-symbol.webp" alt="" width={52} height={52} />
              <p className={styles.monoLabel}>SOLICITUD PREPARADA</p>
              <h3>Tu solicitud quedó lista.</h3>
              <p>
                Para cerrar los detalles, escríbenos a{" "}
                <a href="mailto:contacto@nuvik.digital">contacto@nuvik.digital</a>.
              </p>
              <button type="button" onClick={onClose}>Cerrar</button>
            </div>
          ) : (
            <form className={styles.contactPanelForm} onSubmit={handleSubmit}>
              {context ? <input name="service" type="hidden" value={context} /> : null}
              <label>
                Nombre
                <input name="name" required placeholder="Tu nombre" autoFocus={open} />
              </label>
              <label>
                Email
                <input name="email" type="email" required placeholder="tu@email.com" />
              </label>
              <label>
                Empresa
                <input name="company" placeholder="Nombre de tu empresa" />
              </label>
              <label>
                ¿Qué necesitas construir?
                <textarea
                  name="message"
                  required
                  placeholder={
                    context
                      ? `Cuéntanos qué necesitas resolver con ${context.toLowerCase()}`
                      : "Cuéntanos sobre el proyecto, objetivo y plazo"
                  }
                  rows={5}
                />
              </label>
              <button type="submit">
                Preparar solicitud <ArrowUpRight size={18} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
