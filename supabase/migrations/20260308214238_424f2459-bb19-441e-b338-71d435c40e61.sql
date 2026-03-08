CREATE OR REPLACE FUNCTION public.get_visit_stats()
RETURNS TABLE(page_path text, visit_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT page_path, COUNT(*) as visit_count
  FROM public.page_visits
  GROUP BY page_path
  ORDER BY visit_count DESC;
$$;