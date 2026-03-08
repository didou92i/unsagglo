import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, BarChart3 } from "lucide-react";

interface SondageOption {
  id: string;
  label: string;
  votes: number;
}

interface SondageItem {
  id: string;
  question: string;
  theme: string;
  actif: boolean;
  options: SondageOption[];
  totalVotes: number;
}

interface SondagesListProps {
  sondages: SondageItem[];
  onToggle: (id: string, actif: boolean) => void;
  onEdit: (s: SondageItem) => void;
  onResults: (id: string) => void;
}

const SondagesList = ({
  sondages,
  onToggle,
  onEdit,
  onResults,
}: SondagesListProps): JSX.Element => {
  if (sondages.length === 0) {
    return <p className="text-muted-foreground">Aucun sondage.</p>;
  }

  return (
    <div className="space-y-4">
      {sondages.map((s) => (
        <div
          key={s.id}
          className="flex items-center justify-between rounded-lg border border-border p-4"
        >
          <div className="space-y-1">
            <p className="font-semibold text-foreground">{s.question}</p>
            <p className="text-sm text-muted-foreground">
              {s.theme} - {s.totalVotes} votes - {s.options.length} options
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={s.actif}
              onCheckedChange={(v) => onToggle(s.id, v)}
            />
            <Button variant="ghost" size="icon" onClick={() => onEdit(s)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onResults(s.id)}>
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SondagesList;
