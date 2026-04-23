import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface FunnelRow {
  step: string;
  unique_sessions: number;
}

const STEP_LABELS: Record<string, string> = {
  step_1: "1. Véhicule",
  step_2: "2. Foyer fiscal",
  step_3: "3. Revenus",
  step_4: "4. Employeur",
  step_5: "5. Trajet",
  step_6: "6. Récap",
  verdict_eligible: "✓ Éligible",
  verdict_not_eligible: "✗ Non-éligible",
};

const STEP_ORDER: string[] = [
  "step_1",
  "step_2",
  "step_3",
  "step_4",
  "step_5",
  "step_6",
  "verdict_eligible",
  "verdict_not_eligible",
];

const FunnelStats = (): JSX.Element => {
  const [rows, setRows] = useState<FunnelRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFunnel = async (): Promise<void> => {
      const { data } = await supabase
        .from("simulator_funnel_stats")
        .select("step, unique_sessions");
      if (data) {
        setRows(
          data
            .filter((r): r is FunnelRow =>
              typeof r.step === "string" && typeof r.unique_sessions === "number",
            )
            .sort(
              (a, b) =>
                STEP_ORDER.indexOf(a.step) - STEP_ORDER.indexOf(b.step),
            ),
        );
      }
      setLoading(false);
    };
    void fetchFunnel();
  }, []);

  if (loading) return <div />;
  if (rows.length === 0) return <div />;

  const step1Count = rows.find((r) => r.step === "step_1")?.unique_sessions ?? 0;

  return (
    <div
      className="rounded-lg mb-6 p-5"
      style={{ backgroundColor: "#f5f5f7" }}
    >
      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
        Funnel du simulateur — sessions anonymes
      </p>
      <div className="space-y-2">
        {rows.map((row) => {
          const pct = step1Count > 0 ? (row.unique_sessions / step1Count) * 100 : 0;
          const isVerdict = row.step.startsWith("verdict_");
          return (
            <div key={row.step} className="flex items-center gap-3">
              <div className="w-32 text-xs text-secondary font-medium">
                {STEP_LABELS[row.step] ?? row.step}
              </div>
              <div
                className="flex-1 rounded-sm overflow-hidden"
                style={{ backgroundColor: "#e6eaf0", height: "16px" }}
              >
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${Math.min(100, Math.max(2, pct))}%`,
                    backgroundColor: isVerdict
                      ? row.step === "verdict_eligible"
                        ? "#009fe3"
                        : "#e74124"
                      : "#29235c",
                  }}
                />
              </div>
              <div className="w-20 text-right text-xs text-secondary font-medium tabular-nums">
                {row.unique_sessions} ({pct.toFixed(0)} %)
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FunnelStats;
