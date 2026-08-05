CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  external_id VARCHAR(64) NOT NULL UNIQUE,
  tenant_id VARCHAR(64) NOT NULL DEFAULT 'nuvik',
  source VARCHAR(50) NOT NULL DEFAULT 'pagweb1',
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  company VARCHAR(150),
  inquiry_type VARCHAR(120) NOT NULL DEFAULT 'Consulta general',
  message TEXT NOT NULL,
  status VARCHAR(24) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'won', 'lost', 'archived')),
  consent_contact BOOLEAN NOT NULL DEFAULT FALSE,
  privacy_version VARCHAR(32) NOT NULL,
  consented_at TIMESTAMPTZ,
  ip_hash VARCHAR(64),
  utm_source VARCHAR(120),
  utm_medium VARCHAR(120),
  utm_campaign VARCHAR(120),
  utm_content VARCHAR(120),
  referrer_host VARCHAR(253),
  landing_path VARCHAR(300),
  device_type VARCHAR(20),
  nexus_synced BOOLEAN NOT NULL DEFAULT FALSE,
  nexus_lead_id VARCHAR(100),
  nexus_sync_attempted_at TIMESTAMPTZ,
  nexus_sync_error_code VARCHAR(50),
  retention_delete_after TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '365 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_leads_tenant_created ON leads (tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email_created ON leads (email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_ip_hash_created ON leads (ip_hash, created_at DESC) WHERE ip_hash IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_status_created ON leads (status, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_leads_retention ON leads (retention_delete_after) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_leads_nexus_sync ON leads (nexus_synced, created_at) WHERE nexus_synced = FALSE;

CREATE TABLE IF NOT EXISTS lead_events (
  id BIGSERIAL PRIMARY KEY,
  lead_id BIGINT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('received', 'nexus_synced', 'nexus_sync_failed', 'status_changed', 'exported', 'deleted')),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_events_lead_created ON lead_events (lead_id, created_at DESC);

COMMENT ON TABLE leads IS 'Solicitudes comerciales minimizadas de NUVIK; no guarda IP directa, RUT, ubicación precisa ni datos sensibles.';
COMMENT ON COLUMN leads.ip_hash IS 'Hash irreversible usado solo para prevención de abuso.';
COMMENT ON COLUMN leads.retention_delete_after IS 'Fecha objetivo de revisión/eliminación; valor por defecto 365 días.';
