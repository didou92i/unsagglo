import { THEME_GROUPS } from "@/constants/themes";
import StepHeader from "./StepHeader";
import ChoiceCard from "./ChoiceCard";
import { THEME_VISUAL, MAX_THEMES } from "./types";

interface StepThemeProps {
  values: string[];
  onToggle: (theme: string) => void;
}

const StepTheme = ({ values, onToggle }: StepThemeProps): JSX.Element => {
  const selectedCount = values.length;
  const reachedLimit = selectedCount >= MAX_THEMES;

  return (
    <div>
      <StepHeader
        eyebrow="Question 1"
        title="Sur quels sujets voulez-vous porter une idée ?"
        subtitle={`Choisissez jusqu'à ${MAX_THEMES} thématiques. Vous pourrez préciser le constat ensuite.`}
      />

      <div
        className="flex items-center justify-between mb-6 px-4 py-3 rounded-md transition-colors"
        style={{
          backgroundColor:
            selectedCount > 0 ? "#eff9fe" : "#f5f5f7",
        }}
      >
        <p className="text-xs uppercase tracking-wide text-secondary font-semibold">
          Sélection
        </p>
        <p
          className="text-sm font-medium tabular-nums"
          style={{ color: reachedLimit ? "#009fe3" : "#29235c" }}
        >
          {selectedCount} / {MAX_THEMES}
        </p>
      </div>

      <div className="space-y-6">
        {THEME_GROUPS.map((group) => (
          <div key={group.group}>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-3">
              {group.group}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.options.map((opt) => {
                const visual = THEME_VISUAL[opt.value];
                const isSelected = values.includes(opt.value);
                const isDisabled = !isSelected && reachedLimit;
                return (
                  <div
                    key={opt.value}
                    className={isDisabled ? "opacity-40 pointer-events-none" : ""}
                  >
                    <ChoiceCard
                      selected={isSelected}
                      onClick={() => !isDisabled && onToggle(opt.value)}
                      icon={visual?.icon}
                      title={visual?.short ?? opt.label}
                      description={visual?.short ? opt.label : undefined}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTheme;
