import { useState, useMemo } from "react";

interface Filterable {
  theme: string;
  statut: string | null;
  service: string;
}

interface UseContribFiltersReturn<T extends Filterable> {
  themeFilter: string;
  statutFilter: string;
  serviceFilter: string;
  setThemeFilter: (v: string) => void;
  setStatutFilter: (v: string) => void;
  setServiceFilter: (v: string) => void;
  filtered: T[];
}

export function useContribFilters<T extends Filterable>(items: T[]): UseContribFiltersReturn<T> {
  const [themeFilter, setThemeFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<string>("");
  const [serviceFilter, setServiceFilter] = useState<string>("");

  const filtered = useMemo(() => {
    return items.filter((c) => {
      if (themeFilter && c.theme !== themeFilter) return false;
      if (statutFilter && c.statut !== statutFilter) return false;
      if (serviceFilter && c.service !== serviceFilter) return false;
      return true;
    });
  }, [items, themeFilter, statutFilter, serviceFilter]);

  return { themeFilter, statutFilter, serviceFilter, setThemeFilter, setStatutFilter, setServiceFilter, filtered };
}
