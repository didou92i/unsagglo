-- Feedback loop on contributions: track where each contribution stands in the
-- syndicate workflow, expose this publicly via a curated view, and surface the
-- direction's response when there is one. Tue le sentiment "ça part dans le vide".

ALTER TABLE public.contributions_elections
  ADD COLUMN IF NOT EXISTS statut_traitement text NOT NULL DEFAULT 'recue'
    CHECK (statut_traitement IN (
      'recue',
      'analysee',
      'portee_cst',
      'obtenue',
      'refusee',
      'en_negociation'
    )),
  ADD COLUMN IF NOT EXISTS cst_date date,
  ADD COLUMN IF NOT EXISTS reponse_direction text,
  ADD COLUMN IF NOT EXISTS derniere_maj timestamptz NOT NULL DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_contributions_statut_traitement
  ON public.contributions_elections(statut_traitement);
CREATE INDEX IF NOT EXISTS idx_contributions_derniere_maj
  ON public.contributions_elections(derniere_maj DESC);

CREATE OR REPLACE FUNCTION public.touch_contribution_updated()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.derniere_maj := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS contributions_set_updated ON public.contributions_elections;
CREATE TRIGGER contributions_set_updated
  BEFORE UPDATE ON public.contributions_elections
  FOR EACH ROW EXECUTE FUNCTION public.touch_contribution_updated();

-- Public-facing view. Anonymises identity (prenom hidden when anonyme) and
-- never exposes the technical id, so the table can keep its admin-only RLS
-- while the wall stays fully transparent.
CREATE OR REPLACE VIEW public.public_contributions_feed
WITH (security_invoker = false)
AS
SELECT
  id,
  CASE WHEN anonyme THEN NULL ELSE prenom END AS prenom,
  service,
  statut,
  theme,
  themes,
  contenu,
  anonyme,
  created_at,
  statut_traitement,
  cst_date,
  reponse_direction,
  derniere_maj
FROM public.contributions_elections;

GRANT SELECT ON public.public_contributions_feed TO anon, authenticated;
