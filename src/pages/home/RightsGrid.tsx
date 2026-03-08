import { Link } from "react-router-dom";
import type { CategoriesDroit } from "@/types";
import UCard from "@/components/ui/UCard";
import { SectionTitle } from "@/components/sections";

interface RightItem {
  label: string;
  categorie: CategoriesDroit;
  color: string;
  description: string;
}

const RIGHTS_ITEMS: RightItem[] = [
  { label: "CITIS", categorie: "citis", color: "var(--color-red)", description: "Conge invalidite imput. service" },
  { label: "Temps partiel", categorie: "temps_partiel", color: "var(--color-green)", description: "6/7emes et mi-temps" },
  { label: "Carriere", categorie: "carriere", color: "hsl(var(--primary))", description: "Avancement et remuneration" },
  { label: "Conges", categorie: "conges", color: "var(--color-cyan)", description: "RTT, CA, conges exceptionnels" },
  { label: "Discipline", categorie: "discipline", color: "var(--color-navy)", description: "Recours et procedures" },
  { label: "RPS", categorie: "rps", color: "var(--color-orange)", description: "Risques psychosociaux" },
];

const RightsGrid = (): JSX.Element => {
  return (
    <div>
      <SectionTitle title="Vos droits a portee de main" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {RIGHTS_ITEMS.map((item) => (
          <Link to={`/rights/${item.categorie}`} key={item.categorie}>
            <UCard className="border-l-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200" padding="md">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">{item.label}</h3>
                <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
              </div>
            </UCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RightsGrid;
