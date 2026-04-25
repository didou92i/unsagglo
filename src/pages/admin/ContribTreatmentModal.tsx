import { useEffect, useState } from "react";
import { X } from "lucide-react";
import StatusBadge from "@/pages/plateforme/wall/StatusBadge";
import {
  STATUS_META,
  STATUS_OPTIONS_ADMIN,
  type StatutTraitement,
} from "@/pages/plateforme/wall/types";

interface Contribution {
  id: string;
  contenu: string;
  statut_traitement: string;
  reponse_direction: string | null;
  action_unsagglo: string | null;
}

interface ContribTreatmentModalProps {
  contribution: Contribution | null;
  onClose: () => void;
  onSave: (
    id: string,
    data: {
      statut_traitement: string;
      reponse_direction: string | null;
      action_unsagglo: string | null;
    },
  ) => Promise<boolean>;
}

const ContribTreatmentModal = ({
  contribution,
  onClose,
  onSave,
}: ContribTreatmentModalProps): JSX.Element | null => {
  const [statut, setStatut] = useState<StatutTraitement>("recue");
  const [engagement, setEngagement] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!contribution) return;
    setStatut(contribution.statut_traitement as StatutTraitement);
    setEngagement(contribution.reponse_direction ?? "");
    setAction(contribution.action_unsagglo ?? "");
  }, [contribution]);

  if (!contribution) return null;

  const handleSave = async (): Promise<void> => {
    setSaving(true);
    const ok = await onSave(contribution.id, {
      statut_traitement: statut,
      reponse_direction: engagement.trim() === "" ? null : engagement,
      action_unsagglo: action.trim() === "" ? null : action,
    });
    setSaving(false);
    if (ok) onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(41, 35, 92, 0.7)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl w-full max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: "560px", padding: "32px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-secondary"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <h3
          className="font-display font-medium text-secondary"
          style={{ fontSize: "20px" }}
        >
          Mettre à jour le suivi
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Visible publiquement sur le mur de la plateforme.
        </p>

        <div
          className="rounded-md p-3 mt-5 text-xs leading-relaxed"
          style={{ backgroundColor: "#f5f5f7", color: "#333" }}
        >
          {contribution.contenu.length > 280
            ? `${contribution.contenu.slice(0, 280).trim()}…`
            : contribution.contenu}
        </div>

        <div className="mt-6">
          <label className="text-xs uppercase tracking-wide text-muted-foreground block mb-3">
            Statut programme 2026
          </label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS_ADMIN.map((s) => {
              const meta = STATUS_META[s];
              const isActive = statut === s;
              const Icon = meta.icon;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatut(s)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all border"
                  style={{
                    backgroundColor: isActive ? meta.color : meta.bg,
                    color: isActive ? "#ffffff" : meta.color,
                    borderColor: meta.color,
                  }}
                >
                  <Icon className="h-3 w-3" strokeWidth={2} />
                  {meta.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <label className="text-xs uppercase tracking-wide text-muted-foreground block mb-2">
            Action UNSAgglo déjà réalisée (optionnel)
          </label>
          <p className="text-xs text-muted-foreground italic mb-2">
            Ce qu'UNSAgglo a déjà fait sur cette contribution dans la vie de
            la section : café syndical, accompagnement individuel, note
            partagée, point en bureau, etc.
          </p>
          <textarea
            rows={3}
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="Ex : Café syndical du 12/05 à Roissy, accompagnement individuel en cours, note technique partagée…"
            className="w-full rounded-md border px-3 py-2 text-sm text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            style={{ borderColor: "#e6eaf0" }}
          />
        </div>

        <div className="mt-5">
          <label className="text-xs uppercase tracking-wide text-muted-foreground block mb-2">
            Engagement UNSAgglo si élus (optionnel)
          </label>
          <p className="text-xs text-muted-foreground italic mb-2">
            Phrase courte qui formule l'engagement de campagne lié à cette
            contribution.
          </p>
          <textarea
            rows={3}
            value={engagement}
            onChange={(e) => setEngagement(e.target.value)}
            placeholder="Ex : Si UNSAgglo est élu en décembre 2026, nous porterons en CST l'extension du télétravail à 3 jours par semaine."
            className="w-full rounded-md border px-3 py-2 text-sm text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            style={{ borderColor: "#e6eaf0" }}
          />
        </div>

        <div
          className="mt-4 rounded-md p-3 text-xs"
          style={{ backgroundColor: "#eff9fe" }}
        >
          <p className="text-muted-foreground mb-2">Aperçu du badge :</p>
          <StatusBadge statut={statut} />
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-secondary"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={saving}
            className="text-white text-sm font-medium rounded-[6px] px-6 py-2.5 transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#009fe3" }}
          >
            {saving ? "Enregistrement..." : "Enregistrer le suivi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContribTreatmentModal;
