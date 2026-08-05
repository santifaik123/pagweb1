import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";

const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com", "dispostable.com", "guerrillamail.com", "maildrop.cc",
  "mailinator.com", "sharklasers.com", "temp-mail.org", "tempemail.com",
  "tempmail.com", "trashmail.com", "yopmail.com",
]);

const SPAM_TERMS = [
  "buy backlinks", "casino", "crypto investment", "forex", "guest post",
  "link building", "payday loan", "seo package", "viagra",
];

let schemaPromise;

function json(status, body, origin = "") {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return new Response(JSON.stringify(body), { status, headers });
}

function clean(value, maxLength) {
  if (value === null || value === undefined) return null;
  const result = String(value).trim().slice(0, maxLength);
  return result || null;
}

function allowedOrigin(request, context) {
  const origin = request.headers.get("origin") || "";
  if (!origin) return "";
  try {
    const hostname = new URL(origin).hostname;
    const requestHost = new URL(request.url).hostname;
    const siteHost = context.site?.url ? new URL(context.site.url).hostname : "";
    if (
      hostname === "nuvik.digital" ||
      hostname === "www.nuvik.digital" ||
      hostname === requestHost ||
      hostname === siteHost ||
      hostname.endsWith("--nuvikdigital.netlify.app")
    ) return origin;
  } catch {
    return "";
  }
  return "";
}

async function ensureSchema(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id BIGSERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      email VARCHAR(254) NOT NULL,
      negocio VARCHAR(150),
      tipo VARCHAR(120),
      mensaje TEXT NOT NULL,
      source VARCHAR(50) NOT NULL DEFAULT 'nuvik_web',
      ip_hash VARCHAR(64),
      utm_source VARCHAR(120),
      utm_medium VARCHAR(120),
      utm_campaign VARCHAR(120),
      utm_content VARCHAR(120),
      referrer_url VARCHAR(500),
      landing_page VARCHAR(500),
      device_type VARCHAR(20),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await Promise.all([
    sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS ip_hash VARCHAR(64)`,
    sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_source VARCHAR(120)`,
    sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(120)`,
    sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(120)`,
    sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_content VARCHAR(120)`,
    sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS referrer_url VARCHAR(500)`,
    sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS landing_page VARCHAR(500)`,
    sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS device_type VARCHAR(20)`,
  ]);
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_email_created ON leads (email, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_ip_hash_created ON leads (ip_hash, created_at DESC)`;
}

const handler = async (request, context) => {
  const origin = allowedOrigin(request, context);

  if (request.method === "OPTIONS") {
    if (!origin) return json(403, { ok: false, error: "Origen no permitido" });
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") return json(405, { ok: false, error: "Método no permitido" }, origin);
  if (!origin) return json(403, { ok: false, error: "Origen no permitido" });

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return json(415, { ok: false, error: "Formato no permitido" }, origin);

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > 12_000) return json(413, { ok: false, error: "Solicitud demasiado grande" }, origin);

  let data;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return json(400, { ok: false, error: "Solicitud inválida" }, origin);
  }

  if (clean(data.website_hp, 200)) return json(200, { ok: true }, origin);
  const elapsed = Date.now() - Number(data._t || 0);
  if (!Number.isFinite(elapsed) || elapsed < 2500) return json(200, { ok: true }, origin);

  const nombre = clean(data.nombre, 100);
  const email = clean(data.email, 254)?.toLowerCase();
  const negocio = clean(data.negocio, 150);
  const tipo = clean(data.tipo, 120) || "Consulta general";
  const mensaje = clean(data.mensaje, 2000);

  if (!nombre || nombre.length < 2 || !mensaje || mensaje.length < 10 || !email) {
    return json(422, { ok: false, error: "Completa nombre, email y un mensaje de al menos 10 caracteres." }, origin);
  }

  if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)) return json(422, { ok: false, error: "Ingresa un email válido." }, origin);
  if (DISPOSABLE_DOMAINS.has(email.split("@")[1])) return json(422, { ok: false, error: "Usa un email permanente para que podamos responderte." }, origin);

  const combined = `${nombre} ${negocio || ""} ${tipo} ${mensaje}`;
  if (/<[^>]+>/.test(combined)) return json(422, { ok: false, error: "El mensaje contiene contenido no permitido." }, origin);
  if ((mensaje.match(/https?:\/\/|www\./gi) || []).length > 1) return json(422, { ok: false, error: "El mensaje contiene demasiados enlaces." }, origin);
  if (SPAM_TERMS.some((term) => combined.toLowerCase().includes(term))) return json(200, { ok: true }, origin);

  if (!process.env.DATABASE_URL) {
    console.error("create-lead: DATABASE_URL is not configured");
    return json(503, { ok: false, error: "El formulario está temporalmente fuera de servicio." }, origin);
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    schemaPromise ||= ensureSchema(sql);
    await schemaPromise;

    const hashSalt = process.env.LEAD_HASH_SALT || context.site?.id || "nuvik-digital";
    const ipHash = context.ip ? createHash("sha256").update(`${hashSalt}:${context.ip}`).digest("hex") : null;

    const [emailRate] = await sql`
      SELECT COUNT(*)::int AS count FROM leads
      WHERE email = ${email} AND created_at > NOW() - INTERVAL '24 hours'
    `;
    if (emailRate.count >= 3) return json(429, { ok: false, error: "Ya recibimos varias solicitudes con este email. Intenta mañana." }, origin);

    if (ipHash) {
      const [ipRate] = await sql`
        SELECT COUNT(*)::int AS count FROM leads
        WHERE ip_hash = ${ipHash} AND created_at > NOW() - INTERVAL '1 hour'
      `;
      if (ipRate.count >= 5) return json(429, { ok: false, error: "Demasiadas solicitudes. Intenta más tarde." }, origin);
    }

    await sql`
      INSERT INTO leads (
        nombre, email, negocio, tipo, mensaje, source, ip_hash,
        utm_source, utm_medium, utm_campaign, utm_content,
        referrer_url, landing_page, device_type
      ) VALUES (
        ${nombre}, ${email}, ${negocio}, ${tipo}, ${mensaje}, ${"pagweb1"}, ${ipHash},
        ${clean(data.utm_source, 120)}, ${clean(data.utm_medium, 120)},
        ${clean(data.utm_campaign, 120)}, ${clean(data.utm_content, 120)},
        ${clean(data.referrer, 500)}, ${clean(data.landing_page, 500)}, ${clean(data.device, 20)}
      )
    `;
    return json(200, { ok: true }, origin);
  } catch (error) {
    schemaPromise = undefined;
    console.error("create-lead failed", error instanceof Error ? error.message : error);
    return json(500, { ok: false, error: "No pudimos guardar tu solicitud. Intenta nuevamente." }, origin);
  }
};

export default handler;

export const config = {
  path: "/.netlify/functions/create-lead",
  method: ["POST", "OPTIONS"],
  rateLimit: { action: "rate_limit", aggregateBy: ["ip", "domain"], windowSize: 60, windowLimit: 10 },
};
