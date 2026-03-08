import { useState } from "react";
import { useAdminSondages } from "@/hooks/useAdminSondages";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/Spinner";
import SondageForm from "./SondageForm";
import SondageResults from "./SondageResults";
import { Plus, Pencil, BarChart3 } from "lucide-react";

type View = "list" | "create" | "edit" | "results";

interface EditState {
  id: string;
  question: string;
  theme: string;
  actif: boolean;
  options: string[];
}

const SondagesManager = (): JSX.Element => {
  const { sondages, loading, create, update, toggleActif } =
    useAdminSondages();
  const [view, setView] = useState<View>("list");
  const [editing, setEditing] = useState<EditState | null>(null);
  const [resultsId, setResultsId] = useState<string | null>(null);

  if (loading) return <Spinner />;

  const handleCreate = async (data: {
    question: string;
    theme: string;
    actif: boolean;
    options: string[];
  }): Promise<void> => {
    await create(data);
    setView("list");
  };

  const handleEdit = async (data: {
    question: string;
    theme: string;
    actif: boolean;
    options: string[];
  }): Promise<void> => {
    if (!editing) return;
    await update(editing.id, data);
    setEditing(null);
    setView("list");
  };

  const openEdit = (s: (typeof sondages)[0]): void => {
    setEditing({
      id: s.id,
      question: s.question,
      theme: s.theme,
      actif: s.actif,
      options: s.options.map((o) => o.label),
    });
    setView("edit");
  };

  const openResults = (id: string): void => {
    setResultsId(id);
    setView("results");
  };

  if (view === "create") {
    return (
      <SondageForm
        onSubmit={handleCreate}
        onCancel={() => setView("list")}
      />
    );
  }

  if (view === "edit" && editing) {
    return (
      <SondageForm
        initial={editing}
        onSubmit={handleEdit}
        onCancel={() => {
          setEditing(null);
          setView("list");
        }}
      />
    );
  }

  if (view === "results" && resultsId) {
    const s = sondages.find((x) => x.id === resultsId);
    if (!s) return <p>Sondage introuvable</p>;
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setView("list")}>
          Retour
        </Button>
        <SondageResults
          question={s.question}
          options={s.options}
          totalVotes={s.totalVotes}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">
          Sondages ({sondages.length})
        </h2>
        <Button size="sm" onClick={() => setView("create")}>
          <Plus className="mr-1 h-4 w-4" /> Nouveau
        </Button>
      </div>

      {sondages.length === 0 && (
        <p className="text-muted-foreground">Aucun sondage.</p>
      )}

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
              onCheckedChange={(v) => toggleActif(s.id, v)}
            />
            <Button variant="ghost" size="icon" onClick={() => openEdit(s)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openResults(s.id)}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SondagesManager;
