import { useState, useMemo } from "react";

interface Filterable {
  theme: string;
  statut: string | null;
}

interface UseContribFiltersReturn<T extends Filterable> {
  themeFilter: string;
  statutFilter: string;
  setThemeFilter: (v: string) => void;
  setStatutFilter: (v: string) => void;
  filtered: T[];
}

export function useContribFilters<T extends Filterable>(items: T[]): UseContribFiltersReturn<T> {
  const [themeFilter, setThemeFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<string>("");

  const filtered = useMemo(() => {
    return items.filter((c) => {
      if (themeFilter && c.theme !== themeFilter) return false;
      if (statutFilter && c.statut !== statutFilter) return false;
      return true;
    });
  }, [items, themeFilter, statutFilter]);

  return { themeFilter, statutFilter, setThemeFilter, setStatutFilter, filtered };
}
