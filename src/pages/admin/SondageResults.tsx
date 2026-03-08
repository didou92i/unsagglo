import { Progress } from "@/components/ui/progress";

interface Option {
  id: string;
  label: string;
  votes: number;
}

interface SondageResultsProps {
  question: string;
  options: Option[];
  totalVotes: number;
}

const SondageResults = ({
  question,
  options,
  totalVotes,
}: SondageResultsProps): JSX.Element => {
  return (
    <div className="space-y-3 rounded-lg border border-border p-4">
      <p className="font-display font-bold text-foreground">{question}</p>
      <p className="text-sm text-muted-foreground">
        {totalVotes} vote{totalVotes !== 1 ? "s" : ""}
      </p>
      {options.map((opt) => {
        const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
        return (
          <div key={opt.id} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{opt.label}</span>
              <span className="text-muted-foreground">
                {opt.votes} ({pct}%)
              </span>
            </div>
            <Progress value={pct} className="h-2" />
          </div>
        );
      })}
    </div>
  );
};

export default SondageResults;
