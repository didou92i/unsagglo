import { useState } from "react";
import { Plus, Power, PowerOff, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";
import { themeLabel } from "@/lib/themeLabel";
import { useAdminCampaigns } from "./useAdminCampaigns";
import CampaignForm from "./CampaignForm";
import type { Campaign } from "./types";

const formatDateFr = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
};

const CampaignsManager = (): JSX.Element => {
  const {
    campaigns,
    loading,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    setActive,
  } = useAdminCampaigns();
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<Campaign | null>(null);

  if (loading) return <Spinner />;

  const openCreate = (): void => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (c: Campaign): void => {
    setEditing(c);
    setFormOpen(true);
  };

  const handleSave = async (input: Parameters<typeof createCampaign>[0]): Promise<boolean> => {
    const ok = editing
      ? await updateCampaign(editing.id, input)
      : await createCampaign(input);
    toast[ok ? "success" : "error"](
      ok ? "Campagne enregistrée." : "Échec de l'enregistrement.",
    );
    return ok;
  };

  const handleActivate = async (c: Campaign): Promise<void> => {
    if (c.active) {
      const ok = await updateCampaign(c.id, { active: false });
      toast[ok ? "success" : "error"](ok ? "Campagne désactivée." : "Échec.");
      return;
    }
    const ok = await setActive(c.id);
    toast[ok ? "success" : "error"](
      ok ? "Campagne activée (les autres sont désactivées)." : "Échec.",
    );
  };

  const handleDelete = async (c: Campaign): Promise<void> => {
    if (!confirm(`Supprimer définitivement la campagne « ${c.title} » ?`)) return;
    const ok = await deleteCampaign(c.id);
    toast[ok ? "success" : "error"](ok ? "Campagne supprimée." : "Échec.");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-medium text-secondary text-lg">
          Campagnes — Cap du mois
        </h2>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 text-white text-sm font-medium rounded-[6px] px-4 py-2 transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#009fe3" }}
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Nouvelle campagne
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div
          className="rounded-md p-6 text-center text-sm text-muted-foreground"
          style={{ backgroundColor: "#f5f5f7" }}
        >
          Aucune campagne pour le moment. Créez-en une pour mettre un sujet en
          avant sur la plateforme.
        </div>
      ) : (
        <div className="space-y-3">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="rounded-lg border bg-white p-4 flex items-center justify-between gap-4 flex-wrap"
              style={{
                borderColor: c.active ? "#009fe3" : "#e6eaf0",
                borderWidth: c.active ? "2px" : "1px",
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-secondary">{c.title}</p>
                  {c.active && (
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{ backgroundColor: "#dcfce7", color: "#15803d" }}
                    >
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {themeLabel(c.theme)} · du {formatDateFr(c.start_date)} au{" "}
                  {formatDateFr(c.end_date)} · objectif {c.objective_count}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => void handleActivate(c)}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-[6px] border transition-colors"
                  style={{
                    borderColor: c.active ? "#e74124" : "#009fe3",
                    color: c.active ? "#e74124" : "#009fe3",
                  }}
                >
                  {c.active ? (
                    <>
                      <PowerOff className="h-3 w-3" /> Désactiver
                    </>
                  ) : (
                    <>
                      <Power className="h-3 w-3" /> Activer
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => openEdit(c)}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-[6px] border text-secondary"
                  style={{ borderColor: "#e6eaf0" }}
                >
                  <Pencil className="h-3 w-3" /> Modifier
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(c)}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-[6px] border text-destructive"
                  style={{ borderColor: "#fff4f1" }}
                >
                  <Trash2 className="h-3 w-3" /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CampaignForm
        campaign={editing}
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default CampaignsManager;
