import { STEP_TITLES, TOTAL_STEPS } from "./types";

interface ProgressHeaderProps {
  step: number;
}

const ProgressHeader = ({ step }: ProgressHeaderProps): JSX.Element => {
  const percent = (step / TOTAL_STEPS) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-secondary">
          Étape {step} <span className="text-muted-foreground">/ {TOTAL_STEPS}</span>
        </p>
        <p className="text-sm text-muted-foreground">{STEP_TITLES[step]}</p>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: "6px", backgroundColor: "#e6eaf0" }}
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
      >
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{ width: `${percent}%`, backgroundColor: "#009fe3" }}
        />
      </div>
    </div>
  );
};

export default ProgressHeader;
