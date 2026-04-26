DROP FUNCTION IF EXISTS public.get_active_campaign();

ALTER TABLE public.campaigns
  ADD COLUMN IF NOT EXISTS objective_count INTEGER NOT NULL DEFAULT 50,
  ADD COLUMN IF NOT EXISTS deliverable_label TEXT,
  ADD COLUMN IF NOT EXISTS deliverable_date DATE;

ALTER TABLE public.campaigns
  ALTER COLUMN description DROP NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'campaigns_objective_count_check'
      AND conrelid = 'public.campaigns'::regclass
  ) THEN
    ALTER TABLE public.campaigns
      ADD CONSTRAINT campaigns_objective_count_check CHECK (objective_count > 0);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'campaigns_dates_check'
      AND conrelid = 'public.campaigns'::regclass
  ) THEN
    ALTER TABLE public.campaigns
      ADD CONSTRAINT campaigns_dates_check CHECK (end_date >= start_date);
  END IF;
END $$;

CREATE FUNCTION public.get_active_campaign()
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