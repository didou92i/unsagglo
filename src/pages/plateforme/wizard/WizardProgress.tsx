import { STEP_ORDER, STEP_LABELS, type WizardStepId } from "./types";

interface WizardProgressProps {
  current: WizardStepId;
}

const WizardProgress = ({ current }: WizardProgressProps): JSX.Element => {
  const currentIndex = STEP_ORDER.indexOf(current);
  const percent = ((currentIndex + 1) / STEP_ORDER.length) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-1">
        <p className="text-sm font-medium text-secondary">
          Étape {currentIndex + 1}{" "}
          <span className="text-muted-foreground">/ {STEP_ORDER.length}</span>
        </p>
        <p className="text-sm text-muted-foreground">{STEP_LABELS[current]}</p>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: "6px", backgroundColor: "#e6eaf0" }}
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={STEP_ORDER.length}
      >
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{ width: `${percent}%`, backgroundColor: "#009fe3" }}
        />
      </div>
    </div>
  );
};

export default WizardProgress;
