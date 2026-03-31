
CREATE TABLE public.rights_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  categorie text UNIQUE NOT NULL,
  contenu text NOT NULL DEFAULT '',
  sources text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.rights_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read rights_content" ON public.rights_content
  FOR SELECT TO public USING (true);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.rights_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
