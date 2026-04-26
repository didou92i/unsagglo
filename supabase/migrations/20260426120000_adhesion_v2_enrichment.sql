-- =============================================
-- Lot 1C-1 — Enrichissement de la table adherents
-- =============================================
-- Ajoute les champs nécessaires à une adhésion juridiquement
-- valide : identité civile complète, coordonnées postales,
-- situation professionnelle structurée, traçabilité RGPD et
-- acceptation des statuts.
--
-- Ne supprime aucune colonne existante.
-- Migre les anciens statuts pour cohérence du nouveau workflow.
-- =============================================

-- 1. Identité civile
ALTER TABLE public.adherents
  ADD COLUMN IF NOT EXISTS date_naissance DATE;

-- 2. Coordonnées postales
ALTER TABLE public.adherents
  ADD COLUMN IF NOT EXISTS adresse_ligne1 TEXT,
  ADD COLUMN IF NOT EXISTS adresse_ligne2 TEXT,
  ADD COLUMN IF NOT EXISTS adresse_cp TEXT,
  ADD COLUMN IF NOT EXISTS adresse_ville TEXT;

-- 3. Situation professionnelle structurée
ALTER TABLE public.adherents
  ADD COLUMN IF NOT EXISTS categorie TEXT
    CHECK (categorie IN ('A', 'B', 'C')),
  ADD COLUMN IF NOT EXISTS echelon SMALLINT
    CHECK (echelon IS NULL OR (echelon BETWEEN 1 AND 20)),
  ADD COLUMN IF NOT EXISTS statut_pro TEXT
    CHECK (statut_pro IN (
      'titulaire',
      'stagiaire',
      'contractuel_cdi',
      'contractuel_cdd',
      'apprenti'
    )),
  ADD COLUMN IF NOT EXISTS site_affectation TEXT,
  ADD COLUMN IF NOT EXISTS date_entree_carpf DATE;

-- 4. Adhésion : modalités de paiement (préparation Phase 2 Stripe)
ALTER TABLE public.adherents
  ADD COLUMN IF NOT EXISTS mode_paiement TEXT
    CHECK (mode_paiement IN (
      'cheque',
      'virement',
      'sepa',
      'stripe_mensuel',
      'stripe_annuel'
    )),
  ADD COLUMN IF NOT EXISTS periodicite_paiement TEXT
    CHECK (periodicite_paiement IN ('mensuel', 'annuel'));

-- 5. Traçabilité du consentement RGPD et de l'acceptation des statuts
--    (horodatages exigés par l'article 7.1 RGPD pour démontrer le consentement)
ALTER TABLE public.adherents
  ADD COLUMN IF NOT EXISTS rgpd_consent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS statuts_acceptes_at TIMESTAMPTZ;

-- 6. Workflow : élargissement du statut
--    Anciens statuts : actif | en_attente | resilie
--    Nouveaux statuts : pending_validation | actif | resilie
DO $$
DECLARE
  cname text;
BEGIN
  SELECT con.conname INTO cname
  FROM pg_constraint con
  JOIN pg_class cl ON cl.oid = con.conrelid
  WHERE cl.relname = 'adherents'
    AND con.contype = 'c'
    AND pg_get_constraintdef(con.oid) ILIKE '%statut%'
    AND pg_get_constraintdef(con.oid) ILIKE '%en_attente%';
  IF cname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.adherents DROP CONSTRAINT %I', cname);
  END IF;
END $$;

UPDATE public.adherents
  SET statut = 'pending_validation'
  WHERE statut = 'en_attente';

ALTER TABLE public.adherents
  DROP CONSTRAINT IF EXISTS adherents_statut_check;

ALTER TABLE public.adherents
  ADD CONSTRAINT adherents_statut_check
    CHECK (statut IN ('pending_validation', 'actif', 'resilie'));

ALTER TABLE public.adherents
  ALTER COLUMN statut SET DEFAULT 'pending_validation';

-- 7. Updated_at pour traçabilité des modifications admin
ALTER TABLE public.adherents
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS adherents_set_updated_at ON public.adherents;
CREATE TRIGGER adherents_set_updated_at
  BEFORE UPDATE ON public.adherents
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- 8. Index utiles pour les filtres admin
CREATE INDEX IF NOT EXISTS adherents_statut_idx ON public.adherents (statut);
CREATE INDEX IF NOT EXISTS adherents_created_at_idx ON public.adherents (created_at DESC);
