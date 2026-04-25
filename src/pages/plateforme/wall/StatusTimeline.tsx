import { Check } from "lucide-react";
import {
  STATUS_META,
  STATUS_PROGRESSION,
  type StatutTraitement,
} from "./types";

interface StatusTimelineProps {
  statut: StatutTraitement;
}

const StatusTimeline = ({ statut }: StatusTimelineProps): JSX.Element => {
  const isNonRetenue = statut === "non_retenue";

  // For non_retenue: progression stops at "analysee", we draw a fork after.
  const effectiveStatus: StatutTraitement = isNonRetenue ? "analysee" : statut;
  const currentIndex = STATUS_PROGRESSION.indexOf(effectiveStatus);

  return (
    <div className="flex items-center gap-1 w-full">
      {STATUS_PROGRESSION.map((step, i) => {
        const meta = STATUS_META[step];
        const reached = i <= currentIndex;
        const isCurrent = i === currentIndex && !isNonRetenue;
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
                  boxShadow: isCurrent ? `0 0 0 4px ${meta.bg}` : "none",
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
              </span>
            </div>
            {!isLast && (
              <div
                className="flex-1 h-0.5 mx-1 rounded transition-colors duration-200 self-start mt-3"
                style={{
                  backgroundColor:
                    i < currentIndex ? STATUS_META[step].color : "#e6eaf0",
                }}
              />
            )}
          </div>
        );
      })}
      {isNonRetenue && (
        <div className="ml-3 flex flex-col items-center">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: STATUS_META.non_retenue.color,
              color: "#ffffff",
            }}
          >
            <span className="text-xs font-bold">!</span>
          </div>
          <span
            className="text-[10px] mt-1.5"
            style={{
              color: STATUS_META.non_retenue.color,
              fontWeight: 600,
            }}
          >
            Non retenue
          </span>
        </div>
      )}
    </div>
  );
};

export default StatusTimeline;
