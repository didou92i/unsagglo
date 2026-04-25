import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { THEME_GROUPS } from "@/constants/themes";
import type { Campaign, CampaignInput } from "./types";

interface CampaignFormProps {
  campaign: Campaign | null;
  open: boolean;
  onClose: () => void;
  onSave: (input: CampaignInput) => Promise<boolean>;
}

const today = (): string => new Date().toISOString().slice(0, 10);

const inMonths = (n: number): string => {
  const d = new Date();
  d.setMonth(d.getMonth() + n);
  return d.toISOString().slice(0, 10);
};

const inputClass =
  "w-full rounded-md border px-3 py-2 text-sm text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary";
const inputStyle = { borderColor: "#e6eaf0" } as const;

const CampaignForm = ({
  campaign,
  open,
  onClose,
  onSave,
}: CampaignFormProps): JSX.Element | null => {
  const [title, setTitle] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [objective, setObjective] = useState<number>(50);
  const [startDate, setStartDate] = useState<string>(today());
  const [endDate, setEndDate] = useState<string>(inMonths(1));
  const [deliverableLabel, setDeliverableLabel] = useState<string>("");
  const [deliverableDate, setDeliverableDate] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    if (campaign) {
      setTitle(campaign.title);
      setTheme(campaign.theme);
      setDescription(campaign.description ?? "");
      setObjective(campaign.objective_count);
      setStartDate(campaign.start_date);
      setEndDate(campaign.end_date);
      setDeliverableLabel(campaign.deliverable_label ?? "");
      setDeliverableDate(campaign.deliverable_date ?? "");
      setActive(campaign.active);
    } else {
      setTitle("");
      setTheme("");
      setDescription("");
      setObjective(50);
      setStartDate(today());
      setEndDate(inMonths(1));
      setDeliverableLabel("");
      setDeliverableDate("");
      setActive(false);
    }
  }, [campaign, open]);

  if (!open) return null;

  const canSave = title.trim().length >= 3 && theme !== "" && objective > 0;

  const handleSave = async (): Promise<void> => {
    if (!canSave) return;
    setSaving(true);
    const ok = await onSave({
      title: title.trim(),
      theme,
      description: description.trim() === "" ? null : description.trim(),
      objective_count: objective,
      start_date: startDate,
      end_date: endDate,
      deliverable_label:
        deliverableLabel.trim() === "" ? null : deliverableLabel.trim(),
      deliverable_date: deliverableDate.trim() === "" ? null : deliverableDate,
      active,
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
        style={{ maxWidth: "640px", padding: "32px" }}
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

        <h3 className="font-display font-medium text-secondary" style={{ fontSize: "20px" }}>
          {campaign ? "Modifier la campagne" : "Nouvelle campagne"}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Une seule campagne peut être active à la fois.
        </p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Titre</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex : Le télétravail dans notre programme 2026"
              className={inputClass + " mt-1"}
              style={inputStyle}
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Thème principal</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={inputClass + " mt-1"}
              style={inputStyle}
            >
              <option value="">Sélectionner…</option>
              {THEME_GROUPS.map((g) => (
                <optgroup key={g.group} label={g.group}>
                  {g.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Description (visible publiquement)</span>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Récoltons 50 témoignages d'agents pour faire du télétravail un engagement phare de notre programme."
              className={inputClass + " mt-1 resize-y"}
              style={inputStyle}
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Objectif</span>
              <input
                type="number"
                min={1}
                value={objective}
                onChange={(e) => setObjective(Number(e.target.value) || 0)}
                className={inputClass + " mt-1"}
                style={inputStyle}
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Début</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputClass + " mt-1"}
                style={inputStyle}
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Fin</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={inputClass + " mt-1"}
                style={inputStyle}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                Livrable (texte)
              </span>
              <input
                type="text"
                value={deliverableLabel}
                onChange={(e) => setDeliverableLabel(e.target.value)}
                placeholder="Synthèse au café syndical de Roissy"
                className={inputClass + " mt-1"}
                style={inputStyle}
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                Date du livrable (optionnel)
              </span>
              <input
                type="date"
                value={deliverableDate}
                onChange={(e) => setDeliverableDate(e.target.value)}
                className={inputClass + " mt-1"}
                style={inputStyle}
              />
            </label>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            <span className="text-sm text-secondary">
              Activer cette campagne (désactivera les autres)
            </span>
          </label>
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
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
            disabled={!canSave || saving}
            className="text-white text-sm font-medium rounded-[6px] px-6 py-2.5 transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#009fe3" }}
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
