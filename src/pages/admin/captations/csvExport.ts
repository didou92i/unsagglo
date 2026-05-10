import type { CaptationRow } from "./types";

const CSV_HEADERS: Array<{ key: keyof CaptationRow | "date"; label: string }> = [
  { key: "date", label: "Date" },
  { key: "email", label: "Email" },
  { key: "eligibilite", label: "Éligibilité" },
  { key: "critere_bloquant", label: "Critère bloquant" },
  { key: "composition_foyer", label: "Composition foyer" },
  { key: "profil_kilometrage", label: "Profil kilométrage" },
  { key: "opt_in_newsletter", label: "Newsletter" },
  { key: "pdf_telecharge", label: "PDF téléchargé" },
  { key: "statut_relance", label: "Statut relance" },
  { key: "source", label: "Source" },
];

const UTF8_BOM = "\uFEFF";

const escape = (val: unknown): string => {
  if (val === null || val === undefined) return "";
  const str =
    typeof val === "boolean" ? (val ? "Oui" : "Non") : String(val);
  if (/[",;\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

const formatDateFr = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number): string => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const pad2 = (n: number): string => String(n).padStart(2, "0");

const todayCompact = (): string => {
  const d = new Date();
  return `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}`;
};

export function exportCaptationsCsv(rows: CaptationRow[]): void {
  const header = CSV_HEADERS.map((h) => h.label).join(";");
  const body = rows
    .map((r) =>
      CSV_HEADERS.map((h) =>
        h.key === "date" ? escape(formatDateFr(r.created_at)) : escape(r[h.key as keyof CaptationRow]),
      ).join(";"),
    )
    .join("\n");

  const csv = `${UTF8_BOM}${header}\n${body}\n`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `captations_aide_carburant_${todayCompact()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
