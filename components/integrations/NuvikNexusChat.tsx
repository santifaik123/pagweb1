"use client";

import Image from "next/image";
import { MessageSquareText, Send, X } from "lucide-react";
import posthog from "posthog-js";
import { FormEvent, useEffect, useRef, useState } from "react";

import styles from "./NuvikNexusChat.module.css";

const SERVER_URL = "https://nexuschat-cgat.onrender.com";
const TENANT_ID = "nuvik";

type ChatMessage = { id: string; role: "assistant" | "user"; text: string };
type ChatResponse = { sessionId?: string; message?: string; suggestions?: string[]; error?: string };

function createId() {
  return globalThis.crypto?.randomUUID?.() || `nuvik-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getSessionId() {
  const current = sessionStorage.getItem("nuvik_nexus_session");
  if (current) return current;
  const created = createId();
  sessionStorage.setItem("nuvik_nexus_session", created);
  return created;
}

export function NuvikNexusChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [suggestions, setSuggestions] = useState(["Ver servicios", "Solicitar una cotización", "Conocer NexusChat"]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", text: "Hola, soy Nuvi. Puedo orientarte sobre servicios, productos y próximos pasos de NUVIK." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, sending]);

  useEffect(() => {
    if (open) posthog.capture("nexus_chat_opened", { tenant: TENANT_ID });
  }, [open]);

  async function sendMessage(text: string) {
    const clean = text.trim().slice(0, 2000);
    if (!clean || sending) return;

    setMessages((current) => [...current, { id: createId(), role: "user", text: clean }]);
    setInput("");
    setSuggestions([]);
    setSending(true);

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 25000);
      const response = await fetch(`${SERVER_URL}/api/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantId: TENANT_ID, sessionId: getSessionId(), message: clean }),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);

      const data = (await response.json()) as ChatResponse;
      if (!response.ok || !data.message) throw new Error(data.error || "No fue posible responder");
      if (data.sessionId) sessionStorage.setItem("nuvik_nexus_session", data.sessionId);

      setMessages((current) => [...current, { id: createId(), role: "assistant", text: data.message as string }]);
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions.slice(0, 4) : []);
      posthog.capture("nexus_chat_message", { tenant: TENANT_ID });
    } catch {
      setMessages((current) => [
        ...current,
        { id: createId(), role: "assistant", text: "No pude conectarme en este momento. Puedes escribirnos a contacto@nuvik.digital." },
      ]);
      posthog.capture("nexus_chat_error", { tenant: TENANT_ID });
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className={styles.shell}>
      {open ? (
        <section className={styles.panel} role="dialog" aria-modal="false" aria-label="Asistente NUVIK">
          <header className={styles.header}>
            <div className={styles.identity}>
              <Image src="/assets/logos/nuvik-symbol-white.png" alt="" width={34} height={34} />
              <div><strong>Nuvi · Asistente NUVIK</strong><span>NexusChat conectado</span></div>
            </div>
            <button className={styles.close} type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat"><X size={20} /></button>
          </header>

          <div className={styles.messages} ref={scrollRef} aria-live="polite">
            {messages.map((message) => (
              <p className={`${styles.message} ${message.role === "user" ? styles.messageUser : ""}`} key={message.id}>{message.text}</p>
            ))}
            {sending ? <span className={styles.typing}>Nuvi está escribiendo…</span> : null}
          </div>

          <div>
            {suggestions.length ? (
              <div className={styles.suggestions} aria-label="Preguntas sugeridas">
                {suggestions.map((suggestion) => (
                  <button className={styles.suggestion} type="button" key={suggestion} onClick={() => void sendMessage(suggestion)}>{suggestion}</button>
                ))}
              </div>
            ) : null}
            <form className={styles.composer} onSubmit={handleSubmit}>
              <div className={styles.composerRow}>
                <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Escribe tu consulta…" maxLength={2000} aria-label="Mensaje para Nuvi" />
                <button className={styles.send} type="submit" disabled={!input.trim() || sending} aria-label="Enviar mensaje"><Send size={18} /></button>
              </div>
              <p className={styles.privacy}>La conversación se procesa en NexusChat para responder tu consulta.</p>
            </form>
          </div>
        </section>
      ) : null}

      <button className={styles.launcher} type="button" onClick={() => setOpen((current) => !current)} aria-label={open ? "Cerrar asistente NUVIK" : "Abrir asistente NUVIK"} aria-expanded={open}>
        {open ? <X size={22} /> : <MessageSquareText size={22} />}
      </button>
    </div>
  );
}
