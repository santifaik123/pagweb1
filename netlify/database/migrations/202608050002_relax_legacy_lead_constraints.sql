-- The original pagweb1 table used `nombre` and `mensaje` as required fields.
-- The canonical privacy-safe schema now stores those values in `full_name`
-- and `message`. Keep the legacy columns and their data, but allow new rows to
-- use only the canonical fields.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'leads'
      AND column_name = 'nombre'
  ) THEN
    ALTER TABLE public.leads ALTER COLUMN nombre DROP NOT NULL;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'leads'
      AND column_name = 'mensaje'
  ) THEN
    ALTER TABLE public.leads ALTER COLUMN mensaje DROP NOT NULL;
  END IF;
END $$;
