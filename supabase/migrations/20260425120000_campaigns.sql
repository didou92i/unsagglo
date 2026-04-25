-- "Cap du mois" : campagne thématique pilotée par UNSAgglo pour mobiliser les
-- agents autour d'un sujet spécifique du programme 2026 (ex: « Le télétravail
-- dans notre programme »). Une seule campagne active à la fois.

CREATE TABLE public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  theme text NOT NULL,
  description text,
  objective_count integer NOT NULL DEFAULT 50 CHECK (objective_count > 0),
  start_date date NOT NULL,
  end_date date NOT NULL CHECK (end_date >= start_date),
  deliverable_label text,
  deliverable_date date,
  active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_campaigns_active ON public.campaigns(active) WHERE active = true;
CREATE INDEX idx_campaigns_dates ON public.campaigns(start_date, end_date);

-- Refresh updated_at on every UPDATE so the admin can sort by recently edited.
CREATE OR REPLACE FUNCTION public.touch_campaign_updated()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER campaigns_set_updated
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION public.touch_campaign_updated();

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Direct table access reserved to admins. Anon visitors hit the SECURITY
-- DEFINER RPC below to read the active campaign (curated columns + live count).
CREATE POLICY "Admins can read campaigns"
  ON public.campaigns FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert campaigns"
  ON public.campaigns FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update campaigns"
  ON public.campaigns FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete campaigns"
  ON public.campaigns FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Returns the currently active campaign with the live count of matching
-- contributions (theme present in the contribution's themes array, within
-- the campaign date window). Anon-safe via SECURITY DEFINER.
CREATE OR REPLACE FUNCTION public.get_active_campaign()
RETURNS TABLE(
  id uuid,
  title text,
  theme text,
  description text,
  objective_count integer,
  start_date date,
  end_date date,
  deliverable_label text,
  deliverable_date date,
  contribution_count bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.title,
    c.theme,
    c.description,
    c.objective_count,
    c.start_date,
    c.end_date,
    c.deliverable_label,
    c.deliverable_date,
    COALESCE((
      SELECT COUNT(*)::bigint
      FROM public.contributions_elections ce
      WHERE c.theme = ANY(ce.themes)
        AND ce.created_at::date >= c.start_date
        AND ce.created_at::date <= c.end_date
    ), 0::bigint) AS contribution_count
  FROM public.campaigns c
  WHERE c.active = true
    AND c.start_date <= CURRENT_DATE
    AND c.end_date >= CURRENT_DATE
  ORDER BY c.start_date DESC
  LIMIT 1;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_active_campaign() TO anon, authenticated;
