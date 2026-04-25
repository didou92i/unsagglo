-- Multi-theme support for the participatory platform.
-- Agents can now select up to 3 themes per contribution.
-- The legacy `theme` column keeps the primary theme (first selected) for
-- backward compatibility with existing admin views and downstream consumers.

ALTER TABLE public.contributions_elections
  ADD COLUMN IF NOT EXISTS themes text[] NOT NULL DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_contributions_themes
  ON public.contributions_elections USING gin (themes);

-- Backfill existing rows: copy the legacy theme into the array so historical
-- contributions are surfaced consistently in the new admin UI.
UPDATE public.contributions_elections
SET themes = ARRAY[theme]
WHERE cardinality(themes) = 0 AND theme IS NOT NULL AND theme <> '';
