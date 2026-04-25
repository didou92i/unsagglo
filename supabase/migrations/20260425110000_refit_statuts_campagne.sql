-- Refit du feedback loop pour coller au vrai contexte UNSAgglo :
--
--  UNSAgglo est une section syndicale opérationnelle (peut accompagner des
--  agents) MAIS n'a pas encore d'élu au CST. Les statuts précédents
--  ("portee_cst", "obtenue", "refusee" "en_negociation") laissaient croire
--  qu'UNSAgglo négociait déjà avec la direction, ce qui est faux et
--  potentiellement trompeur pour les agents qui visitent le site.
--
--  Nouveau workflow tourné "construction du programme 2026" :
--    recue → analysee → integree_programme → engagement_phare
--                                          ↘ non_retenue
--
--  Nouveau champ optionnel "action_unsagglo" pour exposer publiquement les
--  actions concrètes que UNSAgglo mène DÉJÀ aujourd'hui sur la contribution
--  (café syndical, accompagnement individuel, note partagée…).

-- 1. Drop the previous CHECK constraint (auto-named by Postgres).
DO $$
DECLARE
  cname text;
BEGIN
  SELECT con.conname INTO cname
  FROM pg_constraint con
  JOIN pg_class cl ON cl.oid = con.conrelid
  WHERE cl.relname = 'contributions_elections'
    AND con.contype = 'c'
    AND pg_get_constraintdef(con.oid) ILIKE '%statut_traitement%';
  IF cname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.contributions_elections DROP CONSTRAINT %I', cname);
  END IF;
END $$;

-- 2. Migrate any data still using the old vocabulary.
UPDATE public.contributions_elections
SET statut_traitement = CASE statut_traitement
  WHEN 'portee_cst' THEN 'integree_programme'
  WHEN 'obtenue' THEN 'engagement_phare'
  WHEN 'refusee' THEN 'non_retenue'
  WHEN 'en_negociation' THEN 'analysee'
  ELSE statut_traitement
END
WHERE statut_traitement IN ('portee_cst', 'obtenue', 'refusee', 'en_negociation');

-- 3. Add the new CHECK constraint with the campaign-aware vocabulary.
ALTER TABLE public.contributions_elections
  ADD CONSTRAINT contributions_elections_statut_traitement_check
  CHECK (statut_traitement IN (
    'recue',
    'analysee',
    'integree_programme',
    'engagement_phare',
    'non_retenue'
  ));

-- 4. New optional column for the concrete UNSAgglo action visible publicly.
ALTER TABLE public.contributions_elections
  ADD COLUMN IF NOT EXISTS action_unsagglo text;

-- 5. Refresh the public view to expose action_unsagglo.
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
  action_unsagglo,
  derniere_maj
FROM public.contributions_elections;

GRANT SELECT ON public.public_contributions_feed TO anon, authenticated;
