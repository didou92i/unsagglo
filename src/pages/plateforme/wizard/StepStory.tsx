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
        className="w-full rounded-md border px-4 py-3 text-base text-secondary placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
        style={{ borderColor: "#e6eaf0", minHeight: "180px" }}
      />

      <div className="flex items-center justify-between mt-2 text-xs">
        {visual?.prompt && value.trim() === "" ? (
          <button
            type="button"
            onClick={useStarter}
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            ✨ Démarrer avec une amorce
          </button>
        ) : (
          <span />
        )}
        <span
          className={isValid ? "text-muted-foreground" : "text-destructive"}
          aria-live="polite"
        >
          {charCount} / {minChars} caractères minimum
        </span>
      </div>
    </div>
  );
};

export default StepStory;
