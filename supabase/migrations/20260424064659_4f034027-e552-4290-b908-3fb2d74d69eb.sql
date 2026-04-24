CREATE OR REPLACE VIEW public.simulator_funnel_stats
WITH (security_invoker = true)
AS
SELECT
  step,
  COUNT(DISTINCT session_id)::bigint AS unique_sessions
FROM public.simulator_funnel_events
GROUP BY step;

GRANT SELECT ON public.simulator_funnel_stats TO authenticated;