import { Sparkles } from "lucide-react";
import StepHeader from "./StepHeader";
import { THEME_VISUAL } from "./types";

interface StepStoryProps {
  theme?: string;
  value: string;
  onChange: (value: string) => void;
}

const StepStory = ({ theme, value, onChange }: StepStoryProps): JSX.Element => {
  const visual = theme ? THEME_VISUAL[theme] : undefined;
  const placeholderHint = visual?.prompt ?? "Décrivez la situation que vous vivez…";
  const minChars = 20;
  const charCount = value.trim().length;
  const isValid = charCount >= minChars;

  const useStarter = (): void => {
    if (visual?.prompt) onChange(visual.prompt + " ");
  };

  return (
    <div>
      <StepHeader
        eyebrow="Question 2"
        title="Racontez-nous ce que vous vivez."
        subtitle="Soyez concret : un exemple précis vaut mieux qu'un grand discours. Ce que vous écrivez sera lu par UNSAgglo."
      />

      <textarea
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholderHint}
        className="w-full rounded-md border px-4 py-3 text-base text-secondary placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-y"
        style={{ borderColor: "#e6eaf0", minHeight: "180px" }}
      />

      <div className="flex items-center justify-between mt-2 text-xs">
        {visual?.prompt && value.trim() === "" ? (
          <button
            type="button"
            onClick={useStarter}
            className="group inline-flex items-center gap-1.5 text-primary hover:opacity-80 transition-opacity"
          >
            <Sparkles
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              strokeWidth={1.75}
            />
            <span className="underline underline-offset-2">Démarrer avec une amorce</span>
          </button>
        ) : (
          <span />
        )}
        <span
          className={`tabular-nums transition-colors duration-200 ${
            isValid ? "text-primary font-medium" : "text-destructive"
          }`}
          aria-live="polite"
        >
          {charCount} / {minChars} caractères minimum
        </span>
      </div>
    </div>
  );
};

export default StepStory;
