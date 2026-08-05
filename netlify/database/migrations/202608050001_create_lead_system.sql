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

-- Upgrade the original pagweb1 lead table in place. The first production
-- version used Spanish column names, so every new column is added before any
-- index references it and legacy rows are backfilled without being deleted.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS external_id VARCHAR(64);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS tenant_id VARCHAR(64) DEFAULT 'nuvik';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS full_name VARCHAR(100);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company VARCHAR(150);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS inquiry_type VARCHAR(120) DEFAULT 'Consulta general';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status VARCHAR(24) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'won', 'lost', 'archived'));
ALTER TABLE leads ADD COLUMN IF NOT EXISTS consent_contact BOOLEAN DEFAULT FALSE;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS privacy_version VARCHAR(32);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS consented_at TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS referrer_host VARCHAR(253);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS landing_path VARCHAR(300);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS nexus_synced BOOLEAN DEFAULT FALSE;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS nexus_lead_id VARCHAR(100);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS nexus_sync_attempted_at TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS nexus_sync_error_code VARCHAR(50);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS retention_delete_after TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '365 days');
ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE leads ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

UPDATE leads
SET external_id = COALESCE(external_id, 'legacy-' || id::text),
    tenant_id = COALESCE(tenant_id, 'nuvik'),
    inquiry_type = COALESCE(inquiry_type, 'Consulta general'),
    status = COALESCE(status, 'new'),
    consent_contact = COALESCE(consent_contact, FALSE),
    privacy_version = COALESCE(privacy_version, 'legacy-v1'),
    nexus_synced = COALESCE(nexus_synced, FALSE),
    retention_delete_after = COALESCE(retention_delete_after, created_at + INTERVAL '365 days'),
    updated_at = COALESCE(updated_at, created_at);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'nombre') THEN
    EXECUTE 'UPDATE leads SET full_name = COALESCE(full_name, nombre), company = COALESCE(company, negocio), inquiry_type = COALESCE(tipo, inquiry_type), message = COALESCE(message, mensaje)';
  END IF;
END $$;

ALTER TABLE leads ALTER COLUMN external_id SET NOT NULL;
ALTER TABLE leads ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE leads ALTER COLUMN full_name SET NOT NULL;
ALTER TABLE leads ALTER COLUMN message SET NOT NULL;
ALTER TABLE leads ALTER COLUMN status SET NOT NULL;
ALTER TABLE leads ALTER COLUMN consent_contact SET NOT NULL;
ALTER TABLE leads ALTER COLUMN privacy_version SET NOT NULL;
ALTER TABLE leads ALTER COLUMN nexus_synced SET NOT NULL;
ALTER TABLE leads ALTER COLUMN retention_delete_after SET NOT NULL;
ALTER TABLE leads ALTER COLUMN updated_at SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_external_id ON leads (external_id);

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
