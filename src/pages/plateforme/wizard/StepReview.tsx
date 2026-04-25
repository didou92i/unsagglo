import { Send } from "lucide-react";
import { THEMES } from "@/constants/themes";
import { SERVICE_GROUPS } from "@/constants/services";
import { STATUT_GROUPS } from "@/constants/statuts";
import StepHeader from "./StepHeader";
import { THEME_VISUAL } from "./types";

interface StepReviewProps {
  themes: string[];
  story: string;
  solution: string;
  anonyme: boolean;
  prenom?: string;
  service?: string;
  statut?: string;
  willJoin: boolean;
  onSubmit: () => void;
  loading: boolean;
}

const labelOf = (
  groups: Array<{ options: Array<{ value: string; label: string }> }>,
  value: string | undefined,
): string => {
  if (!value) return "—";
  for (const g of groups) {
    const found = g.options.find((o) => o.value === value);
    if (found) return found.label;
  }
  return value;
};

const themeLabel = (value: string): string =>
  THEMES.find((t) => t.value === value)?.label ?? value;

const Row = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}): JSX.Element => (
  <div
    className="flex items-start justify-between gap-6 py-3 border-b"
    style={{ borderColor: "#f0f2f6" }}
  >
    <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    {children ?? (
      <p className="text-sm text-secondary text-right max-w-[60%] break-words leading-relaxed">
        {value}
      </p>
    )}
  </div>
);

const ThemeChip = ({ value }: { value: string }): JSX.Element => {
  const visual = THEME_VISUAL[value];
  const Icon = visual?.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: "#eff9fe", color: "#29235c" }}
    >
      {Icon && <Icon className="h-3 w-3" strokeWidth={2} aria-hidden="true" />}
      {visual?.short ?? themeLabel(value)}
    </span>
  );
};

const StepReview = ({
  themes,
  story,
  solution,
  anonyme,
  prenom,
  service,
  statut,
  willJoin,
  onSubmit,
  loading,
}: StepReviewProps): JSX.Element => (
  <div>
    <StepHeader
      eyebrow="Dernière étape"
      title="Voilà ce que vous allez verser au programme UNSAgglo 2026."
      subtitle="Relisez avant d'envoyer. Vous pouvez revenir en arrière à tout moment."
    />

    <div className="rounded-lg p-1" style={{ backgroundColor: "#f5f5f7" }}>
      <div className="bg-white rounded-md px-5 py-2">
        <Row label={themes.length > 1 ? "Thèmes" : "Thème"}>
          <div className="flex flex-wrap justify-end gap-1.5 max-w-[60%]">
            {themes.map((t) => (
              <ThemeChip key={t} value={t} />
            ))}
          </div>
        </Row>
        <Row
          label="Constat"
          value={story.length > 280 ? `${story.slice(0, 280).trim()}…` : story}
        />
        <Row
          label="Proposition"
          value={
            solution.trim() === ""
              ? "Pas de proposition formelle — UNSAgglo travaillera à partir du constat"
              : solution.length > 280
                ? `${solution.slice(0, 280).trim()}…`
                : solution
          }
        />
        <Row label="Identité" value={anonyme ? "Anonyme" : (prenom ?? "—")} />
        <Row label="Service" value={labelOf(SERVICE_GROUPS, service)} />
        <Row label="Statut" value={labelOf(STATUT_GROUPS, statut)} />
        <div className="flex items-start justify-between gap-6 py-3">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Liste 2026
          </p>
          <p className="text-sm text-secondary text-right">
            {willJoin
              ? "Je rejoins la liste UNSAgglo 2026"
              : "Pas de candidature pour le moment"}
          </p>
        </div>
      </div>
    </div>

    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="group inline-flex items-center gap-2 text-white font-display font-medium text-lg rounded-[6px] px-10 py-4 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#009fe3" }}
      >
        {loading ? "Envoi en cours…" : "Envoyer ma contribution"}
        {!loading && (
          <Send
            className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  </div>
);

export default StepReview;
