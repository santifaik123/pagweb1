"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import posthog from "posthog-js";
import { FormEvent, useEffect, useRef, useState } from "react";

import styles from "./NuvikHome.module.css";

type NuvikContactPanelProps = {
  open: boolean;
  onClose: () => void;
  context?: string;
};

export function NuvikContactPanel({ open, onClose, context }: NuvikContactPanelProps) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const openedAt = useRef(0);

  useEffect(() => {
    if (!open) return;

    openedAt.current = Date.now();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const search = new URLSearchParams(window.location.search);
    const payload = {
      submission_id: globalThis.crypto?.randomUUID?.() || `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      nombre: formData.get("name"),
      email: formData.get("email"),
      negocio: formData.get("company"),
      tipo: formData.get("service") || context || "Consulta general",
      mensaje: formData.get("message"),
      website_hp: formData.get("website_hp"),
      _t: openedAt.current,
      utm_source: search.get("utm_source"),
      utm_medium: search.get("utm_medium"),
      utm_campaign: search.get("utm_campaign"),
      utm_content: search.get("utm_content"),
      consent_contact: formData.get("consent_contact") === "yes",
      referrer: document.referrer,
      landing_page: window.location.pathname,
      device: window.matchMedia("(max-width: 760px)").matches ? "mobile" : "desktop",
    };

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/.netlify/functions/create-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "No pudimos enviar tu solicitud.");

      setSent(true);
      form.reset();
      posthog.capture("quote_form_submitted", { service: payload.tipo });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "No pudimos enviar tu solicitud.");
      posthog.capture("quote_form_error", { service: payload.tipo });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`${styles.contactOverlay} ${open ? styles.contactOverlayOpen : ""}`} aria-hidden={!open}>
      <button className={styles.contactBackdrop} type="button" aria-label="Cerrar formulario de cotización" onClick={onClose} />
      <section className={styles.contactPanel} role="dialog" aria-modal="true" aria-labelledby="contact-panel-title">
        <div className={styles.contactPanelHeader}>
          <span className={`${styles.logoLockup} ${styles.logoLight}`}>
            <Image src="/assets/logos/nuvik-symbol-white.png" alt="" width={36} height={36} />
            <span>NUVIK</span>
          </span>
          <button type="button" onClick={onClose} aria-label="Cerrar cotización"><X size={25} /></button>
        </div>

        <div className={styles.contactPanelBody}>
          <div className={styles.contactPanelIntro}>
            <p className={styles.kicker}>{context ? `Cotiza ${context}` : "Cotiza tu proyecto"}</p>
            <h2 id="contact-panel-title">{context ? `Conversemos sobre ${context}.` : "Construyamos algo que mueva tu negocio."}</h2>
            <p>Cuéntanos qué necesitas, qué objetivo quieres alcanzar y qué está ocurriendo hoy. Revisaremos el contexto antes de proponerte un alcance.</p>
          </div>

          {sent ? (
            <div className={styles.contactPanelSuccess} role="status">
              <Image src="/assets/logos/nuvik-symbol.webp" alt="" width={52} height={52} />
              <p className={styles.monoLabel}>SOLICITUD RECIBIDA</p>
              <h3>Gracias. Ya tenemos tu solicitud.</h3>
              <p>La revisaremos y responderemos al email que indicaste. También puedes escribir a <a href="mailto:contacto@nuvik.digital">contacto@nuvik.digital</a>.</p>
              <button type="button" onClick={onClose}>Cerrar</button>
            </div>
          ) : (
            <form className={styles.contactPanelForm} onSubmit={handleSubmit}>
              {context ? <input name="service" type="hidden" value={context} /> : null}
              <div className={styles.contactHoneypot} aria-hidden="true">
                <label htmlFor="website_hp">Sitio web</label>
                <input id="website_hp" name="website_hp" tabIndex={-1} autoComplete="off" />
              </div>
              <label>Nombre<input name="name" required placeholder="Tu nombre" autoFocus={open} minLength={2} maxLength={100} /></label>
              <label>Email<input name="email" type="email" required placeholder="tu@email.com" maxLength={254} /></label>
              <label>Empresa<input name="company" placeholder="Nombre de tu empresa" maxLength={150} /></label>
              <label>
                ¿Qué necesitas construir?
                <textarea name="message" required minLength={10} maxLength={2000} placeholder={context ? `Cuéntanos qué necesitas resolver con ${context.toLowerCase()}` : "Cuéntanos sobre el proyecto, objetivo y plazo"} rows={5} />
              </label>
              <label className={styles.contactConsent}>
                <input name="consent_contact" type="checkbox" value="yes" required />
                <span>Acepto que NUVIK use estos datos únicamente para responder esta solicitud. <a href="/privacidad" target="_blank" rel="noreferrer">Ver privacidad</a>.</span>
              </label>
              {error ? <p className={styles.contactPanelError} role="alert">{error}</p> : null}
              <button type="submit" disabled={submitting}>{submitting ? "Enviando…" : "Enviar solicitud"} <ArrowUpRight size={18} /></button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
