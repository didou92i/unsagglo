import { useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "aide-carburant-funnel-session";

const getSessionId = (): string => {
  if (typeof window === "undefined") return "ssr";
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const fresh =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `s-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    return `s-${Date.now()}`;
  }
};

export type FunnelStep =
  | "step_1"
  | "step_2"
  | "step_3"
  | "step_4"
  | "step_5"
  | "step_6"
  | "verdict_eligible"
  | "verdict_not_eligible";

interface UseFunnelTrackingReturn {
  trackStep: (step: FunnelStep) => void;
}

export function useFunnelTracking(): UseFunnelTrackingReturn {
  const sessionIdRef = useRef<string>("");
  const seenRef = useRef<Set<FunnelStep>>(new Set());

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  const trackStep = useCallback((step: FunnelStep): void => {
    if (seenRef.current.has(step)) return;
    seenRef.current.add(step);

    const sessionId = sessionIdRef.current || getSessionId();
    // Fire-and-forget: failure must never block the UX.
    void supabase
      .from("simulator_funnel_events")
      .insert({ session_id: sessionId, step })
      .then(() => undefined);
  }, []);

  return { trackStep };
}
