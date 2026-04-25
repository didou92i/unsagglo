import { THEME_GROUPS } from "@/constants/themes";
import StepHeader from "./StepHeader";
import ChoiceCard from "./ChoiceCard";
import { THEME_VISUAL } from "./types";

interface StepThemeProps {
  value?: string;
  onChange: (theme: string) => void;
}

const StepTheme = ({ value, onChange }: StepThemeProps): JSX.Element => (
  <div>
    <StepHeader
      eyebrow="Question 1"
      title="Sur quel sujet voulez-vous porter une idée ?"
      subtitle="Choisissez le thème qui colle le mieux à ce que vous voulez raconter — vous pourrez préciser après."
    />

    <div className="space-y-6">
      {THEME_GROUPS.map((group) => (
        <div key={group.group}>
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-3">
            {group.group}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {group.options.map((opt) => {
              const visual = THEME_VISUAL[opt.value];
              return (
                <ChoiceCard
                  key={opt.value}
                  selected={value === opt.value}
                  onClick={() => onChange(opt.value)}
                  emoji={visual?.emoji}
                  title={visual?.short ?? opt.label}
                  description={visual?.short ? opt.label : undefined}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StepTheme;
