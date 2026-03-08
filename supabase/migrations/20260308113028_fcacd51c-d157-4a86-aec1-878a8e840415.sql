-- Tables sondages
CREATE TABLE public.sondages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  theme text NOT NULL,
  actif boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.sondages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active sondages" ON public.sondages FOR SELECT USING (actif = true);
CREATE POLICY "Admins manage sondages" ON public.sondages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Table sondage_options
CREATE TABLE public.sondage_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sondage_id uuid REFERENCES public.sondages(id) ON DELETE CASCADE NOT NULL,
  label text NOT NULL,
  votes integer NOT NULL DEFAULT 0
);
ALTER TABLE public.sondage_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read options" ON public.sondage_options FOR SELECT USING (true);
CREATE POLICY "Admins manage options" ON public.sondage_options FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Table sondage_votes
CREATE TABLE public.sondage_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sondage_id uuid REFERENCES public.sondages(id) ON DELETE CASCADE NOT NULL,
  option_id uuid REFERENCES public.sondage_options(id) ON DELETE CASCADE NOT NULL,
  fingerprint text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(sondage_id, fingerprint)
);
ALTER TABLE public.sondage_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert votes" ON public.sondage_votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read votes" ON public.sondage_votes FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Fonction atomique de vote
CREATE OR REPLACE FUNCTION public.vote_sondage(p_sondage_id uuid, p_option_id uuid, p_fingerprint text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO sondage_votes (sondage_id, option_id, fingerprint)
  VALUES (p_sondage_id, p_option_id, p_fingerprint);
  UPDATE sondage_options SET votes = votes + 1 WHERE id = p_option_id;
  RETURN true;
EXCEPTION WHEN unique_violation THEN
  RETURN false;
END;
$$;

-- Ajouter colonne anonyme a contributions_elections
ALTER TABLE public.contributions_elections ADD COLUMN anonyme boolean NOT NULL DEFAULT false;