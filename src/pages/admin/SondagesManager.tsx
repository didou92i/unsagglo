import { useState } from "react";
import { useAdminSondages } from "@/hooks/useAdminSondages";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import SondageForm from "./SondageForm";
import SondageResults from "./SondageResults";
import SondagesList from "./SondagesList";
import { Plus } from "lucide-react";

type View = "list" | "create" | "edit" | "results";

interface EditState {
  id: string;
  question: string;
  theme: string;
  actif: boolean;
  options: string[];
}

const SondagesManager = (): JSX.Element => {
  const { sondages, loading, create, update, toggleActif } = useAdminSondages();
  const [view, setView] = useState<View>("list");
  const [editing, setEditing] = useState<EditState | null>(null);
  const [resultsId, setResultsId] = useState<string | null>(null);

  if (loading) return <Spinner />;

  const handleCreate = async (data: EditState extends never ? never : Omit<EditState, "id">): Promise<void> => {
    await create(data as Parameters<typeof create>[0]);
    setView("list");
  };

  const handleEdit = async (data: Omit<EditState, "id">): Promise<void> => {
    if (!editing) return;
    await update(editing.id, data as Parameters<typeof update>[1]);
    setEditing(null);
    setView("list");
  };

  if (view === "create") {
    return <SondageForm onSubmit={handleCreate} onCancel={() => setView("list")} />;
  }

  if (view === "edit" && editing) {
    return <SondageForm initial={editing} onSubmit={handleEdit} onCancel={() => { setEditing(null); setView("list"); }} />;
  }

  if (view === "results" && resultsId) {
    const s = sondages.find((x) => x.id === resultsId);
    if (!s) return <p>Sondage introuvable</p>;
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setView("list")}>Retour</Button>
        <SondageResults question={s.question} options={s.options} totalVotes={s.totalVotes} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">Sondages ({sondages.length})</h2>
        <Button size="sm" onClick={() => setView("create")}><Plus className="mr-1 h-4 w-4" /> Nouveau</Button>
      </div>
      <SondagesList
        sondages={sondages}
        onToggle={toggleActif}
        onEdit={(s) => { setEditing({ id: s.id, question: s.question, theme: s.theme, actif: s.actif, options: s.options.map((o) => o.label) }); setView("edit"); }}
        onResults={(id) => { setResultsId(id); setView("results"); }}
      />
    </div>
  );
};

export default SondagesManager;
