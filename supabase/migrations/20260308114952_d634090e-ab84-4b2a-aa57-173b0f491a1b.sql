
CREATE TABLE public.candidats_liste (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prenom text NOT NULL,
  service text NOT NULL,
  email text NOT NULL,
  telephone text NOT NULL,
  adresse text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.candidats_liste ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view candidats"
  ON public.candidats_liste
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public candidature insert"
  ON public.candidats_liste
  FOR INSERT
  WITH CHECK (true);
