import type { CaptationRow } from "./types";

interface KpiCardsProps {
  rows: CaptationRow[];
}

const percent = (n: number, total: number): string => {
  if (total === 0) return "0 %";
  return `${Math.round((n / total) * 100)} %`;
};

const isThisWeek = (iso: string): boolean => {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  return now - then <= sevenDaysMs;
};

const KpiCards = ({ rows }: KpiCardsProps): JSX.Element => {
  const total = rows.length;
  const eligibles = rows.filter((r) => r.eligibilite === "Éligible").length;
  const newsletter = rows.filter((r) => r.opt_in_newsletter).length;
  const thisWeek = rows.filter((r) => isThisWeek(r.created_at)).length;

  const cards: Array<{ label: string; value: string; sub?: string }> = [
    { label: "Captations totales", value: String(total) },
    {
      label: "Éligibles",
      value: String(eligibles),
      sub: `${percent(eligibles, total)} du total`,
    },
    {
      label: "Opt-in newsletter",
      value: String(newsletter),
      sub: `${percent(newsletter, total)} du total`,
    },
    { label: "Cette semaine", value: String(thisWeek) },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg"
          style={{ backgroundColor: "#f5f5f7", padding: "20px" }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {card.label}
          </p>
          <p className="font-display font-medium text-secondary text-3xl mt-2 leading-none">
            {card.value}
          </p>
          {card.sub && (
            <p className="text-xs text-muted-foreground mt-2">{card.sub}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default KpiCards;
