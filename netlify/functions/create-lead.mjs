import { createHash, randomUUID } from "node:crypto";
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

const NEXUS_INGEST_URL = "https://nexuschat-cgat.onrender.com/api/intake/leads";
const PRIVACY_VERSION = "2026-08-04";

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
  const result = String(value).replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
  return result || null;
}

function cleanPath(value) {
  const raw = clean(value, 300);
  if (!raw) return null;
  try {
    const url = new URL(raw, "https://nuvik.digital");
    return url.pathname.slice(0, 300);
  } catch {
    return raw.startsWith("/") ? raw : null;
  }
}

function cleanReferrerHost(value) {
  const raw = clean(value, 500);
  if (!raw) return null;
  try {
    return new URL(raw).hostname.slice(0, 253);
  } catch {
    return null;
  }
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

function validSubmissionId(value) {
  const candidate = clean(value, 64);
  return candidate && /^[a-zA-Z0-9_-]{16,64}$/.test(candidate) ? candidate : randomUUID();
}

async function syncToNexus(lead) {
  const secret = process.env.NEXUS_INGEST_SECRET;
  if (!secret) return { ok: false, code: "not_configured" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(process.env.NEXUS_INGEST_URL || NEXUS_INGEST_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
      signal: controller.signal,
    });
    if (!response.ok) return { ok: false, code: `http_${response.status}` };
    const result = await response.json();
    return { ok: true, id: clean(result.id, 100) };
  } catch (error) {
    return { ok: false, code: error?.name === "AbortError" ? "timeout" : "network_error" };
  } finally {
    clearTimeout(timer);
  }
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
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return json(415, { ok: false, error: "Formato no permitido" }, origin);
  }

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

  const fullName = clean(data.nombre, 100);
  const email = clean(data.email, 254)?.toLowerCase();
  const company = clean(data.negocio, 150);
  const inquiryType = clean(data.tipo, 120) || "Consulta general";
  const message = clean(data.mensaje, 2000);
  const consentContact = data.consent_contact === true;

  if (!fullName || fullName.length < 2 || !message || message.length < 10 || !email) {
    return json(422, { ok: false, error: "Completa nombre, email y un mensaje de al menos 10 caracteres." }, origin);
  }
  if (!consentContact) return json(422, { ok: false, error: "Confirma que podemos responder tu solicitud." }, origin);
  if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)) return json(422, { ok: false, error: "Ingresa un email válido." }, origin);
  if (DISPOSABLE_DOMAINS.has(email.split("@")[1])) return json(422, { ok: false, error: "Usa un email permanente para que podamos responderte." }, origin);

  const combined = `${fullName} ${company || ""} ${inquiryType} ${message}`;
  if (/<[^>]+>/.test(combined)) return json(422, { ok: false, error: "El mensaje contiene contenido no permitido." }, origin);
  if ((message.match(/https?:\/\/|www\./gi) || []).length > 1) return json(422, { ok: false, error: "El mensaje contiene demasiados enlaces." }, origin);
  if (SPAM_TERMS.some((term) => combined.toLowerCase().includes(term))) return json(200, { ok: true }, origin);

  const databaseUrl = process.env.NETLIFY_DB_URL || process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("create-lead: database_not_configured");
    return json(503, { ok: false, error: "El formulario está temporalmente fuera de servicio." }, origin);
  }

  const externalId = validSubmissionId(data.submission_id);
  const hashSalt = process.env.LEAD_HASH_SALT || context.site?.id || "nuvik-digital";
  const ipHash = context.ip ? createHash("sha256").update(`${hashSalt}:${context.ip}`).digest("hex") : null;
  const campaign = {
    source: clean(data.utm_source, 120),
    medium: clean(data.utm_medium, 120),
    name: clean(data.utm_campaign, 120),
    content: clean(data.utm_content, 120),
  };
  const landingPath = cleanPath(data.landing_page);
  const referrerHost = cleanReferrerHost(data.referrer);
  const deviceType = ["mobile", "desktop", "tablet"].includes(data.device) ? data.device : null;

  try {
    const sql = neon(databaseUrl);
    const [emailRate] = await sql`
      SELECT COUNT(*)::int AS count FROM leads
      WHERE email = ${email} AND created_at > NOW() - INTERVAL '24 hours' AND deleted_at IS NULL
    `;
    if (emailRate.count >= 3) return json(429, { ok: false, error: "Ya recibimos varias solicitudes con este email. Intenta mañana." }, origin);

    if (ipHash) {
      const [ipRate] = await sql`
        SELECT COUNT(*)::int AS count FROM leads
        WHERE ip_hash = ${ipHash} AND created_at > NOW() - INTERVAL '1 hour' AND deleted_at IS NULL
      `;
      if (ipRate.count >= 5) return json(429, { ok: false, error: "Demasiadas solicitudes. Intenta más tarde." }, origin);
    }

    const [stored] = await sql`
      INSERT INTO leads (
        external_id, tenant_id, source, full_name, email, company, inquiry_type, message,
        consent_contact, privacy_version, consented_at, ip_hash,
        utm_source, utm_medium, utm_campaign, utm_content,
        referrer_host, landing_path, device_type
      ) VALUES (
        ${externalId}, ${"nuvik"}, ${"pagweb1"}, ${fullName}, ${email}, ${company}, ${inquiryType}, ${message},
        ${true}, ${PRIVACY_VERSION}, NOW(), ${ipHash},
        ${campaign.source}, ${campaign.medium}, ${campaign.name}, ${campaign.content},
        ${referrerHost}, ${landingPath}, ${deviceType}
      )
      ON CONFLICT (external_id) DO UPDATE SET updated_at = NOW()
      RETURNING id, external_id, nexus_synced
    `;

    await sql`
      INSERT INTO lead_events (lead_id, event_type, metadata)
      VALUES (${stored.id}, ${"received"}, ${JSON.stringify({ source: "pagweb1" })}::jsonb)
    `;

    let sync = { ok: Boolean(stored.nexus_synced), code: stored.nexus_synced ? "already_synced" : "pending" };
    if (!stored.nexus_synced) {
      sync = await syncToNexus({
        externalId: stored.external_id,
        tenantId: "nuvik",
        source: "pagweb1",
        name: fullName,
        email,
        company,
        inquiryType,
        message,
        campaignSource: campaign.source,
        campaignMedium: campaign.medium,
        campaignName: campaign.name,
        landingPath,
        consentAt: new Date().toISOString(),
        privacyVersion: PRIVACY_VERSION,
      });

      await sql`
        UPDATE leads SET
          nexus_synced = ${sync.ok},
          nexus_lead_id = ${sync.id || null},
          nexus_sync_attempted_at = NOW(),
          nexus_sync_error_code = ${sync.ok ? null : sync.code},
          updated_at = NOW()
        WHERE id = ${stored.id}
      `;
      await sql`
        INSERT INTO lead_events (lead_id, event_type, metadata)
        VALUES (${stored.id}, ${sync.ok ? "nexus_synced" : "nexus_sync_failed"}, ${JSON.stringify({ code: sync.code || "ok" })}::jsonb)
      `;
    }

    return json(200, { ok: true, reference: stored.external_id }, origin);
  } catch (error) {
    console.error("create-lead failed", error instanceof Error ? error.name : "unknown_error");
    return json(500, { ok: false, error: "No pudimos guardar tu solicitud. Intenta nuevamente." }, origin);
  }
};

export default handler;

export const config = {
  path: "/.netlify/functions/create-lead",
  method: ["POST", "OPTIONS"],
  rateLimit: { action: "rate_limit", aggregateBy: ["ip", "domain"], windowSize: 60, windowLimit: 10 },
};
