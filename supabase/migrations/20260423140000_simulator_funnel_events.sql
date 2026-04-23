-- Anonymous funnel analytics for the aide carburant simulator.
-- No PII is stored: only a random session_id generated client-side (sessionStorage)
-- and the step index reached, so we can compute drop-off rates per step.

CREATE TABLE public.simulator_funnel_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  step text NOT NULL CHECK (step IN (
    'step_1', 'step_2', 'step_3', 'step_4', 'step_5', 'step_6',
    'verdict_eligible', 'verdict_not_eligible'
  )),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_simulator_funnel_session ON public.simulator_funnel_events(session_id);
CREATE INDEX idx_simulator_funnel_step ON public.simulator_funnel_events(step);
CREATE INDEX idx_simulator_funnel_created_at
  ON public.simulator_funnel_events(created_at DESC);

ALTER TABLE public.simulator_funnel_events ENABLE ROW LEVEL SECURITY;

-- Anonymous visitors can record their own progress through the funnel.
CREATE POLICY "Public can insert funnel events"
  ON public.simulator_funnel_events
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated admins can read the aggregated data.
CREATE POLICY "Authenticated can read funnel events"
  ON public.simulator_funnel_events
  FOR SELECT TO authenticated
  USING (true);

-- Admin-only maintenance.
CREATE POLICY "Authenticated can delete funnel events"
  ON public.simulator_funnel_events
  FOR DELETE TO authenticated
  USING (true);

-- Pre-aggregated view for the admin dashboard: unique sessions per step.
CREATE OR REPLACE VIEW public.simulator_funnel_stats AS
SELECT
  step,
  COUNT(DISTINCT session_id)::bigint AS unique_sessions
FROM public.simulator_funnel_events
GROUP BY step;

GRANT SELECT ON public.simulator_funnel_stats TO authenticated;
