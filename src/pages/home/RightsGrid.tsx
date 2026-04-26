import { Link } from "react-router-dom";
import type { CategoriesDroit } from "@/types";
import UCard from "@/components/ui/UCard";
import { SectionTitle } from "@/components/sections";

interface RightItem {
  label: string;
  categorie: CategoriesDroit;
  color: string;
  description: string;
  published: boolean;
}

const RIGHTS_ITEMS: RightItem[] = [
  { label: "CITIS", categorie: "citis", color: "var(--color-red)", description: "Congé invalidité imput. service", published: true },
  { label: "Temps partiel", categorie: "temps_partiel", color: "var(--color-green)", description: "6/7èmes et mi-temps", published: false },
  { label: "Carrière", categorie: "carriere", color: "hsl(var(--primary))", description: "Avancement et rémunération", published: false },
  { label: "Congés", categorie: "conges", color: "var(--color-cyan)", description: "RTT, CA, congés exceptionnels", published: false },
  { label: "Discipline", categorie: "discipline", color: "var(--color-navy)", description: "Recours et procédures", published: false },
  { label: "RPS", categorie: "rps", color: "var(--color-orange)", description: "Risques psychosociaux", published: false },
];

const RightsGrid = (): JSX.Element => (
  <div>
    <SectionTitle title="Vos droits à portée de main" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {RIGHTS_ITEMS.map((item) => {
        const cardInner = (
          <UCard
            className={
              item.published
                ? "border-l-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                : "border-l-4 opacity-60 cursor-not-allowed select-none"
            }
            style={{ borderLeftColor: item.color }}
            padding="md"
            aria-disabled={!item.published}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-foreground">
                  {item.label}
                </h3>
                {!item.published && (
                  <span className="shrink-0 inline-flex items-center rounded-full bg-muted text-muted-foreground text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5">
                    En cours
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
              {!item.published && (
                <p className="text-muted-foreground text-xs italic mt-2">
                  Fiche en cours de rédaction.
                </p>
              )}
            </div>
          </UCard>
        );

        if (!item.published) {
          return <div key={item.categorie}>{cardInner}</div>;
        }

        return (
          <Link to={`/rights/${item.categorie}`} key={item.categorie}>
            {cardInner}
          </Link>
        );
      })}
    </div>
  </div>
);

export default RightsGrid;
