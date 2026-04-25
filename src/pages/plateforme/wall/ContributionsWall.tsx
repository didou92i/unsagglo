import { useMemo, useState } from "react";
import { LineChart } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { usePublicContributions } from "./usePublicContributions";
import ContributionCard from "./ContributionCard";
import { STATUS_META, type StatutTraitement } from "./types";

type FilterValue = "all" | StatutTraitement;

const FILTERS: Array<{ value: FilterValue; label: string }> = [
  { value: "all", label: "Toutes" },
  { value: "portee_cst", label: "Portées au CST" },
  { value: "en_negociation", label: "En négociation" },
  { value: "obtenue", label: "Obtenues" },
  { value: "refusee", label: "Refusées" },
];

const ContributionsWall = (): JSX.Element => {
  const { contributions, loading } = usePublicContributions(20);
  const [filter, setFilter] = useState<FilterValue>("all");

  const visible = useMemo(
    () =>
      contributions.filter(
        (c) => filter === "all" || c.statut_traitement === filter,
      ),
    [contributions, filter],
  );

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (contributions.length === 0) {
    return (
      <div
        className="rounded-lg p-8 text-center text-sm text-muted-foreground"
        style={{ backgroundColor: "#f5f5f7" }}
      >
        Aucune contribution publiée pour le moment. Soyez le premier·la première
        à porter une idée.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {FILTERS.map((f) => {
          const isActive = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 border"
              style={{
                borderColor: isActive ? "#009fe3" : "#e6eaf0",
                backgroundColor: isActive ? "#009fe3" : "#ffffff",
                color: isActive ? "#ffffff" : "#29235c",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div
          className="rounded-lg p-6 text-center text-sm text-muted-foreground"
          style={{ backgroundColor: "#f5f5f7" }}
        >
          Aucune contribution dans ce statut pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {visible.map((c) => (
            <ContributionCard key={c.id} contribution={c} />
          ))}
        </div>
      )}

      <div
        className="rounded-md p-4 mt-8 text-xs text-muted-foreground leading-relaxed flex items-start gap-3"
        style={{ backgroundColor: "#eff9fe" }}
      >
        <LineChart
          className="h-4 w-4 flex-shrink-0 mt-0.5"
          style={{ color: "#009fe3" }}
          strokeWidth={1.75}
        />
        <span>
          Les contributions sont publiées de manière transparente. Si vous avez
          coché « Anonyme », votre prénom n'apparaît jamais. Le statut est mis
          à jour par UNSAgglo au fur et à mesure du suivi en CST.
        </span>
      </div>
    </div>
  );
};

export default ContributionsWall;
