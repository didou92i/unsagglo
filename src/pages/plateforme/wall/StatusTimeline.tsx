import { Check } from "lucide-react";
import {
  STATUS_META,
  STATUS_PROGRESSION,
  type StatutTraitement,
} from "./types";

interface StatusTimelineProps {
  statut: StatutTraitement;
  cstDate?: string | null;
}

const formatShortFr = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
};

const StatusTimeline = ({ statut, cstDate }: StatusTimelineProps): JSX.Element => {
  const isRefusee = statut === "refusee";
  const isNegociation = statut === "en_negociation";

  // For refusee: progression stops at portee_cst, then forks to refusal indicator.
  // For en_negociation: progression stops at portee_cst with a "negotiation" pulse.
  const effectiveStatus: StatutTraitement = isRefusee || isNegociation
    ? "portee_cst"
    : statut;

  const currentIndex = STATUS_PROGRESSION.indexOf(effectiveStatus);

  return (
    <div className="flex items-center gap-1 w-full">
      {STATUS_PROGRESSION.map((step, i) => {
        const meta = STATUS_META[step];
        const reached = i <= currentIndex;
        const isCurrent = i === currentIndex && !isRefusee;
        const isLast = i === STATUS_PROGRESSION.length - 1;

        return (
          <div key={step} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center min-w-0">
              <div
                className="rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: reached ? meta.color : "#e6eaf0",
                  color: reached ? "#ffffff" : "#94a3b8",
                  boxShadow: isCurrent
                    ? `0 0 0 4px ${meta.bg}`
                    : "none",
                }}
              >
                {reached ? (
                  <Check className="h-3 w-3" strokeWidth={3} />
                ) : (
                  <span className="text-[10px] font-semibold tabular-nums">
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                className="text-[10px] mt-1.5 text-center leading-tight"
                style={{
                  color: reached ? "#29235c" : "#94a3b8",
                  fontWeight: isCurrent ? 600 : 400,
                }}
              >
                {meta.shortLabel}
                {step === "portee_cst" && cstDate && reached && (
                  <span className="block text-[9px] text-muted-foreground">
                    {formatShortFr(cstDate)}
                  </span>
                )}
              </span>
            </div>
            {!isLast && (
              <div
                className="flex-1 h-0.5 mx-1 rounded transition-colors duration-200 self-start mt-3"
                style={{
                  backgroundColor: i < currentIndex ? STATUS_META[step].color : "#e6eaf0",
                }}
              />
            )}
          </div>
        );
      })}
      {isRefusee && (
        <div className="ml-3 flex flex-col items-center">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: STATUS_META.refusee.color,
              color: "#ffffff",
            }}
          >
            <span className="text-xs font-bold">!</span>
          </div>
          <span
            className="text-[10px] mt-1.5"
            style={{ color: STATUS_META.refusee.color, fontWeight: 600 }}
          >
            Refusée
          </span>
        </div>
      )}
    </div>
  );
};

export default StatusTimeline;
