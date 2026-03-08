import type { CategorieArticle } from "@/types";

interface ArticleFiltersProps {
  activeFilter: CategorieArticle | "tous";
  onFilter: (cat: CategorieArticle | "tous") => void;
  search: string;
  onSearch: (q: string) => void;
}

const FILTERS: { value: CategorieArticle | "tous"; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "actualite", label: "Actualites" },
  { value: "tract", label: "Tracts" },
  { value: "cr_cst", label: "CR CST" },
  { value: "fiche_droit", label: "Fiches droits" },
];

const ArticleFilters = ({ activeFilter, onFilter, search, onSearch }: ArticleFiltersProps): JSX.Element => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilter(f.value)}
            className={`px-4 py-2 rounded-[var(--radius-sm)] text-sm font-semibold transition-all ${activeFilter === f.value ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:bg-muted"}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="relative w-full md:w-64">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Rechercher un article..."
          className="w-full pl-10 pr-4 py-2.5 min-h-[44px] rounded-[var(--radius-sm)] border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        />
      </div>
    </div>
  );
};

export default ArticleFilters;
