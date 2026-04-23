import type { CaptationFilters } from "./types";
import { DEFAULT_FILTERS } from "./types";

interface CaptationsFiltersProps {
  filters: CaptationFilters;
  onChange: (filters: CaptationFilters) => void;
}

const selectClass =
  "rounded-md border px-3 py-2 text-sm text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary";

const CaptationsFilters = ({
  filters,
  onChange,
}: CaptationsFiltersProps): JSX.Element => {
  const patch = (partial: Partial<CaptationFilters>): void => {
    onChange({ ...filters, ...partial });
  };

  return (
    <div className="flex flex-wrap items-end gap-3 mb-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">Éligibilité</label>
        <select
          value={filters.eligibilite}
          onChange={(e) =>
            patch({ eligibilite: e.target.value as CaptationFilters["eligibilite"] })
          }
          className={selectClass}
          style={{ borderColor: "#e6eaf0" }}
        >
          <option value="all">Toutes</option>
          <option value="Éligible">Éligibles</option>
          <option value="Non-éligible">Non-éligibles</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">Critère bloquant</label>
        <select
          value={filters.critereBloquant}
          onChange={(e) =>
            patch({ critereBloquant: e.target.value as CaptationFilters["critereBloquant"] })
          }
          className={selectClass}
          style={{ borderColor: "#e6eaf0" }}
        >
          <option value="all">Tous</option>
          <option value="Pas de véhicule">Pas de véhicule</option>
          <option value="Statut">Statut</option>
          <option value="Revenus">Revenus</option>
          <option value="Véhicule employeur">Véhicule employeur</option>
          <option value="Kilométrage">Kilométrage</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">Newsletter</label>
        <select
          value={filters.newsletter}
          onChange={(e) =>
            patch({ newsletter: e.target.value as CaptationFilters["newsletter"] })
          }
          className={selectClass}
          style={{ borderColor: "#e6eaf0" }}
        >
          <option value="all">Tous</option>
          <option value="yes">Oui</option>
          <option value="no">Non</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">Statut relance</label>
        <select
          value={filters.statutRelance}
          onChange={(e) =>
            patch({ statutRelance: e.target.value as CaptationFilters["statutRelance"] })
          }
          className={selectClass}
          style={{ borderColor: "#e6eaf0" }}
        >
          <option value="all">Tous</option>
          <option value="Non contacté">Non contacté</option>
          <option value="Relancé J+7">Relancé J+7</option>
          <option value="Relancé fin mai">Relancé fin mai</option>
          <option value="Adhérent">Adhérent</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
        <label className="text-xs text-muted-foreground">Recherche email</label>
        <input
          type="search"
          value={filters.search}
          onChange={(e) => patch({ search: e.target.value })}
          placeholder="exemple@domaine.fr"
          className={selectClass}
          style={{ borderColor: "#e6eaf0" }}
        />
      </div>

      <button
        type="button"
        onClick={() => onChange(DEFAULT_FILTERS)}
        className="text-sm text-secondary border border-secondary rounded-[6px] px-4 py-2 hover:bg-secondary hover:text-white transition-colors"
      >
        Réinitialiser
      </button>
    </div>
  );
};

export default CaptationsFilters;
