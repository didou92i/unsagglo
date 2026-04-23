import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { CaptationRow } from "./types";
import { STATUT_RELANCE_OPTIONS } from "./types";

interface CaptationDetailModalProps {
  row: CaptationRow | null;
  onClose: () => void;
  onSaveNotes: (id: string, notes: string) => Promise<boolean>;
  onStatutChange: (id: string, statut: string) => Promise<boolean>;
}

const formatDateFrTime = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const pad = (n: number): string => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element => (
  <div className="flex items-start justify-between gap-6 py-2 border-b" style={{ borderColor: "#f0f2f6" }}>
    <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    <p className="text-sm text-secondary text-right max-w-[60%] break-words">{value}</p>
  </div>
);

const CaptationDetailModal = ({
  row,
  onClose,
  onSaveNotes,
  onStatutChange,
}: CaptationDetailModalProps): JSX.Element | null => {
  const [notes, setNotes] = useState<string>("");
  const [statut, setStatut] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    if (row) {
      setNotes(row.notes_internes ?? "");
      setStatut(row.statut_relance);
      setSaved(false);
    }
  }, [row]);

  if (!row) return null;

  const handleSave = async (): Promise<void> => {
    setSaving(true);
    const okNotes = await onSaveNotes(row.id, notes);
    const okStatut = statut !== row.statut_relance ? await onStatutChange(row.id, statut) : true;
    setSaving(false);
    if (okNotes && okStatut) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
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
          className="absolute top-4 right-4 text-muted-foreground hover:text-secondary transition-colors"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="font-display font-medium text-secondary" style={{ fontSize: "20px" }}>
          Détail de la captation
        </h3>
        <p className="text-muted-foreground text-xs mt-1">{row.email}</p>

        <div className="mt-6 space-y-1">
          <DetailRow label="Date" value={formatDateFrTime(row.created_at)} />
          <DetailRow label="Éligibilité" value={row.eligibilite} />
          <DetailRow label="Critère bloquant" value={row.critere_bloquant ?? "—"} />
          <DetailRow label="Composition foyer" value={row.composition_foyer ?? "—"} />
          <DetailRow label="Profil kilométrage" value={row.profil_kilometrage ?? "—"} />
          <DetailRow label="Newsletter" value={row.opt_in_newsletter ? "Oui" : "Non"} />
          <DetailRow label="PDF téléchargé" value={row.pdf_telecharge ? "Oui" : "Non"} />
          <DetailRow label="Source" value={row.source} />
          <DetailRow label="Identifiant interne" value={row.id} />
        </div>

        <div className="mt-6">
          <label className="text-xs uppercase tracking-wide text-muted-foreground block mb-2">
            Statut relance
          </label>
          <select
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ borderColor: "#e6eaf0" }}
          >
            {STATUT_RELANCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="text-xs uppercase tracking-wide text-muted-foreground block mb-2">
            Notes internes
          </label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes, historique d'échanges, rappels internes…"
            className="w-full rounded-md border px-3 py-2 text-sm text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            style={{ borderColor: "#e6eaf0" }}
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          {saved && <span className="text-xs text-primary">Enregistré ✓</span>}
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-secondary transition-colors"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={saving}
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

export default CaptationDetailModal;
