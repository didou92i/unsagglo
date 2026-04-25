import { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquareReply } from "lucide-react";
import { THEME_VISUAL } from "../wizard/types";
import { THEMES } from "@/constants/themes";
import StatusBadge from "./StatusBadge";
import StatusTimeline from "./StatusTimeline";
import type { PublicContribution } from "./types";

interface ContributionCardProps {
  contribution: PublicContribution;
}

const themeLabel = (value: string): string =>
  THEMES.find((t) => t.value === value)?.label ?? value;

const formatRelative = (iso: string): string => {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const day = 24 * 60 * 60 * 1000;
  if (diff < day) return "aujourd'hui";
  if (diff < 2 * day) return "hier";
  const days = Math.floor(diff / day);
  if (days < 30) return `il y a ${days} jours`;
  const months = Math.floor(days / 30);
  if (months < 12) return `il y a ${months} mois`;
  return `il y a ${Math.floor(months / 12)} an(s)`;
};

const stripContenuHeaders = (text: string): string =>
  text
    .replace(/^Th[èe]mes\s*:[^\n]*\n+/i, "")
    .replace(/^Constat\s*:\s*\n?/i, "")
    .trim();

const ContributionCard = ({ contribution }: ContributionCardProps): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const themesToShow =
    contribution.themes.length > 0 ? contribution.themes : [contribution.theme];

  const cleanedContenu = stripContenuHeaders(contribution.contenu);
  const isLong = cleanedContenu.length > 220;
  const displayedContenu =
    expanded || !isLong ? cleanedContenu : `${cleanedContenu.slice(0, 220).trim()}…`;

  return (
    <article
      className="rounded-lg border bg-white p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{ borderColor: "#e6eaf0" }}
    >
      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
        <div className="flex flex-wrap gap-1.5">
          {themesToShow.slice(0, 5).map((t) => {
            const visual = THEME_VISUAL[t];
            const Icon = visual?.icon;
            return (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
                style={{ backgroundColor: "#eff9fe", color: "#29235c" }}
              >
                {Icon && <Icon className="h-2.5 w-2.5" strokeWidth={2.25} />}
                {visual?.short ?? themeLabel(t)}
              </span>
            );
          })}
        </div>
        <StatusBadge
          statut={contribution.statut_traitement}
          cstDate={contribution.cst_date}
          size="sm"
        />
      </div>

      <p
        className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line"
      >
        « {displayedContenu} »
      </p>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:opacity-80 transition-opacity"
        >
          {expanded ? (
            <>
              Réduire <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Lire la suite <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}

      {contribution.reponse_direction && (
        <div
          className="mt-4 rounded-md p-3 border-l-2"
          style={{ backgroundColor: "#f5f5f7", borderColor: "#29235c" }}
        >
          <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-secondary font-semibold mb-1">
            <MessageSquareReply className="h-3 w-3" strokeWidth={2.25} />
            Réponse de la direction
          </p>
          <p className="text-xs text-foreground/85 leading-relaxed">
            {contribution.reponse_direction}
          </p>
        </div>
      )}

      <div className="mt-5 pt-4 border-t" style={{ borderColor: "#f0f2f6" }}>
        <StatusTimeline
          statut={contribution.statut_traitement}
          cstDate={contribution.cst_date}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>
          {contribution.anonyme || !contribution.prenom
            ? "Contribution anonyme"
            : `Par ${contribution.prenom}`}
        </span>
        <span>déposée {formatRelative(contribution.created_at)}</span>
      </div>
    </article>
  );
};

export default ContributionCard;
