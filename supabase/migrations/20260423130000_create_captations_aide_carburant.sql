-- Email capture table for the /aide-carburant simulator
-- IMPORTANT RGPD: the revenu fiscal de référence (RFR) used at step 4 of the
-- simulator is NEVER stored here. It stays in client-side React state only
-- for the eligibility calculation.

CREATE TABLE public.captations_aide_carburant (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  eligibilite text NOT NULL CHECK (eligibilite IN ('Éligible', 'Non-éligible', 'À vérifier')),
  critere_bloquant text CHECK (critere_bloquant IN ('Pas de véhicule', 'Statut', 'Revenus', 'Véhicule employeur', 'Kilométrage')),
  opt_in_newsletter boolean NOT NULL DEFAULT false,
  composition_foyer text,
  profil_kilometrage text,
  source text NOT NULL DEFAULT 'Page aide carburant',
  pdf_telecharge boolean NOT NULL DEFAULT false,
  statut_relance text NOT NULL DEFAULT 'Non contacté',
  notes_internes text
);

ALTER TABLE public.captations_aide_carburant ENABLE ROW LEVEL SECURITY;

-- Public may insert (visitors capturing their email)
CREATE POLICY "Public can insert captations"
  ON public.captations_aide_carburant
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (admins) can read, update, delete
CREATE POLICY "Authenticated can read captations"
  ON public.captations_aide_carburant
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update captations"
  ON public.captations_aide_carburant
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete captations"
  ON public.captations_aide_carburant
  FOR DELETE TO authenticated
  USING (true);

CREATE INDEX idx_captations_email ON public.captations_aide_carburant(email);
CREATE INDEX idx_captations_created_at ON public.captations_aide_carburant(created_at DESC);

-- SECURITY DEFINER RPC: anon cannot UPDATE arbitrary fields, but may call this
-- function which performs a scoped upsert. Same-email second submission
-- refreshes created_at and the captured simulator metadata.
CREATE OR REPLACE FUNCTION public.capture_aide_carburant_email(
  p_email text,
  p_eligibilite text,
  p_critere_bloquant text,
  p_opt_in_newsletter boolean,
  p_composition_foyer text,
  p_profil_kilometrage text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF p_email IS NULL OR length(trim(p_email)) = 0 THEN
    RAISE EXCEPTION 'Email is required';
  END IF;
  IF p_eligibilite NOT IN ('Éligible', 'Non-éligible', 'À vérifier') THEN
    RAISE EXCEPTION 'Invalid eligibilite';
  END IF;

  INSERT INTO public.captations_aide_carburant (
    email, eligibilite, critere_bloquant, opt_in_newsletter,
    composition_foyer, profil_kilometrage, source,
    pdf_telecharge, statut_relance
  ) VALUES (
    lower(trim(p_email)), p_eligibilite, p_critere_bloquant, COALESCE(p_opt_in_newsletter, false),
    p_composition_foyer, p_profil_kilometrage, 'Page aide carburant',
    false, 'Non contacté'
  )
  ON CONFLICT (email) DO UPDATE
  SET
    created_at = now(),
    eligibilite = EXCLUDED.eligibilite,
    critere_bloquant = EXCLUDED.critere_bloquant,
    opt_in_newsletter = EXCLUDED.opt_in_newsletter,
    composition_foyer = EXCLUDED.composition_foyer,
    profil_kilometrage = EXCLUDED.profil_kilometrage
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.capture_aide_carburant_email(text, text, text, boolean, text, text)
  TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.mark_aide_carburant_pdf_downloaded(p_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.captations_aide_carburant
  SET pdf_telecharge = true
  WHERE email = lower(trim(p_email));
END;
$$;

GRANT EXECUTE ON FUNCTION public.mark_aide_carburant_pdf_downloaded(text)
  TO anon, authenticated;
