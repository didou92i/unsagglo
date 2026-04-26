ALTER TABLE public.adherents
  ADD COLUMN IF NOT EXISTS date_naissance DATE,
  ADD COLUMN IF NOT EXISTS adresse_ligne1 TEXT,
  ADD COLUMN IF NOT EXISTS adresse_ligne2 TEXT,
  ADD COLUMN IF NOT EXISTS adresse_cp TEXT,
  ADD COLUMN IF NOT EXISTS adresse_ville TEXT,
  ADD COLUMN IF NOT EXISTS service_libre TEXT,
  ADD COLUMN IF NOT EXISTS categorie TEXT,
  ADD COLUMN IF NOT EXISTS echelon SMALLINT,
  ADD COLUMN IF NOT EXISTS statut_pro TEXT,
  ADD COLUMN IF NOT EXISTS site_affectation TEXT,
  ADD COLUMN IF NOT EXISTS date_entree_carpf DATE,
  ADD COLUMN IF NOT EXISTS mode_paiement TEXT,
  ADD COLUMN IF NOT EXISTS periodicite_paiement TEXT,
  ADD COLUMN IF NOT EXISTS rgpd_consent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS statuts_acceptes_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

DO $$
DECLARE
  cname text;
BEGIN
  FOR cname IN
    SELECT con.conname
    FROM pg_constraint con
    JOIN pg_class cl ON cl.oid = con.conrelid
    JOIN pg_namespace ns ON ns.oid = cl.relnamespace
    WHERE ns.nspname = 'public'
      AND cl.relname = 'adherents'
      AND con.contype = 'c'
      AND (
        pg_get_constraintdef(con.oid) ILIKE '%statut%'
        OR pg_get_constraintdef(con.oid) ILIKE '%categorie%'
        OR pg_get_constraintdef(con.oid) ILIKE '%echelon%'
        OR pg_get_constraintdef(con.oid) ILIKE '%mode_paiement%'
        OR pg_get_constraintdef(con.oid) ILIKE '%periodicite_paiement%'
      )
  LOOP
    EXECUTE format('ALTER TABLE public.adherents DROP CONSTRAINT %I', cname);
  END LOOP;
END $$;

ALTER TABLE public.adherents
  ALTER COLUMN statut SET DEFAULT 'pending_validation';

ALTER TABLE public.adherents
  ADD CONSTRAINT adherents_statut_check
    CHECK (statut IN ('pending_validation', 'actif', 'resilie')),
  ADD CONSTRAINT adherents_categorie_check
    CHECK (categorie IS NULL OR categorie IN ('A', 'B', 'C')),
  ADD CONSTRAINT adherents_echelon_check
    CHECK (echelon IS NULL OR echelon BETWEEN 1 AND 20),
  ADD CONSTRAINT adherents_statut_pro_check
    CHECK (statut_pro IS NULL OR statut_pro IN ('titulaire', 'stagiaire', 'contractuel_cdi', 'contractuel_cdd', 'apprenti', 'retraite')),
  ADD CONSTRAINT adherents_mode_paiement_check
    CHECK (mode_paiement IS NULL OR mode_paiement IN ('cheque', 'virement', 'sepa', 'stripe_mensuel', 'stripe_annuel')),
  ADD CONSTRAINT adherents_periodicite_paiement_check
    CHECK (periodicite_paiement IS NULL OR periodicite_paiement IN ('mensuel', 'annuel'));

DROP TRIGGER IF EXISTS adherents_set_updated_at ON public.adherents;
CREATE TRIGGER adherents_set_updated_at
  BEFORE UPDATE ON public.adherents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP POLICY IF EXISTS "Public adhesion insert" ON public.adherents;
CREATE POLICY "Public adhesion insert"
  ON public.adherents FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    rgpd_consent_at IS NOT NULL
    AND statuts_acceptes_at IS NOT NULL
    AND statut = 'pending_validation'
  );

CREATE INDEX IF NOT EXISTS adherents_statut_idx ON public.adherents (statut);
CREATE INDEX IF NOT EXISTS adherents_created_at_idx ON public.adherents (created_at DESC);
CREATE INDEX IF NOT EXISTS adherents_service_idx ON public.adherents (service);

ALTER TABLE public.contributions_elections
  ADD COLUMN IF NOT EXISTS themes TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS statut_traitement TEXT NOT NULL DEFAULT 'recue',
  ADD COLUMN IF NOT EXISTS cst_date DATE,
  ADD COLUMN IF NOT EXISTS reponse_direction TEXT,
  ADD COLUMN IF NOT EXISTS action_unsagglo TEXT,
  ADD COLUMN IF NOT EXISTS derniere_maj TIMESTAMPTZ NOT NULL DEFAULT now();

UPDATE public.contributions_elections
SET themes = ARRAY[theme]
WHERE cardinality(themes) = 0 AND theme IS NOT NULL AND theme <> '';

DO $$
DECLARE
  cname text;
BEGIN
  FOR cname IN
    SELECT con.conname
    FROM pg_constraint con
    JOIN pg_class cl ON cl.oid = con.conrelid
    JOIN pg_namespace ns ON ns.oid = cl.relnamespace
    WHERE ns.nspname = 'public'
      AND cl.relname = 'contributions_elections'
      AND con.contype = 'c'
      AND pg_get_constraintdef(con.oid) ILIKE '%statut_traitement%'
  LOOP
    EXECUTE format('ALTER TABLE public.contributions_elections DROP CONSTRAINT %I', cname);
  END LOOP;
END $$;

ALTER TABLE public.contributions_elections
  ADD CONSTRAINT contributions_elections_statut_traitement_check
  CHECK (statut_traitement IN ('recue', 'analysee', 'integree_programme', 'engagement_phare', 'non_retenue'));

DROP TRIGGER IF EXISTS contributions_elections_set_updated_at ON public.contributions_elections;
CREATE TRIGGER contributions_elections_set_updated_at
  BEFORE UPDATE ON public.contributions_elections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_contributions_created_at ON public.contributions_elections (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contributions_themes ON public.contributions_elections USING gin (themes);
CREATE INDEX IF NOT EXISTS idx_contributions_statut_traitement ON public.contributions_elections (statut_traitement);

CREATE OR REPLACE VIEW public.public_contributions_feed
WITH (security_invoker = true)
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
  action_unsagglo,
  derniere_maj
FROM public.contributions_elections
WHERE statut_traitement <> 'recue';

GRANT SELECT ON public.public_contributions_feed TO anon, authenticated;

CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  theme TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS campaigns_set_updated_at ON public.campaigns;
CREATE TRIGGER campaigns_set_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP POLICY IF EXISTS "Public read active campaigns" ON public.campaigns;
CREATE POLICY "Public read active campaigns"
  ON public.campaigns FOR SELECT
  TO anon, authenticated
  USING (active = true);

DROP POLICY IF EXISTS "Admins can read campaigns" ON public.campaigns;
CREATE POLICY "Admins can read campaigns"
  ON public.campaigns FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can insert campaigns" ON public.campaigns;
CREATE POLICY "Admins can insert campaigns"
  ON public.campaigns FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can update campaigns" ON public.campaigns;
CREATE POLICY "Admins can update campaigns"
  ON public.campaigns FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can delete campaigns" ON public.campaigns;
CREATE POLICY "Admins can delete campaigns"
  ON public.campaigns FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS idx_campaigns_active ON public.campaigns (active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_campaigns_dates ON public.campaigns (start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON public.campaigns (created_at DESC);

CREATE OR REPLACE FUNCTION public.get_active_campaign()
RETURNS TABLE(
  id UUID,
  title TEXT,
  description TEXT,
  theme TEXT,
  start_date DATE,
  end_date DATE,
  active BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  contributions_count BIGINT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    c.id,
    c.title,
    c.description,
    c.theme,
    c.start_date,
    c.end_date,
    c.active,
    c.created_at,
    c.updated_at,
    (
      SELECT COUNT(*)::bigint
      FROM public.contributions_elections ce
      WHERE c.theme = ANY(ce.themes)
        AND ce.created_at::date BETWEEN c.start_date AND c.end_date
    ) AS contributions_count
  FROM public.campaigns c
  WHERE c.active = true
    AND current_date BETWEEN c.start_date AND c.end_date
  ORDER BY c.created_at DESC
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_active_campaign() TO anon, authenticated;

CREATE INDEX IF NOT EXISTS articles_created_at_idx ON public.articles (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS candidats_liste_created_at_idx ON public.candidats_liste (created_at DESC);
CREATE INDEX IF NOT EXISTS page_visits_visited_at_idx ON public.page_visits (visited_at DESC);