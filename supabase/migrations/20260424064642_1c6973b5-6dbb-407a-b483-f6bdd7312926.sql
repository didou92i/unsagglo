-- Table captations_aide_carburant
CREATE TABLE public.captations_aide_carburant (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  eligibilite text NOT NULL,
  critere_bloquant text,
  composition_foyer text,
  profil_kilometrage text,
  opt_in_newsletter boolean NOT NULL DEFAULT false,
  pdf_telecharge boolean NOT NULL DEFAULT false,
  pdf_telecharge_at timestamptz,
  source text NOT NULL DEFAULT 'simulateur_aide_carburant',
  statut_relance text NOT NULL DEFAULT 'Non contacté',
  notes_internes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT captations_aide_carburant_email_unique UNIQUE (email)
);

CREATE INDEX idx_captations_email ON public.captations_aide_carburant(email);
CREATE INDEX idx_captations_created_at ON public.captations_aide_carburant(created_at DESC);

ALTER TABLE public.captations_aide_carburant ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can select captations"
  ON public.captations_aide_carburant FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update captations"
  ON public.captations_aide_carburant FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete captations"
  ON public.captations_aide_carburant FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Aucune policy INSERT : seules les RPC SECURITY DEFINER peuvent écrire

CREATE TRIGGER captations_aide_carburant_updated_at
  BEFORE UPDATE ON public.captations_aide_carburant
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Table simulator_funnel_events
CREATE TABLE public.simulator_funnel_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text NOT NULL,
  step text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_funnel_session ON public.simulator_funnel_events(session_id);
CREATE INDEX idx_funnel_created_at ON public.simulator_funnel_events(created_at DESC);

ALTER TABLE public.simulator_funnel_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert funnel events"
  ON public.simulator_funnel_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins read funnel events"
  ON public.simulator_funnel_events FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RPC : capture_aide_carburant_email
-- IMPORTANT RGPD : ne jamais stocker le revenu fiscal de référence (RFR).
CREATE OR REPLACE FUNCTION public.capture_aide_carburant_email(
  p_email text,
  p_eligibilite text,
  p_critere_bloquant text,
  p_opt_in_newsletter boolean,
  p_composition_foyer text,
  p_profil_kilometrage text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.captations_aide_carburant (
    email,
    eligibilite,
    critere_bloquant,
    opt_in_newsletter,
    composition_foyer,
    profil_kilometrage
  )
  VALUES (
    lower(trim(p_email)),
    p_eligibilite,
    p_critere_bloquant,
    COALESCE(p_opt_in_newsletter, false),
    p_composition_foyer,
    p_profil_kilometrage
  )
  ON CONFLICT (email) DO UPDATE SET
    eligibilite = EXCLUDED.eligibilite,
    critere_bloquant = EXCLUDED.critere_bloquant,
    opt_in_newsletter = EXCLUDED.opt_in_newsletter,
    composition_foyer = EXCLUDED.composition_foyer,
    profil_kilometrage = EXCLUDED.profil_kilometrage,
    updated_at = now();
END;
$$;

-- RPC : mark_aide_carburant_pdf_downloaded
CREATE OR REPLACE FUNCTION public.mark_aide_carburant_pdf_downloaded(
  p_email text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.captations_aide_carburant
  SET pdf_telecharge = true,
      pdf_telecharge_at = now(),
      updated_at = now()
  WHERE email = lower(trim(p_email));
END;
$$;

GRANT EXECUTE ON FUNCTION public.capture_aide_carburant_email(text, text, text, boolean, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.mark_aide_carburant_pdf_downloaded(text) TO anon, authenticated;