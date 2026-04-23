import type { CaptationRow } from "./types";
import { STATUT_RELANCE_OPTIONS } from "./types";

interface CaptationsTableProps {
  rows: CaptationRow[];
  onDetail: (row: CaptationRow) => void;
  onDelete: (row: CaptationRow) => void;
  onStatutChange: (id: string, statut: string) => void;
}

const formatDateFr = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const pad = (n: number): string => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const EligibiliteBadge = ({ value }: { value: string }): JSX.Element => {
  const isEligible = value === "Éligible";
  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{
        backgroundColor: isEligible ? "rgba(0, 159, 227, 0.12)" : "rgba(231, 65, 36, 0.12)",
        color: isEligible ? "#009fe3" : "#e74124",
      }}
    >
      {value}
    </span>
  );
};

const BoolIcon = ({ value }: { value: boolean }): JSX.Element => (
  <span
    className="inline-block font-semibold"
    style={{ color: value ? "#009fe3" : "#94a3b8" }}
    aria-label={value ? "Oui" : "Non"}
  >
    {value ? "✓" : "✗"}
  </span>
);

const CaptationsTable = ({
  rows,
  onDetail,
  onDelete,
  onStatutChange,
}: CaptationsTableProps): JSX.Element => {
  if (rows.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground text-sm">
        Aucune captation ne correspond à ces critères.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table
        className="w-full text-sm border-collapse"
        style={{ borderColor: "#e6eaf0" }}
      >
        <thead>
          <tr
            className="text-left text-xs uppercase tracking-wide text-muted-foreground"
            style={{ backgroundColor: "#f5f5f7" }}
          >
            <th className="px-3 py-3">Date</th>
            <th className="px-3 py-3">Email</th>
            <th className="px-3 py-3">Éligibilité</th>
            <th className="px-3 py-3">Critère bloquant</th>
            <th className="px-3 py-3">Foyer</th>
            <th className="px-3 py-3">Profil km</th>
            <th className="px-3 py-3 text-center">NL</th>
            <th className="px-3 py-3 text-center">PDF</th>
            <th className="px-3 py-3">Statut relance</th>
            <th className="px-3 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-t"
              style={{ borderColor: "#e6eaf0" }}
            >
              <td className="px-3 py-3 whitespace-nowrap text-secondary">
                {formatDateFr(row.created_at)}
              </td>
              <td className="px-3 py-3 text-secondary max-w-[240px] truncate" title={row.email}>
                {row.email}
              </td>
              <td className="px-3 py-3">
                <EligibiliteBadge value={row.eligibilite} />
              </td>
              <td className="px-3 py-3 text-muted-foreground">
                {row.critere_bloquant ?? "—"}
              </td>
              <td className="px-3 py-3 text-muted-foreground">
                {row.composition_foyer ?? "—"}
              </td>
              <td className="px-3 py-3 text-muted-foreground max-w-[200px] truncate" title={row.profil_kilometrage ?? ""}>
                {row.profil_kilometrage ?? "—"}
              </td>
              <td className="px-3 py-3 text-center">
                <BoolIcon value={row.opt_in_newsletter} />
              </td>
              <td className="px-3 py-3 text-center">
                <BoolIcon value={row.pdf_telecharge} />
              </td>
              <td className="px-3 py-3">
                <select
                  value={row.statut_relance}
                  onChange={(e) => onStatutChange(row.id, e.target.value)}
                  className="rounded-md border px-2 py-1 text-xs text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ borderColor: "#e6eaf0" }}
                >
                  {STATUT_RELANCE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-3 text-right whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => onDetail(row)}
                  className="text-xs text-primary hover:underline mr-3"
                >
                  Détail
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(row)}
                  className="text-xs text-destructive hover:underline"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaptationsTable;
