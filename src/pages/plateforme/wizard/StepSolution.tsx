import { Bot } from "lucide-react";
import StepHeader from "./StepHeader";
import ProposalAssistant from "../ProposalAssistant";

interface StepSolutionProps {
  theme: string;
  story: string;
  value: string;
  onChange: (value: string) => void;
  assistantOpen: boolean;
  onAssistantOpenChange: (open: boolean) => void;
}

const StepSolution = ({
  theme,
  value,
  onChange,
  assistantOpen,
  onAssistantOpenChange,
}: StepSolutionProps): JSX.Element => {
  const handleAssistantUse = (text: string): void => {
    onChange(text);
  };

  return (
    <div>
      <StepHeader
        eyebrow="Question 3 (facultative)"
        title="Une idée concrète à proposer ?"
        subtitle="Si vous en avez une, dites-la — même imparfaite. Si vous préférez juste partager le constat, laissez vide et continuez."
      />

      <textarea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ce qui pourrait vraiment changer la donne, c'est…"
        className="w-full rounded-md border px-4 py-3 text-base text-secondary placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
        style={{ borderColor: "#e6eaf0", minHeight: "150px" }}
      />

      <button
        type="button"
        onClick={() => onAssistantOpenChange(true)}
        className="mt-3 inline-flex items-center gap-2 text-xs text-primary border rounded-[6px] px-3 py-2 hover:bg-primary/5 transition-colors"
        style={{ borderColor: "#009fe3" }}
      >
        <Bot className="h-3.5 w-3.5" />
        Demander à l'assistant IA de m'aider à formuler
      </button>

      <ProposalAssistant
        open={assistantOpen}
        onOpenChange={onAssistantOpenChange}
        theme={theme}
        onUseProposal={handleAssistantUse}
      />
    </div>
  );
};

export default StepSolution;
