import { useState } from "react";
import { Briefcase, Heart, TrendingUp, Brain, HelpCircle } from "lucide-react";
import UCard from "@/components/ui/UCard";
import { Progress } from "@/components/ui/progress";
import { useVote } from "./useVote";
import type { LucideIcon } from "lucide-react";

const THEME_ICONS: Record<string, LucideIcon> = {
  remuneration: TrendingUp,
  conditions_travail: Briefcase,
  carriere: TrendingUp,
  rps: Brain,
  autre: HelpCircle,
};

interface Option {
  id: string;
  label: string;
  votes: number;
}

interface SondageCardProps {
  id: string;
  question: string;
  theme: string;
  options: Option[];
  onVoted: () => void;
}

const SondageCard = ({ id, question, theme, options, onVoted }: SondageCardProps): JSX.Element => {
  const { vote, hasVoted, loading } = useVote();
  const [voted, setVoted] = useState<boolean>(hasVoted(id));
  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);
  const Icon = THEME_ICONS[theme] ?? HelpCircle;

  const handleVote = async (optionId: string): Promise<void> => {
    const ok = await vote(id, optionId);
    if (ok) {
      setVoted(true);
      onVoted();
    }
  };

  return (
    <UCard className="border border-border">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-xs font-display font-bold text-primary uppercase tracking-wide">
          {theme.replace("_", " ")}
        </span>
      </div>
      <h3 className="font-display text-lg font-bold text-foreground mb-4">
        {question}
      </h3>

      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

          if (voted) {
            return (
              <div key={option.id} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{option.label}</span>
                  <span className="text-muted-foreground font-display font-bold">{pct}%</span>
                </div>
                <Progress value={pct} className="h-3" />
              </div>
            );
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={loading}
              onClick={() => handleVote(option.id)}
              className="w-full px-4 py-2.5 border-2 border-primary text-primary font-display font-bold rounded-full transition-all duration-200 hover:bg-primary/10 disabled:opacity-50 cursor-pointer"
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {voted && (
        <p className="text-xs text-muted-foreground mt-3">
          {totalVotes} vote{totalVotes > 1 ? "s" : ""} au total
        </p>
      )}
    </UCard>
  );
};

export default SondageCard;
