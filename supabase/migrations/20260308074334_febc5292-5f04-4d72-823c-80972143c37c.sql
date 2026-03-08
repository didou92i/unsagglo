
-- =============================================
-- UNSAGGLO DATABASE SCHEMA
-- =============================================

-- Function for auto-updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- =============================================
-- TABLE: PROFILES (linked to auth.users)
-- =============================================
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nom TEXT NOT NULL DEFAULT '',
  prenom TEXT NOT NULL DEFAULT '',
  service TEXT,
  grade TEXT,
  telephone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- TABLE: ADHERENTS (public adhesion requests)
-- =============================================
CREATE TABLE public.adherents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  service TEXT,
  grade TEXT,
  telephone TEXT,
  statut TEXT NOT NULL DEFAULT 'en_attente'
    CHECK (statut IN ('actif', 'en_attente', 'resilie')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.adherents ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an adhesion request
CREATE POLICY "Public adhesion insert"
  ON public.adherents FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can view (admin future use)
CREATE POLICY "Authenticated users can view adherents"
  ON public.adherents FOR SELECT
  TO authenticated
  USING (true);

-- =============================================
-- TABLE: ARTICLES
-- =============================================
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  contenu TEXT NOT NULL,
  categorie TEXT NOT NULL
    CHECK (categorie IN ('actualite', 'tract', 'cr_cst', 'fiche_droit')),
  auteur TEXT NOT NULL DEFAULT 'Bureau UNSAgglo',
  publie BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Published articles readable by everyone
CREATE POLICY "Published articles are public"
  ON public.articles FOR SELECT
  USING (publie = true);

-- =============================================
-- TABLE: CONTRIBUTIONS ELECTIONS
-- =============================================
CREATE TABLE public.contributions_elections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prenom TEXT NOT NULL,
  service TEXT NOT NULL,
  theme TEXT NOT NULL
    CHECK (theme IN ('remuneration', 'conditions_travail', 'carriere', 'rps', 'autre')),
  contenu TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contributions_elections ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a contribution
CREATE POLICY "Public contribution insert"
  ON public.contributions_elections FOR INSERT
  WITH CHECK (true);

-- Only authenticated can view
CREATE POLICY "Authenticated users can view contributions"
  ON public.contributions_elections FOR SELECT
  TO authenticated
  USING (true);

-- =============================================
-- STORAGE: Documents bucket for members
-- =============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can read documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents');

CREATE POLICY "Authenticated users can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');
